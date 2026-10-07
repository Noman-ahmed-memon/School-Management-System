<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PermissionHelper
{
    // Check if current user has permission
    public static function can($permission): bool
    {
        return Auth::check() && Auth::user()->hasPermissionTo($permission);
    }

    // Check if current user has role
    public static function hasRole($role): bool
    {
        return Auth::check() && Auth::user()->hasRole($role);
    }

    // Check if current user is super admin
    public static function isSuperAdmin(): bool
    {
        return Auth::check() && Auth::user()->hasRole('super_admin');
    }

    // Check if current user is admin
    public static function isAdmin(): bool
    {
        return Auth::check() && Auth::user()->hasRole('school_admin');
    }

    // Check if current user is teacher
    public static function isTeacher(): bool
    {
        return Auth::check() && Auth::user()->hasRole('teacher');
    }

    // Check if current user is student
    public static function isStudent(): bool
    {
        return Auth::check() && Auth::user()->hasRole('student');
    }

    // Check if current user is guardian
    public static function isGuardian(): bool
    {
        return Auth::check() && Auth::user()->hasRole('guardian');
    }

    // Get user's role display name
    public static function getRoleDisplayName(): string
    {
        if (!Auth::check()) {
            return 'Guest';
        }

        $roles = [
            'super_admin' => 'Super Admin',
            'school_admin' => 'School Admin',
            'principal' => 'Principal',
            'vice_principal' => 'Vice Principal',
            'teacher' => 'Teacher',
            'accountant' => 'Accountant',
            'librarian' => 'Librarian',
            'receptionist' => 'Receptionist',
            'student' => 'Student',
            'guardian' => 'Parent/Guardian',
            'transport_manager' => 'Transport Manager',
            'hr_manager' => 'HR Manager',
            'staff' => 'Staff'
        ];

        $role = Auth::user()->getRoleNames()->first();
        return $roles[$role] ?? $role ?? 'No Role';
    }

    // Check if user has any role in list
    public static function hasAnyRole($roles): bool
    {
        if (!Auth::check()) {
            return false;
        }
        
        foreach ($roles as $role) {
            if (Auth::user()->hasRole($role)) {
                return true;
            }
        }
        return false;
    }

    // Check if user has all roles in list
    public static function hasAllRoles($roles): bool
    {
        if (!Auth::check()) {
            return false;
        }
        
        foreach ($roles as $role) {
            if (!Auth::user()->hasRole($role)) {
                return false;
            }
        }
        return true;
    }

    // Get user's roles
    public static function getUserRoles()
    {
        return Auth::check() ? Auth::user()->getRoleNames() : collect();
    }

    // Get user's permissions
    public static function getUserPermissions()
    {
        return Auth::check() ? Auth::user()->getAllPermissions() : collect();
    }

    // Check if user has permission (alias)
    public static function hasPermission($permission): bool
    {
        return self::can($permission);
    }
}