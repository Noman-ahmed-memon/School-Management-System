<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStaffRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('staff.create');
    }

    public function rules(): array
    {
        return [
            // Campus selection
            'campus_id' => ['nullable', 'exists:campuses,id'],

            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'phone' => ['nullable', 'string', 'max:20'],
            'employee_id' => ['required', 'string', 'unique:staff,employee_id'],
            'department_id' => ['required', 'exists:departments,id'],
            'designation' => ['required', 'string', 'max:100'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_type' => ['required', 'in:full_time,part_time,contract,intern'],
            'joining_date' => ['required', 'date'],
            'status' => ['required', 'in:active,inactive,terminated'],
        ];
    }
}