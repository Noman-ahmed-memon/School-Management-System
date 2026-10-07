<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCampusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('campuses.create');
    }

    public function rules(): array
    {
        return [
            // Campus info
            'school_id' => ['required', 'exists:schools,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', 'unique:campuses,code'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'status' => ['required', 'in:active,inactive'],

            // Vice Principal account (required)
            'vp_name' => ['required', 'string', 'max:100'],
            'vp_email' => ['required', 'email', 'unique:users,email'],
            'vp_password' => ['required', 'string', 'min:8'],
            'vp_phone' => ['nullable', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'vp_email.unique' => 'A user with this email already exists.',
            'vp_password.min' => 'Password must be at least 8 characters.',
        ];
    }
}