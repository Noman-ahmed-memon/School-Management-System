<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDepartmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('departments.edit');
    }

    public function rules(): array
    {
        $id = $this->route('department')->id ?? $this->route('department');

        return [
            'campus_id' => ['required', 'exists:campuses,id'],
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', Rule::unique('departments', 'code')->ignore($id)],
            'description' => ['nullable', 'string', 'max:500'],
            'head_name' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}