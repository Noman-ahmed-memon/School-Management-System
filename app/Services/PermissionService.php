<?php

namespace App\Services;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class PermissionService
{
    // Get all roles
    public function getAllRoles()
    {
        return Role::all();
    }

    // Get all permissions
    public function getAllPermissions()
    {
        return Permission::all();
    }

    // Get user's roles
    public function getUserRoles(User $user)
    {
        return $user->getRoleNames();
    }

    // Get user's permissions
    public function getUserPermissions(User $user)
    {
        return $user->getAllPermissions();
    }

    // Assign role to user
    public function assignRole(User $user, $role)
    {
        return $user->assignRole($role);
    }

    // Remove role from user
    public function removeRole(User $user, $role)
    {
        return $user->removeRole($role);
    }

    // Sync user roles
    public function syncRoles(User $user, array $roles)
    {
        return $user->syncRoles($roles);
    }

    // Give permission to user
    public function givePermissionTo(User $user, $permission)
    {
        return $user->givePermissionTo($permission);
    }

    // Revoke permission from user
    public function revokePermissionTo(User $user, $permission)
    {
        return $user->revokePermissionTo($permission);
    }

    // Create new role
    public function createRole($name, $permissions = [])
    {
        $role = Role::create(['name' => $name]);
        if (!empty($permissions)) {
            $role->givePermissionTo($permissions);
        }
        return $role;
    }

    // Delete role
    public function deleteRole($roleName)
    {
        $role = Role::findByName($roleName);
        return $role->delete();
    }

    // Create new permission
    public function createPermission($name)
    {
        return Permission::create(['name' => $name]);
    }

    // Delete permission
    public function deletePermission($permissionName)
    {
        $permission = Permission::findByName($permissionName);
        return $permission->delete();
    }

    // Check if user has role
    public function hasRole(User $user, $role)
    {
        return $user->hasRole($role);
    }

    // Check if user has permission
    public function hasPermission(User $user, $permission)
    {
        return $user->hasPermissionTo($permission);
    }

    // Get users with specific role
    public function getUsersWithRole($role)
    {
        return User::role($role)->get();
    }

    // Get users with specific permission
    public function getUsersWithPermission($permission)
    {
        return User::permission($permission)->get();
    }
}