<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('hr.leave');

        $requests = LeaveRequest::query()
            ->with([
                'staff.user:id,name',
                'teacher.user:id,name',
                'leaveType:id,name',
                'approvedBy:id,name',
            ])
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->type, function ($q, $type) {
                if ($type === 'teacher') $q->whereNotNull('teacher_id');
                if ($type === 'staff') $q->whereNotNull('staff_id');
            })
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('HR/LeaveRequests/Index', [
            'requests' => $requests,
            'filters' => $request->only(['status', 'type', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('hr.leave');

        return Inertia::render('HR/LeaveRequests/Create', [
            'employees' => EmployeeService::all(),
            'leaveTypes' => LeaveType::select('id', 'name', 'days_per_year')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('hr.leave');

        $validated = $request->validate([
            'employee_type' => ['required', 'in:teacher,staff'],
            'employee_id' => ['required', 'integer'],
            'leave_type_id' => ['required', 'exists:leave_types,id'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['required', 'string', 'max:500'],
        ]);

        $days = \Carbon\Carbon::parse($validated['start_date'])
            ->diffInDays(\Carbon\Carbon::parse($validated['end_date'])) + 1;

        $data = [
            'leave_type_id' => $validated['leave_type_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'days' => $days,
            'reason' => $validated['reason'],
            'status' => 'pending',
        ];

        if ($validated['employee_type'] === 'teacher') {
            $data['teacher_id'] = $validated['employee_id'];
            $data['staff_id'] = null;
        } else {
            $data['staff_id'] = $validated['employee_id'];
            $data['teacher_id'] = null;
        }

        LeaveRequest::create($data);

        return $this->successRedirect('leave-requests.index', 'Leave request submitted.');
    }

    public function approve(LeaveRequest $leaveRequest)
    {
        $this->authorizePermission('hr.leave');

        $leaveRequest->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
        ]);

        return back()->with('success', 'Leave approved.');
    }

    public function reject(LeaveRequest $leaveRequest)
    {
        $this->authorizePermission('hr.leave');

        $leaveRequest->update([
            'status' => 'rejected',
            'approved_by' => auth()->id(),
        ]);

        return back()->with('success', 'Leave rejected.');
    }

    public function destroy(LeaveRequest $leaveRequest)
    {
        $this->authorizePermission('hr.leave');
        $leaveRequest->delete();
        return $this->successRedirect('leave-requests.index', 'Leave request deleted.');
    }
}