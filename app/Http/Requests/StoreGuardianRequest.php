<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuardianRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('guardians.create');
    }

    public function rules(): array
    {
        return [
            // Campus selection
            'campus_id' => ['nullable', 'exists:campuses,id'],

            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'relation' => ['required', 'in:father,mother,guardian'],
        ];
    }
}