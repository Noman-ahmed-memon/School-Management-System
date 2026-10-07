<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentDocumentController extends Controller
{
    public function store(Request $request, Student $student)
    {
        $this->authorizePermission('students.edit');

        $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'file' => ['required', 'file', 'max:5120'], // 5MB
            'type' => ['required', 'in:birth_certificate,previous_school_letter,medical_report,other'],
        ]);

        $path = $request->file('file')->store('students/documents', 'public');

        StudentDocument::create([
            'student_id' => $student->id,
            'name' => $request->name,
            'file_path' => $path,
            'type' => $request->type,
            'uploaded_at' => now(),
        ]);

        return back()->with('success', 'Document uploaded.');
    }

    public function destroy(StudentDocument $document)
    {
        $this->authorizePermission('students.edit');

        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return back()->with('success', 'Document deleted.');
    }
}