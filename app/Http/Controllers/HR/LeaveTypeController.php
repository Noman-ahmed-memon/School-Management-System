<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('hr.view');

        $types = LeaveType::query()
            ->when($this->getCampusId(), fn($q, $id) => $q->where('campus_id', $id))
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('HR/LeaveTypes/Index', [
            'types' => $types,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('hr.manage');
        return Inertia::render('HR/LeaveTypes/Create');
    }

    public function store(Request $request)
    {
        $this->authorizePermission('hr.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:leave_types,code'],
            'days_per_year' => ['required', 'integer', 'min:0'],
            'is_paid' => ['boolean'],
        ]);

        $validated['campus_id'] = $this->getCampusId();

        LeaveType::create($validated);

        return $this->successRedirect('leave-types.index', 'Leave type created.');
    }

    public function edit(LeaveType $leaveType)
    {
        $this->authorizePermission('hr.manage');
        return Inertia::render('HR/LeaveTypes/Edit', [
            'leaveType' => $leaveType,
        ]);
    }

    public function update(Request $request, LeaveType $leaveType)
    {
        $this->authorizePermission('hr.manage');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:leave_types,code,' . $leaveType->id],
            'days_per_year' => ['required', 'integer', 'min:0'],
            'is_paid' => ['boolean'],
        ]);

        $leaveType->update($validated);

        return $this->successRedirect('leave-types.index', 'Leave type updated.');
    }

    public function destroy(LeaveType $leaveType)
    {
        $this->authorizePermission('hr.manage');

        if ($leaveType->leaveRequests()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete leave type in use.']);
        }

        $leaveType->delete();

        return $this->successRedirect('leave-types.index', 'Leave type deleted.');
    }
}