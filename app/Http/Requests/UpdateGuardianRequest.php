<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGuardianRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('guardians.edit');
    }

    public function rules(): array
    {
        $guardian = $this->route('guardian');
        $guardianId = $guardian->id ?? $guardian;
        $userId = is_object($guardian) ? $guardian->user_id : null;

        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'relation' => ['required', 'in:father,mother,guardian'],
        ];
    }
}