<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\AcademicSession;
use App\Models\Campus;
use App\Models\Section;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('students.view');

        // ===== SCOPE =====
        $query = Student::query();
        $this->scopeQuery($query);
        // =================

        $students = $query
            ->with([
                'campus:id,name',
                'currentAcademicRecord.standard:id,name',
                'currentAcademicRecord.section:id,name',
            ])
            ->when($request->search, fn($q, $s) =>
                $q->where('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('admission_number', 'like', "%{$s}%"))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->when($request->gender, fn($q, $g) => $q->where('gender', $g))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Student/Students/Index', [
            'students' => $students,
            'filters' => $request->only(['search', 'status', 'gender', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('students.create');

        return Inertia::render('Student/Students/Create', [
            // Campuses user can choose from
            'campuses' => Campus::whereIn('id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name')
                ->get(),

            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'campus_id')
                ->get(),

            'academicSessions' => AcademicSession::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')
                ->select('id', 'name', 'campus_id')
                ->get(),
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        // Determine campus: from request OR user's assigned campus
        $campusId = $request->campus_id ?: $this->getCampusId();

        // Validate
        if (!$campusId || !in_array((int) $campusId, $this->getAccessibleCampusIds())) {
            return back()->withErrors(['campus_id' => 'Please select a valid campus.']);
        }

        $schoolId = Campus::find($campusId)?->school_id;

        DB::transaction(function () use ($request, $campusId, $schoolId) {
            // Create user account
            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email ?? $request->admission_number . '@student.local',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'campus_id' => $campusId,
                'school_id' => $schoolId,
                'status' => 'active',
            ]);
            $user->assignRole('student');

            // Prepare student data
            $data = $request->validated();
            $data['user_id'] = $user->id;
            $data['campus_id'] = $campusId;
            $data['is_active'] = true;

            // Handle photo
            if ($request->hasFile('student_photo')) {
                $data['student_photo'] = $request->file('student_photo')
                    ->store('students/photos', 'public');
            }

            // Extract academic fields before creating student
            $standardId = $data['standard_id'] ?? null;
            $sectionId = $data['section_id'] ?? null;
            $sessionId = $data['academic_session_id'] ?? null;
            unset($data['standard_id'], $data['section_id'], $data['academic_session_id']);

            // Create student
            $student = Student::create($data);

            // Create academic record if all provided
            if ($standardId && $sectionId && $sessionId) {
                StudentAcademicRecord::create([
                    'student_id' => $student->id,
                    'standard_id' => $standardId,
                    'section_id' => $sectionId,
                    'academic_session_id' => $sessionId,
                    'enrollment_date' => now(),
                    'status' => 'enrolled',
                ]);
            }
        });

        return $this->successRedirect('students.index', 'Student created successfully.');
    }

    public function show(Student $student)
    {
        $this->authorizePermission('students.view');

        // Access check
        if (!$this->isSuperAdmin()
            && !in_array($student->campus_id, $this->getAccessibleCampusIds())) {
            abort(403);
        }

        $student->load([
            'campus:id,name',
            'guardians',
            'currentAcademicRecord.standard:id,name',
            'currentAcademicRecord.section:id,name',
            'currentAcademicRecord.academicSession:id,name',
            'studentAcademicRecords.standard:id,name',
            'studentAcademicRecords.section:id,name',
            'studentAcademicRecords.academicSession:id,name',
            'studentDocuments',
        ]);

        return Inertia::render('Student/Students/Show', [
            'student' => $student,
            'stats' => [
                'attendance_percentage' => $this->calculateAttendancePercentage($student),
                'fee_due' => $student->feeInvoices()->where('status', '!=', 'paid')->sum('outstanding_amount'),
                'library_books' => $student->libraryTransactions()->where('status', 'issued')->count(),
            ],
            'allGuardians' => \App\Models\Guardian::with('user:id,name')->get(),
            'availableStandards' => Standard::where('campus_id', $student->campus_id)
                ->where('status', 'active')->select('id', 'name', 'code')->get(),
            'availableSections' => Section::whereIn('standard_id', function ($q) use ($student) {
                $q->select('id')->from('standards')->where('campus_id', $student->campus_id);
            })->where('status', 'active')->select('id', 'name', 'code', 'standard_id')->get(),
            'academicSessions' => AcademicSession::where('campus_id', $student->campus_id)
                ->where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function edit(Student $student)
    {
        $this->authorizePermission('students.edit');

        if (!$this->isSuperAdmin()
            && !in_array($student->campus_id, $this->getAccessibleCampusIds())) {
            abort(403);
        }

        $student->load('currentAcademicRecord');

        return Inertia::render('Student/Students/Edit', [
            'student' => $student,
            'standards' => Standard::where('campus_id', $student->campus_id)
                ->where('status', 'active')->select('id', 'name')->get(),
            'academicSessions' => AcademicSession::where('campus_id', $student->campus_id)
                ->where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        DB::transaction(function () use ($request, $student) {
            $data = $request->validated();

            if ($request->hasFile('student_photo')) {
                if ($student->student_photo) {
                    Storage::disk('public')->delete($student->student_photo);
                }
                $data['student_photo'] = $request->file('student_photo')
                    ->store('students/photos', 'public');
            }

            $student->update($data);

            $student->user?->update([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email ?? $student->user->email,
            ]);
        });

        return $this->successRedirect('students.index', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $this->authorizePermission('students.delete');

        DB::transaction(function () use ($student) {
            $userId = $student->user_id;

            if ($student->student_photo) {
                Storage::disk('public')->delete($student->student_photo);
            }

            $student->delete();

            if ($userId) {
                User::where('id', $userId)->delete();
            }
        });

        return $this->successRedirect('students.index', 'Student deleted.');
    }

    private function calculateAttendancePercentage(Student $student): float
    {
        $total = $student->studentAttendances()->count();
        if ($total === 0) return 0;

        $present = $student->studentAttendances()
            ->whereIn('status', ['present', 'late', 'half_day'])
            ->count();

        return round(($present / $total) * 100, 2);
    }
}