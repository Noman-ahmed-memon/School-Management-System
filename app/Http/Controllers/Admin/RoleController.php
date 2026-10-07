<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $this->authorizePermission('users.roles');

        $roles = Role::withCount(['users', 'permissions'])->get();

        return Inertia::render('Admin/Roles/Index', ['roles' => $roles]);
    }

    public function show(Role $role)
    {
        $this->authorizePermission('users.roles');

        $role->load('permissions');

        $permissions = Permission::all()->groupBy(function ($p) {
            return explode('.', $p->name)[0];
        });

        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
            'groupedPermissions' => $permissions,
        ]);
    }

    public function updatePermissions(Request $request, Role $role)
    {
        $this->authorizePermission('users.roles');

        $request->validate([
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role->syncPermissions($request->permissions ?? []);

        return back()->with('success', 'Permissions updated.');
    }
}