<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSchoolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('schools.edit');
    }

    public function rules(): array
    {
        $schoolId = $this->route('school')->id ?? $this->route('school');
        $principalId = $this->input('principal_id');

        return [
            // School info
            'organization_id' => ['required', 'exists:organizations,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', Rule::unique('schools', 'code')->ignore($schoolId)],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'website' => ['nullable', 'url'],
            'established_year' => ['nullable', 'integer', 'min:1800', 'max:' . date('Y')],
            'status' => ['required', 'in:active,inactive'],

            // Principal account
            'principal_id' => ['nullable', 'exists:users,id'],
            'principal_name' => ['required', 'string', 'max:100'],
            'principal_email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($principalId),
            ],
            'principal_password' => ['nullable', 'string', 'min:8'],
            'principal_phone' => ['nullable', 'string', 'max:20'],
        ];
    }
}