<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSchoolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('schools.create');
    }

    public function rules(): array
    {
        return [
            // School info
            'organization_id' => ['required', 'exists:organizations,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:schools,code'],
            'email' => ['nullable', 'email', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'website' => ['nullable', 'url', 'max:150'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
            'status' => ['required', 'in:active,inactive'],

            // Principal account (required on create)
            'principal_name' => ['required', 'string', 'max:100'],
            'principal_email' => ['required', 'email', 'unique:users,email'],
            'principal_password' => ['required', 'string', 'min:8'],
            'principal_phone' => ['nullable', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'principal_email.unique' => 'A user with this email already exists.',
            'principal_password.min' => 'Password must be at least 8 characters.',
        ];
    }
}