<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('subjects.create');
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'code' => ['required', 'string', 'max:50', 'unique:subjects,code'],
            'type' => ['required', 'in:theory,practical'],
            'is_compulsory' => ['boolean'],
            'credit_hours' => ['nullable', 'integer', 'min:0', 'max:20'],
            'description' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}