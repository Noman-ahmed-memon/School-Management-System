<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Section;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use App\Models\StudentAttendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentAttendanceController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('attendance.view');

        $attendances = StudentAttendance::query()
            ->with([
                'student:id,first_name,last_name,admission_number',
                'standard:id,name',
                'section:id,name',
            ])
            ->when($request->date, fn($q, $d) => $q->whereDate('date', $d))
            ->when($request->standard_id, fn($q, $id) => $q->where('standard_id', $id))
            ->when($request->section_id, fn($q, $id) => $q->where('section_id', $id))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->orderBy('date', 'desc')
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Student/Attendances/Index', [
            'attendances' => $attendances,
            'standards' => Standard::where('status', 'active')->select('id', 'name')->get(),
            'filters' => $request->only(['date', 'standard_id', 'section_id', 'status', 'per_page']),
        ]);
    }

    /**
     * Mark attendance page (choose class → section → date)
     */
    public function mark(Request $request)
    {
        $this->authorizePermission('attendance.mark');

        $standardId = $request->standard_id;
        $sectionId = $request->section_id;
        $date = $request->date ?? now()->toDateString();

        $students = collect();
        $existing = collect();

        if ($standardId && $sectionId) {
            $sessionId = AcademicSession::where('campus_id', $this->getCampusId())
                ->where('is_current', true)
                ->value('id');

            $students = StudentAcademicRecord::query()
                ->with('student:id,first_name,last_name,admission_number,student_photo')
                ->where('standard_id', $standardId)
                ->where('section_id', $sectionId)
                ->where('academic_session_id', $sessionId)
                ->where('status', 'enrolled')
                ->get()
                ->pluck('student');

            $existing = StudentAttendance::whereDate('date', $date)
                ->where('standard_id', $standardId)
                ->where('section_id', $sectionId)
                ->get()
                ->keyBy('student_id');
        }

        return Inertia::render('Student/Attendances/Mark', [
            'standards' => Standard::where('status', 'active')->select('id', 'name')->get(),
            'sections' => Section::where('status', 'active')->select('id', 'name', 'standard_id')->get(),
            'students' => $students,
            'existing' => $existing,
            'filters' => [
                'standard_id' => $standardId,
                'section_id' => $sectionId,
                'date' => $date,
            ],
        ]);
    }

    /**
     * Store/Update bulk attendance
     */
    public function store(Request $request)
    {
        $this->authorizePermission('attendance.mark');

        $validated = $request->validate([
            'date' => ['required', 'date'],
            'standard_id' => ['required', 'exists:standards,id'],
            'section_id' => ['required', 'exists:sections,id'],
            'attendances' => ['required', 'array'],
            'attendances.*.student_id' => ['required', 'exists:students,id'],
            'attendances.*.status' => ['required', 'in:present,absent,late,leave,half_day'],
            'attendances.*.remark' => ['nullable', 'string', 'max:255'],
        ]);

        $sessionId = AcademicSession::where('campus_id', $this->getCampusId())
            ->where('is_current', true)
            ->value('id');

        if (!$sessionId) {
            return back()->withErrors(['error' => 'No active academic session found.']);
        }

        foreach ($validated['attendances'] as $att) {
            StudentAttendance::updateOrCreate(
                [
                    'student_id' => $att['student_id'],
                    'date' => $validated['date'],
                ],
                [
                    'standard_id' => $validated['standard_id'],
                    'section_id' => $validated['section_id'],
                    'academic_session_id' => $sessionId,
                    'status' => $att['status'],
                    'remark' => $att['remark'] ?? null,
                    'marked_by' => auth()->id(),
                ]
            );
        }

        return back()->with('success', 'Attendance saved successfully.');
    }

    /**
     * Daily report
     */
    public function report(Request $request)
    {
        $this->authorizePermission('attendance.report');

        $date = $request->date ?? now()->toDateString();

        $summary = StudentAttendance::whereDate('date', $date)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        return Inertia::render('Student/Attendances/Report', [
            'summary' => $summary,
            'date' => $date,
        ]);
    }

    public function destroy(StudentAttendance $attendance)
    {
        $this->authorizePermission('attendance.edit');
        $attendance->delete();
        return back()->with('success', 'Attendance record deleted.');
    }
}