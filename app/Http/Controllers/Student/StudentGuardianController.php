<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Guardian;
use App\Models\Student;
use App\Models\StudentGuardian;
use Illuminate\Http\Request;

class StudentGuardianController extends Controller
{
    public function store(Request $request)
    {
        $this->authorizePermission('guardians.create');

        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'guardian_id' => ['required', 'exists:guardians,id'],
            'is_primary_contact' => ['boolean'],
        ]);

        $exists = StudentGuardian::where('student_id', $validated['student_id'])
            ->where('guardian_id', $validated['guardian_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['guardian_id' => 'This guardian is already linked.']);
        }

        // If new one is primary, unset others
        if (!empty($validated['is_primary_contact'])) {
            StudentGuardian::where('student_id', $validated['student_id'])
                ->update(['is_primary_contact' => false]);
        }

        StudentGuardian::create($validated);

        return back()->with('success', 'Guardian linked successfully.');
    }

    public function destroy(StudentGuardian $studentGuardian)
    {
        $this->authorizePermission('guardians.delete');
        $studentGuardian->delete();
        return back()->with('success', 'Guardian unlinked.');
    }

    public function setPrimary(StudentGuardian $studentGuardian)
    {
        $this->authorizePermission('guardians.edit');

        StudentGuardian::where('student_id', $studentGuardian->student_id)
            ->where('id', '!=', $studentGuardian->id)
            ->update(['is_primary_contact' => false]);

        $studentGuardian->update(['is_primary_contact' => true]);

        return back()->with('success', 'Primary contact updated.');
    }
}