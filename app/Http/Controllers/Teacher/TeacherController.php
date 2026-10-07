<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Models\Campus;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('teachers.view');

        // ===== SCOPE via user.campus_id =====
        $query = Teacher::query();
        $this->scopeQueryViaUser($query, 'user');
        // ====================================

        $teachers = $query
            ->with(['user:id,name,email,phone,profile_picture,campus_id'])
            ->when($request->search, fn($q, $s) =>
                $q->whereHas('user', fn($u) =>
                    $u->where('name', 'like', "%{$s}%")
                      ->orWhere('email', 'like', "%{$s}%"))
                  ->orWhere('employee_id', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Teacher/Teachers/Index', [
            'teachers' => $teachers,
            'filters' => $request->only(['search', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('teachers.create');

        return Inertia::render('Teacher/Teachers/Create', [
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')
                ->get(),
        ]);
    }

    public function store(StoreTeacherRequest $request)
    {
        $campusId = $request->campus_id ?: $this->getCampusId();

        if (!$campusId || !in_array((int) $campusId, $this->getAccessibleCampusIds())) {
            return back()->withErrors(['campus_id' => 'Please select a valid campus.']);
        }

        $schoolId = Campus::find($campusId)?->school_id;

        DB::transaction(function () use ($request, $campusId, $schoolId) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'teacher',
                'phone' => $request->phone,
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address,
                'campus_id' => $campusId,
                'school_id' => $schoolId,
                'status' => 'active',
            ]);

            $user->assignRole('teacher');

            Teacher::create([
                'user_id' => $user->id,
                'employee_id' => $request->employee_id,
                'qualification' => $request->qualification,
                'experience_years' => $request->experience_years ?? 0,
                'salary' => $request->salary ?? 0,
                'employment_type' => $request->employment_type ?? 'full_time',
                'specialization' => $request->specialization,
                'joining_date' => $request->joining_date,
                'status' => $request->status,
            ]);
        });

        return $this->successRedirect('teachers.index', 'Teacher created successfully.');
    }

    public function show(Teacher $teacher)
    {
        $this->authorizePermission('teachers.view');

        $teacher->load([
            'user:id,name,email,phone,gender,date_of_birth,address,profile_picture,campus_id',
            'standardSubjects.standard:id,name',
            'standardSubjects.subject:id,name',
        ]);

        return Inertia::render('Teacher/Teachers/Show', [
            'teacher' => $teacher,
        ]);
    }

    public function edit(Teacher $teacher)
    {
        $this->authorizePermission('teachers.edit');
        $teacher->load('user');

        return Inertia::render('Teacher/Teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        DB::transaction(function () use ($request, $teacher) {
            $teacher->user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->address,
            ]);

            $teacher->update([
                'employee_id' => $request->employee_id,
                'qualification' => $request->qualification,
                'experience_years' => $request->experience_years ?? 0,
                'salary' => $request->salary ?? 0,
                'employment_type' => $request->employment_type ?? 'full_time',
                'specialization' => $request->specialization,
                'joining_date' => $request->joining_date,
                'status' => $request->status,
            ]);
        });

        return $this->successRedirect('teachers.index', 'Teacher updated successfully.');
    }

    public function destroy(Teacher $teacher)
    {
        $this->authorizePermission('teachers.delete');

        DB::transaction(function () use ($teacher) {
            $userId = $teacher->user_id;
            $teacher->delete();
            User::where('id', $userId)->delete();
        });

        return $this->successRedirect('teachers.index', 'Teacher deleted successfully.');
    }
}