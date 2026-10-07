<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('subjects.edit');
    }

    public function rules(): array
    {
        $id = $this->route('subject')->id ?? $this->route('subject');

        return [
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', Rule::unique('subjects', 'code')->ignore($id)],
            'type' => ['required', 'in:theory,practical'],
            'is_compulsory' => ['boolean'],
            'credit_hours' => ['nullable', 'integer', 'min:0', 'max:20'],
            'description' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}