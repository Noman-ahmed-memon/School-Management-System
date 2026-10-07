<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('teachers.edit');
    }

    public function rules(): array
    {
        $teacher = $this->route('teacher');
        $teacherId = $teacher->id ?? $teacher;
        $userId = is_object($teacher) ? $teacher->user_id : null;

        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'phone' => ['nullable', 'string', 'max:20'],
            'gender' => ['nullable', 'in:male,female,other'],
            'date_of_birth' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'max:500'],
            'employee_id' => ['required', 'string', Rule::unique('teachers', 'employee_id')->ignore($teacherId)],
            'qualification' => ['nullable', 'string', 'max:200'],
            'experience_years' => ['nullable', 'integer', 'min:0'],
            'specialization' => ['nullable', 'string', 'max:100'],
            'joining_date' => ['required', 'date'],
            'status' => ['required', 'in:active,inactive,terminated'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_type' => ['required', 'in:full_time,part_time,contract,intern'],
        ];
    }
}