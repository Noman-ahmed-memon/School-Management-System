<?php

namespace App\Http\Controllers\Finance;

use App\Http\Controllers\Controller;
use App\Models\FeeInvoice;
use App\Models\FeePayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeePaymentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('fees.view');

        // ===== SCOPE via student =====
        $query = FeePayment::query();
        $this->scopeQueryVia($query, 'student');
        // =============================

        $payments = $query
            ->with(['student:id,first_name,last_name,admission_number', 'feeInvoice:id,invoice_number'])
            ->when($request->search, fn($q, $s) =>
                $q->where('receipt_number', 'like', "%{$s}%")
                ->orWhere('payment_number', 'like', "%{$s}%"))
            ->when($request->method, fn($q, $m) => $q->where('payment_method', $m))
            ->when($request->date, fn($q, $d) => $q->whereDate('payment_date', $d))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Finance/FeePayments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search', 'method', 'date', 'per_page']),
        ]);
    }

    public function create(Request $request)
    {
        $this->authorizePermission('fees.collect');

        $invoice = null;
        if ($request->invoice_id) {
            $invoice = FeeInvoice::with('student:id,first_name,last_name,admission_number')
                ->find($request->invoice_id);
        }

        // Load unpaid/partial invoices for selection
        $invoices = FeeInvoice::query()
            ->with('student:id,first_name,last_name,admission_number')
            ->whereIn('status', ['issued', 'partial_paid', 'overdue'])
            ->where('outstanding_amount', '>', 0)
            ->orderBy('created_at', 'desc')
            ->limit(200)
            ->get();

        return Inertia::render('Finance/FeePayments/Create', [
            'invoice' => $invoice,
            'invoices' => $invoices,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('fees.collect');

        $validated = $request->validate([
            'fee_invoice_id' => ['required', 'exists:fee_invoices,id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'payment_date' => ['required', 'date'],
            'payment_method' => ['required', 'in:cash,bank,online,card'],
            'transaction_id' => ['nullable', 'string', 'max:100'],
            'bank_name' => ['nullable', 'string', 'max:100'],
            'cheque_number' => ['nullable', 'string', 'max:50'],
        ]);

        DB::transaction(function () use ($validated) {
            $invoice = FeeInvoice::lockForUpdate()->findOrFail($validated['fee_invoice_id']);

            if ($validated['amount'] > $invoice->outstanding_amount) {
                throw new \Exception('Amount exceeds outstanding balance.');
            }

            $payment = FeePayment::create([
                'fee_invoice_id' => $invoice->id,
                'student_id' => $invoice->student_id,
                'payment_number' => FeePayment::generatePaymentNumber(),
                'amount' => $validated['amount'],
                'payment_date' => $validated['payment_date'],
                'payment_method' => $validated['payment_method'],
                'transaction_id' => $validated['transaction_id'] ?? null,
                'bank_name' => $validated['bank_name'] ?? null,
                'cheque_number' => $validated['cheque_number'] ?? null,
                'receipt_number' => FeePayment::generateReceiptNumber(),
                'status' => 'completed',
            ]);

            // Update invoice
            $invoice->paid_amount += $validated['amount'];
            $invoice->outstanding_amount = $invoice->net_amount - $invoice->paid_amount;

            if ($invoice->outstanding_amount <= 0) {
                $invoice->status = 'paid';
            } elseif ($invoice->paid_amount > 0) {
                $invoice->status = 'partial_paid';
            }

            $invoice->save();
        });

        return $this->successRedirect('fee-payments.index', 'Payment recorded successfully.');
    }

    public function show(FeePayment $feePayment)
    {
        $this->authorizePermission('fees.view');

        $feePayment->load([
            'student:id,first_name,last_name,admission_number,campus_id',
            'student.campus:id,school_id,name',
            'student.campus.school:id,name',
            'feeInvoice:id,invoice_number,net_amount,paid_amount,outstanding_amount',
        ]);

        return Inertia::render('Finance/FeePayments/Show', [
            'payment' => $feePayment,
        ]);
    }

    /**
     * Refund payment
     */
    public function refund(Request $request, FeePayment $feePayment)
    {
        $this->authorizePermission('fees.refund');

        DB::transaction(function () use ($feePayment) {
            $invoice = $feePayment->feeInvoice;

            $feePayment->update(['status' => 'refunded']);

            $invoice->paid_amount -= $feePayment->amount;
            $invoice->outstanding_amount = $invoice->net_amount - $invoice->paid_amount;

            if ($invoice->paid_amount <= 0) {
                $invoice->status = 'issued';
            } elseif ($invoice->outstanding_amount > 0) {
                $invoice->status = 'partial_paid';
            }

            $invoice->save();
        });

        return back()->with('success', 'Payment refunded.');
    }
}