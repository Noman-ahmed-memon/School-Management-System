<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Campus;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('departments.view');

        // ===== SCOPE =====
        $query = Department::query();
        $this->scopeQuery($query);
        // =================

        $departments = $query
            ->with(['campus:id,name'])
            ->withCount('staff')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('code', 'like', "%{$s}%"))
            ->when($request->campus_id, fn($q, $id) => $q->where('campus_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/Departments/Index', [
            'departments' => $departments,
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'campus_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('departments.create');
        return Inertia::render('School/Departments/Create', [
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

    public function store(StoreDepartmentRequest $request)
    {
        Department::create($request->validated());
        return $this->successRedirect('school.departments.index', 'Department created.');
    }

    public function show(Department $department)
    {
        $this->authorizePermission('departments.view');
        $department->load(['campus:id,name', 'staff.user:id,name,email']);

        return Inertia::render('School/Departments/Show', ['department' => $department]);
    }

    public function edit(Department $department)
    {
        $this->authorizePermission('departments.edit');
        return Inertia::render('School/Departments/Edit', [
            'department' => $department,
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());
        return $this->successRedirect('school.departments.index', 'Department updated.');
    }

    public function destroy(Department $department)
    {
        $this->authorizePermission('departments.delete');

        if ($department->staff()->exists()) {
            return $this->errorRedirect('school.departments.index',
                'Cannot delete department with existing staff.');
        }

        $department->delete();
        return $this->successRedirect('school.departments.index', 'Department deleted.');
    }
}