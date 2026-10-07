<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('sections.edit');
    }

    public function rules(): array
    {
        return [
            'standard_id' => ['required', 'exists:standards,id'],
            'name' => ['required', 'string', 'max:50'],
            'code' => ['nullable', 'string', 'max:20'],
            'capacity' => ['nullable', 'integer', 'min:1', 'max:100'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}