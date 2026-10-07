<?php

namespace App\Http\Controllers\Result;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\GradingSystem;
use App\Models\Result;
use App\Models\ResultSummary;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Marks entry page
     */
    public function marksEntry(Request $request, Exam $exam)
    {
        $this->authorizePermission('results.manage');

        $exam->load(['standard:id,name', 'examType:id,name', 'academicSession:id,name']);

        // Get students of this standard
        $students = StudentAcademicRecord::with('student:id,first_name,last_name,admission_number,roll_number,student_photo')
            ->where('standard_id', $exam->standard_id)
            ->where('academic_session_id', $exam->academic_session_id)
            ->where('status', 'enrolled')
            ->get()
            ->pluck('student')
            ->filter()
            ->values();

        // Get subjects of this standard
        $subjects = Subject::whereHas('standardSubjects', function ($q) use ($exam) {
            $q->where('standard_id', $exam->standard_id);
        })->select('id', 'name', 'code')->get();

        // Existing results grouped by student_id -> subject_id
        $existing = Result::where('exam_id', $exam->id)
            ->get()
            ->groupBy('student_id')
            ->map(fn($items) => $items->keyBy('subject_id'));

        return Inertia::render('Result/Results/MarksEntry', [
            'exam' => $exam,
            'students' => $students,
            'subjects' => $subjects,
            'existing' => $existing,
        ]);
    }

    /**
     * Save marks
     */
    public function saveMarks(Request $request, Exam $exam)
    {
        $this->authorizePermission('results.manage');

        $validated = $request->validate([
            'results' => ['required', 'array'],
            'results.*.student_id' => ['required', 'exists:students,id'],
            'results.*.subject_id' => ['required', 'exists:subjects,id'],
            'results.*.marks_obtained' => ['required', 'numeric', 'min:0', 'max:' . $exam->total_marks],
        ]);

        DB::transaction(function () use ($validated, $exam) {
            foreach ($validated['results'] as $r) {
                $percentage = ($r['marks_obtained'] / $exam->total_marks) * 100;
                $isPassed = $r['marks_obtained'] >= $exam->passing_marks;

                $grade = GradingSystem::where('campus_id', $this->getCampusId())
                    ->where('min_percentage', '<=', $percentage)
                    ->where('max_percentage', '>=', $percentage)
                    ->first();

                Result::updateOrCreate(
                    [
                        'student_id' => $r['student_id'],
                        'exam_id' => $exam->id,
                        'subject_id' => $r['subject_id'],
                    ],
                    [
                        'marks_obtained' => $r['marks_obtained'],
                        'total_marks' => $exam->total_marks,
                        'percentage' => $percentage,
                        'grade' => $grade->grade ?? 'F',
                        'grade_points' => $grade->points ?? 0,
                        'is_passed' => $isPassed,
                    ]
                );
            }

            $this->recalculateSummaries($exam);
        });

        return back()->with('success', 'Marks saved successfully.');
    }

    /**
     * Results overview — list all exams with result status
     */
    public function index(Request $request)
    {
        $this->authorizePermission('results.view');

        $exams = Exam::query()
            ->with(['examType:id,name', 'standard:id,name', 'academicSession:id,name'])
            ->withCount(['results', 'resultSummaries'])
            ->when($request->search, fn($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Result/Results/Index', [
            'exams' => $exams,
            'standards' => \App\Models\Standard::where('status', 'active')->select('id', 'name', 'code')->get(),
            'filters' => $request->only(['search', 'standard_id', 'status', 'per_page']),
        ]);
    }

    /**
     * Show results for an exam
     */
    public function show(Exam $exam)
    {
        $this->authorizePermission('results.view');

        $exam->load(['standard:id,name', 'examType:id,name', 'academicSession:id,name']);

        $summaries = ResultSummary::with('student:id,first_name,last_name,admission_number,roll_number')
            ->where('exam_id', $exam->id)
            ->orderByDesc('percentage')
            ->get();

        return Inertia::render('Result/Results/Show', [
            'exam' => $exam,
            'summaries' => $summaries,
        ]);
    }

    /**
     * Student report card
     */
    public function reportCard(Student $student, Exam $exam)
    {
        $this->authorizePermission('results.view');

        $student->load(['campus.school:id,name']);

        $exam->load(['standard:id,name', 'examType:id,name', 'academicSession:id,name']);

        $results = Result::with('subject:id,name,code')
            ->where('student_id', $student->id)
            ->where('exam_id', $exam->id)
            ->get();

        $summary = ResultSummary::where('student_id', $student->id)
            ->where('exam_id', $exam->id)
            ->first();

        return Inertia::render('Result/Results/ReportCard', [
            'student' => $student,
            'exam' => $exam,
            'results' => $results,
            'summary' => $summary,
        ]);
    }

    /**
     * Publish results
     */
    public function publish(Exam $exam)
    {
        $this->authorizePermission('results.publish');

        $exam->update(['status' => 'completed']);

        return back()->with('success', 'Results published successfully.');
    }

    /**
     * Recalculate summaries
     */
    private function recalculateSummaries(Exam $exam): void
    {
        $studentIds = Result::where('exam_id', $exam->id)
            ->distinct('student_id')
            ->pluck('student_id');

        foreach ($studentIds as $studentId) {
            $results = Result::where('student_id', $studentId)
                ->where('exam_id', $exam->id)
                ->get();

            $totalObtained = $results->sum('marks_obtained');
            $totalMarks = $results->sum('total_marks');
            $percentage = $totalMarks > 0 ? ($totalObtained / $totalMarks) * 100 : 0;
            $isPassed = $results->every(fn($r) => $r->is_passed);

            $grade = GradingSystem::where('campus_id', $this->getCampusId())
                ->where('min_percentage', '<=', $percentage)
                ->where('max_percentage', '>=', $percentage)
                ->first();

            ResultSummary::updateOrCreate(
                [
                    'student_id' => $studentId,
                    'exam_id' => $exam->id,
                ],
                [
                    'total_marks_obtained' => $totalObtained,
                    'total_marks' => $totalMarks,
                    'percentage' => $percentage,
                    'grade' => $grade->grade ?? 'F',
                    'gpa' => $grade->points ?? 0,
                    'is_passed' => $isPassed,
                ]
            );
        }

        // Assign positions
        $summaries = ResultSummary::where('exam_id', $exam->id)
            ->orderByDesc('percentage')
            ->get();

        foreach ($summaries as $index => $s) {
            $s->update(['position' => $index + 1]);
        }
    }
}