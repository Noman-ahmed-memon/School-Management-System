<?php

namespace App\Http\Controllers\Examination;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Exam;
use App\Models\ExamType;
use App\Models\Standard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('exams.view');

        // ===== SCOPE via academicSession =====
        $query = Exam::query();
        $this->scopeQueryVia($query, 'academicSession');
        // =====================================

        $exams = $query
            ->with(['examType:id,name', 'standard:id,name', 'academicSession:id,name'])
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Examination/Exams/Index', [
            'exams' => $exams,
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
            'filters' => $request->only(['search', 'standard_id', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('exams.create');

        return Inertia::render('Examination/Exams/Create', [
            'examTypes' => ExamType::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
            'academicSessions' => AcademicSession::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('exams.create');

        $validated = $request->validate([
            'exam_type_id' => ['required', 'exists:exam_types,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'standard_id' => ['required', 'exists:standards,id'],
            'name' => ['required', 'string', 'max:150'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'total_marks' => ['required', 'integer', 'min:1'],
            'passing_marks' => ['required', 'integer', 'min:0', 'lt:total_marks'],
            'status' => ['required', 'in:scheduled,ongoing,completed,cancelled'],
        ]);

        Exam::create($validated);

        return $this->successRedirect('exams.index', 'Exam created.');
    }

    public function show(Exam $exam)
    {
        $this->authorizePermission('exams.view');

        $exam->load([
            'examType:id,name',
            'standard:id,name',
            'academicSession:id,name',
            'examSchedules.subject:id,name',
        ]);

        return Inertia::render('Examination/Exams/Show', ['exam' => $exam]);
    }

    public function edit(Exam $exam)
    {
        $this->authorizePermission('exams.edit');

        return Inertia::render('Examination/Exams/Edit', [
            'exam' => $exam,
            'examTypes' => ExamType::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
            'standards' => Standard::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->where('status', 'active')->select('id', 'name')->get(),
            'academicSessions' => AcademicSession::whereIn('campus_id', $this->getAccessibleCampusIds())
                ->select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Exam $exam)
    {
        $this->authorizePermission('exams.edit');

        $validated = $request->validate([
            'exam_type_id' => ['required', 'exists:exam_types,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'standard_id' => ['required', 'exists:standards,id'],
            'name' => ['required', 'string', 'max:150'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'total_marks' => ['required', 'integer', 'min:1'],
            'passing_marks' => ['required', 'integer', 'min:0', 'lt:total_marks'],
            'status' => ['required', 'in:scheduled,ongoing,completed,cancelled'],
        ]);

        $exam->update($validated);

        return $this->successRedirect('exams.index', 'Exam updated.');
    }

    public function destroy(Exam $exam)
    {
        $this->authorizePermission('exams.delete');

        if ($exam->results()->exists()) {
            return back()->withErrors(['error' => 'Cannot delete exam with recorded results.']);
        }

        $exam->delete();
        return $this->successRedirect('exams.index', 'Exam deleted.');
    }
}