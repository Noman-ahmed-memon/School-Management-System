<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('teachers.create');
    }

    public function rules(): array
    {
        return [
            // Campus selection
            'campus_id' => ['nullable', 'exists:campuses,id'],

            // User account
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'phone' => ['nullable', 'string', 'max:20'],
            'gender' => ['nullable', 'in:male,female,other'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'max:500'],

            // Teacher profile
            'employee_id' => ['required', 'string', 'unique:teachers,employee_id'],
            'qualification' => ['nullable', 'string', 'max:200'],
            'experience_years' => ['nullable', 'integer', 'min:0'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_type' => ['required', 'in:full_time,part_time,contract,intern'],
            'specialization' => ['nullable', 'string', 'max:100'],
            'joining_date' => ['required', 'date'],
            'status' => ['required', 'in:active,inactive,terminated'],
        ];
    }
}