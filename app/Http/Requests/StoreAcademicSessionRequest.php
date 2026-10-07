<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAcademicSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasPermissionTo('academic_sessions.create');
    }

    public function rules(): array
    {
        return [
            'campus_id' => ['required', 'exists:campuses,id'],
            'name' => ['required', 'string', 'max:50'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'is_current' => ['boolean'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}