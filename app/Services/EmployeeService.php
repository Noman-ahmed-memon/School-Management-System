<?php

namespace App\Services;

use App\Models\Staff;
use App\Models\Teacher;

class EmployeeService
{
    /**
     * Get all employees (teachers + staff) unified, sorted by name.
     */
    public static function all()
    {
        $teachers = Teacher::with('user:id,name,email')
            ->where('status', 'active')
            ->get()
            ->map(fn($t) => (object)[
                'id' => $t->id,
                'type' => 'teacher',
                'name' => $t->user->name ?? 'N/A',
                'email' => $t->user->email ?? null,
                'employee_id' => $t->employee_id,
                'salary' => $t->salary ?? 0,
            ]);

        $staff = Staff::with('user:id,name,email')
            ->where('status', 'active')
            ->get()
            ->map(fn($s) => (object)[
                'id' => $s->id,
                'type' => 'staff',
                'name' => $s->user->name ?? 'N/A',
                'email' => $s->user->email ?? null,
                'employee_id' => $s->employee_id,
                'salary' => $s->salary ?? 0,
            ]);

        return $teachers->concat($staff)->sortBy('name')->values();
    }

    /**
     * Find employee by type + id.
     */
    public static function find(string $type, int $id)
    {
        return $type === 'teacher'
            ? Teacher::with('user')->find($id)
            : Staff::with('user')->find($id);
    }

    /**
     * Get the FK column for a given type.
     */
    public static function fkColumn(string $type): string
    {
        return $type === 'teacher' ? 'teacher_id' : 'staff_id';
    }

    /**
     * Get the inverse FK column.
     */
    public static function otherFkColumn(string $type): string
    {
        return $type === 'teacher' ? 'staff_id' : 'teacher_id';
    }
};