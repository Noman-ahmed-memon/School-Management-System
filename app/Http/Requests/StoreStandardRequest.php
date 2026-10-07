<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStandardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('standards.create');
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('standards', 'code')
            ],
            'order' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Standard name is required.',
            'code.required' => 'Standard code is required.',
            'code.unique' => 'This code is already in use.',
        ];
    }
}