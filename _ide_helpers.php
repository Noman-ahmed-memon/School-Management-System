<?php

// ============================================
// SPATIE PERMISSION STUBS FOR INTELEPHENSE
// ============================================

namespace Spatie\Permission\Traits {
    /**
     * @method bool hasRole(string|array $roles, string $guard = null)
     * @method bool hasPermissionTo(string|array $permission, string $guard = null)
     * @method bool hasAnyRole(string|array $roles, string $guard = null)
     * @method bool hasAllRoles(string|array $roles, string $guard = null)
     * @method \Illuminate\Database\Eloquent\Collection getRoleNames()
     * @method \Illuminate\Database\Eloquent\Collection getPermissionNames()
     * @method \Illuminate\Database\Eloquent\Collection getAllPermissions()
     * @method bool givePermissionTo(string|array $permission, string $guard = null)
     * @method bool syncPermissions(string|array $permissions)
     * @method bool revokePermissionTo(string|array $permission)
     * @method bool assignRole(string|array $roles, string $guard = null)
     * @method bool syncRoles(string|array $roles, string $guard = null)
     * @method bool removeRole(string|array $roles)
     */
    trait HasRoles {}
}

namespace {
    // User model stub
    class User extends \Illuminate\Foundation\Auth\User {
        use \Spatie\Permission\Traits\HasRoles;
    }
}

// ============================================
// LARAVEL MAGIC METHOD STUBS
// ============================================

namespace Illuminate\Database\Eloquent {
    /**
     * @method static \Illuminate\Database\Eloquent\Builder where($column, $operator = null, $value = null, $boolean = 'and')
     * @method static \Illuminate\Database\Eloquent\Builder whereIn($column, $values, $boolean = 'and', $not = false)
     * @method static \Illuminate\Database\Eloquent\Builder whereBetween($column, $values, $boolean = 'and', $not = false)
     * @method static \Illuminate\Database\Eloquent\Builder whereNull($columns, $boolean = 'and', $not = false)
     * @method static \Illuminate\Database\Eloquent\Builder whereNotNull($columns, $boolean = 'and')
     * @method static \Illuminate\Database\Eloquent\Builder orderBy($column, $direction = 'asc')
     * @method static \Illuminate\Database\Eloquent\Builder limit($value)
     * @method static \Illuminate\Database\Eloquent\Builder skip($value)
     * @method static \Illuminate\Database\Eloquent\Builder first()
     * @method static \Illuminate\Database\Eloquent\Builder get()
     * @method static \Illuminate\Database\Eloquent\Builder paginate($perPage = null, $columns = ['*'], $pageName = 'page', $page = null)
     * @method static \Illuminate\Database\Eloquent\Builder find($id, $columns = ['*'])
     * @method static \Illuminate\Database\Eloquent\Builder findOrFail($id, $columns = ['*'])
     * @method static \Illuminate\Database\Eloquent\Builder create(array $attributes = [])
     * @method static \Illuminate\Database\Eloquent\Builder update(array $values)
     * @method static \Illuminate\Database\Eloquent\Builder delete()
     */
    class Model {}
}