<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Models\Campus;
use App\Models\Department;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('staff.view');

        // ===== SCOPE =====
        $query = Staff::query();
        $this->scopeQueryViaUser($query, 'user');
        // =================

        $staff = $query
            ->with(['user:id,name,email,campus_id', 'department:id,name'])
            ->when($request->search, fn($q, $s) =>
                $q->whereHas('user', fn($u) => $u->where('name', 'like', "%{$s}%"))
                  ->orWhere('employee_id', 'like', "%{$s}%"))
            ->when($request->department_id, fn($q, $id) => $q->where('department_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('HR/Staff/Index', [
            'staff' => $staff,
            'departments' => Department::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'department_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('staff.create');

        return Inertia::render('HR/Staff/Create', [
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')
                ->get(),
            'departments' => Department::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'code', 'campus_id')
                ->get(),
        ]);
    }

    public function store(StoreStaffRequest $request)
    {
        $campusId = $request->campus_id ?: $this->getCampusId();

        if (!$campusId || !in_array((int) $campusId, $this->getAccessibleCampusIds())) {
            return back()->withErrors(['campus_id' => 'Please select a valid campus.']);
        }

        $schoolId = Campus::find($campusId)?->school_id;

        DB::transaction(function () use ($request, $campusId, $schoolId) {
            // Determine role based on department
            $department = Department::find($request->department_id);
            $baseRole = 'staff';
            $extraRoles = ['staff'];

            if ($department) {
                $mapped = $department->role_mapping;
                if ($mapped !== 'staff') {
                    $extraRoles[] = $mapped;
                }
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $baseRole,
                'phone' => $request->phone,
                'campus_id' => $campusId,
                'school_id' => $schoolId,
                'status' => 'active',
            ]);

            $user->assignRole($extraRoles);

            Staff::create([
                'user_id' => $user->id,
                'employee_id' => $request->employee_id,
                'department_id' => $request->department_id,
                'designation' => $request->designation,
                'salary' => $request->salary,
                'employment_type' => $request->employment_type,
                'joining_date' => $request->joining_date,
                'status' => $request->status,
            ]);
        });

        return $this->successRedirect('staff.index', 'Staff member created.');
    }

    public function show(Staff $staff)
    {
        $this->authorizePermission('staff.view');
        $staff->load(['user:id,name,email,phone,campus_id', 'department:id,name']);

        return Inertia::render('HR/Staff/Show', ['staff' => $staff]);
    }

    public function edit(Staff $staff)
    {
        $this->authorizePermission('staff.edit');
        $staff->load('user');

        return Inertia::render('HR/Staff/Edit', [
            'staff' => $staff,
            'departments' => Department::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
        ]);
    }

    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        DB::transaction(function () use ($request, $staff) {
            $staff->user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            $staff->update([
                'employee_id' => $request->employee_id,
                'department_id' => $request->department_id,
                'designation' => $request->designation,
                'salary' => $request->salary,
                'employment_type' => $request->employment_type,
                'joining_date' => $request->joining_date,
                'termination_date' => $request->termination_date,
                'status' => $request->status,
            ]);
        });

        return $this->successRedirect('staff.index', 'Staff updated.');
    }

    public function destroy(Staff $staff)
    {
        $this->authorizePermission('staff.delete');

        DB::transaction(function () use ($staff) {
            $userId = $staff->user_id;
            $staff->delete();
            User::where('id', $userId)->delete();
        });

        return $this->successRedirect('staff.index', 'Staff deleted.');
    }
}