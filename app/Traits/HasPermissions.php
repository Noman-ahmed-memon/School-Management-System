<?php

namespace App\Traits;

use Spatie\Permission\Models\Permission;

trait HasPermissions
{
    /**
     * Check if user has permission (alias)
     */
    public function hasPermission($permission)
    {
        return $this->hasPermissionTo($permission);
    }

    /**
     * Get user's permission names as array
     */
    public function getUserPermissions()
    {
        return $this->getAllPermissions()->pluck('name')->toArray();
    }

    /**
     * Get user's role names as array
     */
    public function getUserRoles()
    {
        return $this->getRoleNames()->toArray();
    }

    /**
     * Sync permissions by ID array
     */
    public function syncPermissionsById(array $permissionIds)
    {
        $permissions = Permission::whereIn('id', $permissionIds)->get();
        return $this->syncPermissions($permissions);
    }

    /**
     * Give multiple permissions at once
     */
    public function giveMultiplePermissions(array $permissions)
    {
        foreach ($permissions as $permission) {
            $this->givePermissionTo($permission);
        }
        return $this;
    }

    /**
     * Revoke multiple permissions at once
     */
    public function revokeMultiplePermissions(array $permissions)
    {
        foreach ($permissions as $permission) {
            $this->revokePermissionTo($permission);
        }
        return $this;
    }

    /**
     * Check if user has any role from list
     */
    public function hasAnyRoleFromList(array $roles)
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if user has all roles from list
     */
    public function hasAllRolesFromList(array $roles)
    {
        foreach ($roles as $role) {
            if (!$this->hasRole($role)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get user's permission grouped by module
     */
    public function getPermissionsGrouped()
    {
        $permissions = $this->getAllPermissions();
        $grouped = [];
        
        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $module = $parts[0] ?? 'general';
            $grouped[$module][] = $permission->name;
        }
        
        return $grouped;
    }

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin()
    {
        return $this->hasRole('super_admin');
    }

    /**
     * Check if user is school admin
     */
    public function isSchoolAdmin()
    {
        return $this->hasRole('school_admin');
    }

    /**
     * Check if user is teacher
     */
    public function isTeacher()
    {
        return $this->hasRole('teacher');
    }

    /**
     * Check if user is student
     */
    public function isStudent()
    {
        return $this->hasRole('student');
    }

    /**
     * Check if user is guardian
     */
    public function isGuardian()
    {
        return $this->hasRole('guardian');
    }

    /**
     * Get user's role display name
     */
    public function getRoleDisplayName()
    {
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

        $role = $this->getRoleNames()->first();
        return $roles[$role] ?? $role ?? 'No Role';
    }
}