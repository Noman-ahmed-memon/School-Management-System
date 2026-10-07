<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStandardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('standards.edit');
    }

    public function rules(): array
    {
        $standardId = $this->route('standard')->id ?? $this->route('standard');

        return [
            'name' => ['required', 'string', 'max:100'],
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('standards', 'code')->ignore($standardId)
            ],
            'order' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}