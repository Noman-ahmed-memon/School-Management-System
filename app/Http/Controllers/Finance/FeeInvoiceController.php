<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\FeeInvoice;
use App\Models\FeeInvoiceItem;
use App\Models\FeeStructure;
use App\Models\Scholarship;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeeInvoiceController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('fees.view');

        // ===== SCOPE via student =====
        $query = FeeInvoice::query();
        $this->scopeQueryVia($query, 'student');
        // =============================

        $invoices = $query
            ->with('student:id,first_name,last_name,admission_number')
            ->when($request->search, fn($q, $s) =>
                $q->where('invoice_number', 'like', "%{$s}%")
                ->orWhereHas('student', fn($sub) =>
                    $sub->where('first_name', 'like', "%{$s}%")
                        ->orWhere('last_name', 'like', "%{$s}%")))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Finance/FeeInvoices/Index', [
            'invoices' => $invoices,
            'standards' => \App\Models\Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name', 'code')->get(),
            'academicSessions' => \App\Models\AcademicSession::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a single invoice.
     */
    public function create()
    {
        $this->authorizePermission('fees.collect');

        $students = Student::whereIn('status', ['active', 'enrolled', 'admitted'])
            ->with([
                'currentAcademicRecord:id,student_id,standard_id,section_id',
                'currentAcademicRecord.standard:id,name,code',
                'currentAcademicRecord.section:id,name',
            ])
            ->select('id', 'first_name', 'last_name', 'admission_number')
            ->orderBy('first_name')
            ->get()
            ->map(function ($s) {
                $scholarship = Scholarship::getActiveForStudent($s->id);

                return [
                    'id' => $s->id,
                    'first_name' => $s->first_name,
                    'last_name' => $s->last_name,
                    'admission_number' => $s->admission_number,
                    'standard_id' => $s->currentAcademicRecord?->standard_id,
                    'standard_name' => $s->currentAcademicRecord?->standard?->name,
                    'section_name' => $s->currentAcademicRecord?->section?->name,
                    'scholarship' => $scholarship ? [
                        'id' => $scholarship->id,
                        'name' => $scholarship->name,
                        'type' => $scholarship->type,
                        'amount' => $scholarship->amount,
                    ] : null,
                ];
            });

        return Inertia::render('Finance/FeeInvoices/Create', [
            'students' => $students,
            'standards' => Standard::where('status', 'active')
                ->select('id', 'name', 'code')
                ->get(),
            'feeTypes' => \App\Models\FeeType::where('campus_id', $this->getCampusId())
                ->select('id', 'name', 'code')
                ->get(),
            'academicSessions' => AcademicSession::where('status', 'active')
                ->select('id', 'name')
                ->get(),
        ]);
    }

    /**
     * Store a single manually-created invoice.
     */
    public function store(Request $request)
    {
        $this->authorizePermission('fees.collect');

        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'issue_date' => ['required', 'date'],
            'due_date' => ['required', 'date', 'after_or_equal:issue_date'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.fee_type_id' => ['required', 'exists:fee_types,id'],
            'items.*.amount' => ['required', 'numeric', 'min:0'],
            'items.*.description' => ['nullable', 'string', 'max:500'],
            'discount_amount' => ['nullable', 'numeric', 'min:0'],
            'discount_type' => ['nullable', 'in:fixed,percentage'],
            'discount_reason' => ['nullable', 'string', 'max:200'],
        ]);

        DB::transaction(function () use ($validated) {
            $totalAmount = collect($validated['items'])->sum('amount');

            $discountAmount = 0;
            if (!empty($validated['discount_amount'])) {
                if (($validated['discount_type'] ?? 'fixed') === 'percentage') {
                    $discountAmount = ($totalAmount * $validated['discount_amount']) / 100;
                } else {
                    $discountAmount = $validated['discount_amount'];
                }
            }

            $netAmount = max(0, $totalAmount - $discountAmount);

            $invoice = FeeInvoice::create([
                'student_id' => $validated['student_id'],
                'academic_session_id' => $validated['academic_session_id'],
                'invoice_number' => FeeInvoice::generateInvoiceNumber(),
                'issue_date' => $validated['issue_date'],
                'due_date' => $validated['due_date'],
                'total_amount' => $totalAmount,
                'discount_amount' => $discountAmount,
                'discount_type' => $validated['discount_type'] ?? null,
                'discount_reason' => $validated['discount_reason'] ?? null,
                'net_amount' => $netAmount,
                'paid_amount' => 0,
                'outstanding_amount' => $netAmount,
                'status' => 'issued',
            ]);

            foreach ($validated['items'] as $item) {
                FeeInvoiceItem::create([
                    'fee_invoice_id' => $invoice->id,
                    'fee_type_id' => $item['fee_type_id'],
                    'amount' => $item['amount'],
                    'description' => $item['description'] ?? null,
                ]);
            }
        });

        return $this->successRedirect('fee-invoices.index', 'Invoice created successfully.');
    }

    /**
     * Generate invoices for a whole class.
     * Automatically applies active scholarships.
     */
    public function bulkGenerate(Request $request)
    {
        $this->authorizePermission('fees.collect');

        $validated = $request->validate([
            'standard_id' => ['required', 'exists:standards,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'due_date' => ['required', 'date'],
        ]);

        $structures = FeeStructure::with('feeType')
            ->where('standard_id', $validated['standard_id'])
            ->where('academic_session_id', $validated['academic_session_id'])
            ->get();

        if ($structures->isEmpty()) {
            return back()->withErrors(['error' => 'No fee structure found for this standard.']);
        }

        $students = StudentAcademicRecord::where('standard_id', $validated['standard_id'])
            ->where('academic_session_id', $validated['academic_session_id'])
            ->where('status', 'enrolled')
            ->pluck('student_id');

        $created = 0;
        $scholarshipsApplied = 0;

        DB::transaction(function () use ($students, $structures, $validated, &$created, &$scholarshipsApplied) {
            foreach ($students as $studentId) {
                // Skip if invoice already exists for this month
                $exists = FeeInvoice::where('student_id', $studentId)
                    ->where('academic_session_id', $validated['academic_session_id'])
                    ->whereMonth('issue_date', now()->month)
                    ->exists();

                if ($exists) continue;

                $subtotal = $structures->sum('amount');

                // === SCHOLARSHIP AUTO-APPLY ===
                $scholarship = Scholarship::getActiveForStudent($studentId);
                $discountAmount = 0;
                $discountType = null;
                $discountReason = null;

                if ($scholarship) {
                    $discountAmount = $scholarship->calculateDiscount($subtotal);
                    $discountType = $scholarship->type === 'percentage' ? 'percentage' : 'fixed';
                    $discountReason = $scholarship->name;
                    $scholarshipsApplied++;
                }

                $netAmount = max(0, $subtotal - $discountAmount);

                $invoice = FeeInvoice::create([
                    'student_id' => $studentId,
                    'academic_session_id' => $validated['academic_session_id'],
                    'invoice_number' => FeeInvoice::generateInvoiceNumber(),
                    'issue_date' => now(),
                    'due_date' => $validated['due_date'],
                    'total_amount' => $subtotal,
                    'discount_amount' => $discountAmount,
                    'discount_type' => $discountType,
                    'discount_reason' => $discountReason,
                    'net_amount' => $netAmount,
                    'paid_amount' => 0,
                    'outstanding_amount' => $netAmount,
                    'status' => 'issued',
                ]);

                foreach ($structures as $s) {
                    FeeInvoiceItem::create([
                        'fee_invoice_id' => $invoice->id,
                        'fee_type_id' => $s->fee_type_id,
                        'amount' => $s->amount,
                        'description' => $s->feeType->name ?? null,
                    ]);
                }

                $created++;
            }
        });

        $message = "Generated {$created} invoices.";
        if ($scholarshipsApplied > 0) {
            $message .= " {$scholarshipsApplied} scholarships applied.";
        }

        return back()->with('success', $message);
    }

    public function show(FeeInvoice $feeInvoice)
    {
        $this->authorizePermission('fees.view');

        $feeInvoice->load([
            'student:id,first_name,last_name,admission_number,campus_id',
            'student.campus:id,school_id,name',
            'student.campus.school:id,name',
            'feeInvoiceItems.feeType:id,name',
            'feePayments',
            'academicSession:id,name',
        ]);

        return Inertia::render('Finance/FeeInvoices/Show', [
            'invoice' => $feeInvoice,
        ]);
    }

    public function destroy(FeeInvoice $feeInvoice)
    {
        $this->authorizePermission('fees.refund');

        if ($feeInvoice->feePayments()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete invoice with payments.']);
        }

        $feeInvoice->delete();
        return $this->successRedirect('fee-invoices.index', 'Invoice deleted.');
    }
}