<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizePermission('users.view');

        $users = User::query()
            ->with('roles:id,name')
            ->when($request->search, fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%"))
            ->when($request->role, fn($q, $r) => $q->role($r))
            ->when($request->status, fn($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate($request->per_page ?? 15)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => Role::select('id', 'name')->get(),
            'filters' => $request->only(['search', 'role', 'status', 'per_page']),
        ]);
    }

    public function create()
    {
        $this->authorizePermission('users.create');
        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizePermission('users.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'string', 'exists:roles,name'],
            'phone' => ['nullable', 'string', 'max:20'],
            'status' => ['required', 'in:active,inactive,suspended'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'phone' => $validated['phone'] ?? null,
            'status' => $validated['status'],
            'campus_id' => $this->getCampusId(),
        ]);

        $user->assignRole($validated['role']);

        return $this->successRedirect('users.index', 'User created.');
    }

    public function edit(User $user)
    {
        $this->authorizePermission('users.edit');
        $user->load('roles');

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => Role::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorizePermission('users.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => ['required', 'string', 'exists:roles,name'],
            'phone' => ['nullable', 'string', 'max:20'],
            'status' => ['required', 'in:active,inactive,suspended'],
        ]);

        $user->update($validated);
        $user->syncRoles([$validated['role']]);

        return $this->successRedirect('users.index', 'User updated.');
    }

    public function destroy(User $user)
    {
        $this->authorizePermission('users.delete');

        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Cannot delete yourself.']);
        }

        $user->delete();
        return $this->successRedirect('users.index', 'User deleted.');
    }

    public function resetPassword(Request $request, User $user)
    {
        $this->authorizePermission('users.edit');

        $request->validate([
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user->update(['password' => Hash::make($request->password)]);

        return back()->with('success', 'Password reset successfully.');
    }
}