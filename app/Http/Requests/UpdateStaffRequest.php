<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStaffRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('staff.edit');
    }

    public function rules(): array
    {
        $staff = $this->route('staff');
        $staffId = $staff->id ?? $staff;
        $userId = is_object($staff) ? $staff->user_id : null;

        return [
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'phone' => ['nullable', 'string', 'max:20'],
            'employee_id' => ['required', 'string', Rule::unique('staff', 'employee_id')->ignore($staffId)],
            'department_id' => ['required', 'exists:departments,id'],
            'designation' => ['required', 'string', 'max:100'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'employment_type' => ['required', 'in:full_time,part_time,contract,intern'],
            'joining_date' => ['required', 'date'],
            'termination_date' => ['nullable', 'date'],
            'status' => ['required', 'in:active,inactive,terminated'],
        ];
    }
}