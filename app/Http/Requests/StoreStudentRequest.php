<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('students.create');
    }

    public function rules(): array
    {
        return [
            // Campus selection (for super admin / principal)
            'campus_id' => ['nullable', 'exists:campuses,id'],

            // Personal
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'admission_number' => ['required', 'string', 'unique:students,admission_number'],
            'roll_number' => ['nullable', 'string', 'max:50'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'gender' => ['required', 'in:male,female,other'],
            'blood_group' => ['nullable', 'in:A+,A-,B+,B-,AB+,AB-,O+,O-'],
            'nationality' => ['nullable', 'string', 'max:50'],
            'religion' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
            'previous_school' => ['nullable', 'string', 'max:200'],
            'admission_date' => ['required', 'date'],
            'student_photo' => ['nullable', 'image', 'max:2048'],
            'status' => ['required', 'in:application,admitted,enrolled,active,promoted,graduated,transferred,dropped'],

            // Academic placement (optional)
            'standard_id' => ['nullable', 'exists:standards,id'],
            'section_id' => ['nullable', 'exists:sections,id'],
            'academic_session_id' => ['nullable', 'exists:academic_sessions,id'],
        ];
    }
}