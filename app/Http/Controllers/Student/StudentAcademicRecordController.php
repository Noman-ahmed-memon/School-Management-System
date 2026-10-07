<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\AcademicSession;
use App\Models\Section;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentAcademicRecordController extends Controller
{
    public function index(Request $request, Student $student)
    {
        $this->authorizePermission('students.view');

        $records = $student->studentAcademicRecords()
            ->with(['standard:id,name', 'section:id,name', 'academicSession:id,name'])
            ->orderBy('enrollment_date', 'desc')
            ->get();

        return Inertia::render('Student/AcademicRecords/Index', [
            'student' => $student,
            'records' => $records,
        ]);
    }

    public function create(Student $student)
    {
        $this->authorizePermission('students.edit');

        return Inertia::render('Student/AcademicRecords/Create', [
            'student' => $student,
            'standards' => Standard::where('status', 'active')->select('id', 'name')->get(),
            'sections' => Section::where('status', 'active')->select('id', 'name', 'standard_id')->get(),
            'academicSessions' => AcademicSession::where('status', 'active')->select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request, Student $student)
    {
        $this->authorizePermission('students.edit');

        $validated = $request->validate([
            'standard_id' => ['required', 'exists:standards,id'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'academic_session_id' => ['required', 'exists:academic_sessions,id'],
            'enrollment_date' => ['required', 'date'],
            'status' => ['required', 'in:enrolled,promoted,graduated,transferred'],
        ]);

        if (empty($validated['section_id'])) {
            $validated['section_id'] = \App\Models\Section::where('standard_id', $validated['standard_id'])
                ->where('status', 'active')
                ->value('id');
        }

        if (empty($validated['section_id'])) {
            return back()->withErrors([
                'section_id' => 'No active section found for this standard. Create a section first.',
            ]);
        }

        $validated['student_id'] = $student->id;

        StudentAcademicRecord::create($validated);

        return back()->with('success', 'Academic record added successfully.');
    }

    public function update(Request $request, StudentAcademicRecord $record)
    {
        $this->authorizePermission('students.edit');

        $validated = $request->validate([
            'promotion_date' => ['nullable', 'date'],
            'status' => ['required', 'in:enrolled,promoted,graduated,transferred'],
        ]);

        $record->update($validated);

        return back()->with('success', 'Record updated.');
    }

    public function destroy(StudentAcademicRecord $record)
    {
        $this->authorizePermission('students.edit');
        $record->delete();
        return back()->with('success', 'Record deleted.');
    }
}