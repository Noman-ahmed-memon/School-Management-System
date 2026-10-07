<?php

namespace App\Http\Controllers\School;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Standard;
use App\Models\StandardSubject;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandardSubjectController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('subjects.view');

        $assignments = StandardSubject::query()
            ->with([
                'standard:id,name,code',
                'subject:id,name,code',
                'teacher.user:id,name',
                'academicSession:id,name',
            ])
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->teacher_id, fn($q, $id) => $q->where('teacher_id', $id))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('School/StandardSubjects/Index', [
            'assignments' => $assignments,
            'standards' => Standard::where('status', 'active')->select('id', 'name', 'code')->get(),
            'teachers' => Teacher::with('user:id,name')->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->user->name ?? 'N/A',
            ]),
            'filters' => $request->only(['standard_id', 'teacher_id', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('subjects.create');

        return Inertia::render('School/StandardSubjects/Create', [
            'standards' => Standard::where('status', 'active')->select('id', 'name', 'code')->get(),
            'subjects' => Subject::where('status', 'active')->select('id', 'name', 'code')->get(),
            'teachers' => Teacher::with('user:id,name')->get()->map(fn($t) => [
                'id' => $t->id,
                'name' => $t->user->name ?? 'N/A',
            ]),
            'academicSessions' => AcademicSession::where('status', 'active')
                ->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('subjects.create');

        $validated = $request->validate([
            'standard_id' => ['required', 'exists:standards,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'teacher_id' => ['required', 'exists:teachers,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'is_compulsory' => ['boolean'],
        ]);

        // Check duplicate
        $exists = StandardSubject::where('standard_id', $validated['standard_id'])
            ->where('subject_id', $validated['subject_id'])
            ->where('academic_session_id', $validated['academic_session_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['subject_id' => 'This subject is already assigned to this standard.']);
        }

        StandardSubject::create($validated);

        return $this->successRedirect('school.standard-subjects.index', 'Subject assigned successfully.');
    }

    public function destroy(StandardSubject $standardSubject)
    {
        $this->authorizePermission('subjects.delete');
        $standardSubject->delete();
        return $this->successRedirect('school.standard-subjects.index', 'Assignment removed.');
    }
}