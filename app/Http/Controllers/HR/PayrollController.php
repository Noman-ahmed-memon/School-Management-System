<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use App\Models\Payslip;
use App\Models\Staff;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('hr.payroll');

        $payrolls = Payroll::query()
            ->with([
                'staff.user:id,name',
                'teacher.user:id,name',
            ])
            ->when($request->month, fn($q, $m) => $q->where('month', $m))
            ->when($request->year, fn($q, $y) => $q->where('year', $y))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('HR/Payrolls/Index', [
            'payrolls' => $payrolls,
            'filters' => $request->only(['month', 'year', 'status', 'per_page']),
        ]);
    }

    public function generate(Request $request)
    {
        $this->authorizePermission('hr.payroll');

        $validated = $request->validate([
            'month' => ['required', 'integer', 'between:1,12'],
            'year' => ['required', 'integer', 'min:2000'],
        ]);

        $created = 0;

        // Staff
        $staffList = Staff::where('status', 'active')->get();
        foreach ($staffList as $staff) {
            $exists = Payroll::where('staff_id', $staff->id)
                ->where('month', $validated['month'])
                ->where('year', $validated['year'])
                ->exists();
            if ($exists) continue;

            $payroll = Payroll::create([
                'staff_id' => $staff->id,
                'teacher_id' => null,
                'month' => $validated['month'],
                'year' => $validated['year'],
                'basic_salary' => $staff->salary,
                'allowances' => [],
                'deductions' => [],
                'bonuses' => [],
                'total_earnings' => $staff->salary,
                'total_deductions' => 0,
                'net_salary' => $staff->salary,
                'status' => 'draft',
            ]);
            $payroll->calculatePayroll();
            $created++;
        }

        // Teachers
        $teachersList = Teacher::where('status', 'active')->get();
        foreach ($teachersList as $teacher) {
            $exists = Payroll::where('teacher_id', $teacher->id)
                ->where('month', $validated['month'])
                ->where('year', $validated['year'])
                ->exists();
            if ($exists) continue;

            $payroll = Payroll::create([
                'staff_id' => null,
                'teacher_id' => $teacher->id,
                'month' => $validated['month'],
                'year' => $validated['year'],
                'basic_salary' => $teacher->salary ?? 0,
                'allowances' => [],
                'deductions' => [],
                'bonuses' => [],
                'total_earnings' => $teacher->salary ?? 0,
                'total_deductions' => 0,
                'net_salary' => $teacher->salary ?? 0,
                'status' => 'draft',
            ]);
            $payroll->calculatePayroll();
            $created++;
        }

        return back()->with('success', "Generated {$created} payroll records.");
    }

    public function show(Payroll $payroll)
    {
        $this->authorizePermission('hr.payroll');

        $payroll->load([
            'staff.user:id,name,email',
            'teacher.user:id,name,email',
            'payslips',
        ]);

        return Inertia::render('HR/Payrolls/Show', ['payroll' => $payroll]);
    }

    public function approve(Payroll $payroll)
    {
        $this->authorizePermission('hr.payroll');
        $payroll->update(['status' => 'approved']);
        return back()->with('success', 'Payroll approved.');
    }

    public function markPaid(Payroll $payroll)
    {
        $this->authorizePermission('hr.payroll');

        $payroll->update([
            'status' => 'paid',
            'payment_date' => now(),
        ]);

        Payslip::create([
            'payroll_id' => $payroll->id,
            'staff_id' => $payroll->staff_id,
            'teacher_id' => $payroll->teacher_id,
            'payslip_number' => Payslip::generatePayslipNumber(),
            'generated_at' => now(),
        ]);

        return back()->with('success', 'Payroll marked as paid.');
    }

    public function destroy(Payroll $payroll)
    {
        $this->authorizePermission('hr.payroll');

        if ($payroll->status === 'paid') {
            return back()->withErrors(['error' => 'Cannot delete paid payroll.']);
        }

        $payroll->delete();
        return back()->with('success', 'Payroll deleted.');
    }
}