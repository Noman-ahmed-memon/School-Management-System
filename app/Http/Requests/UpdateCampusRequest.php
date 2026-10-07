<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCampusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('campuses.edit');
    }

    public function rules(): array
    {
        $campusId = $this->route('campus')->id ?? $this->route('campus');
        $vpId = $this->input('vp_id');

        return [
            // Campus info
            'school_id' => ['required', 'exists:schools,id'],
            'name' => ['required', 'string', 'max:150'],
            'code' => ['required', 'string', 'max:50', Rule::unique('campuses', 'code')->ignore($campusId)],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:20'],
            'status' => ['required', 'in:active,inactive'],

            // VP account
            'vp_id' => ['nullable', 'exists:users,id'],
            'vp_name' => ['required', 'string', 'max:100'],
            'vp_email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($vpId),
            ],
            'vp_password' => ['nullable', 'string', 'min:8'],
            'vp_phone' => ['nullable', 'string', 'max:20'],
        ];
    }
}