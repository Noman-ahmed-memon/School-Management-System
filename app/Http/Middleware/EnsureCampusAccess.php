<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureCampusAccess
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Super admin has full access
        if ($user->hasRole('super_admin')) {
            return $next($request);
        }

        // School admin needs school_id
        if ($user->hasRole('school_admin') && !$user->school_id) {
            abort(403, 'Your account is not assigned to a school. Contact administrator.');
        }

        // Other roles need campus_id
        if (!$user->school_id && !$user->campus_id) {
            abort(403, 'Your account is not assigned to a campus. Contact administrator.');
        }

        return $next($request);
    }
}