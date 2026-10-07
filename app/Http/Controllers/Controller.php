<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Helpers\PermissionHelper;
use Illuminate\Http\JsonResponse;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /* ==================== PERMISSIONS ==================== */

    protected function can($permission): bool
    {
        return PermissionHelper::can($permission);
    }

    protected function authorizePermission($permission): void
    {
        if (!$this->can($permission)) {
            abort(403, 'Unauthorized. You do not have permission: ' . $permission);
        }
    }

    protected function hasRole($role): bool
    {
        return PermissionHelper::hasRole($role);
    }

    protected function isSuperAdmin(): bool
    {
        $user = auth()->user();
        return $user ? $user->isSuperAdmin() : false;
    }

    protected function isSchoolLevel(): bool
    {
        $user = auth()->user();
        return $user ? $user->isSchoolLevel() : false;
    }

    protected function isCampusLevel(): bool
    {
        $user = auth()->user();
        return $user ? $user->isCampusLevel() : false;
    }

    /* ==================== SCOPING HELPERS ==================== */

    protected function getCampusId()
    {
        $user = auth()->user();
        if (!$user) return null;

        // If a campus_id is explicitly provided in request and user can access it
        $requestedCampusId = request('campus_id');
        if ($requestedCampusId && in_array((int) $requestedCampusId, $user->accessible_campus_ids)) {
            return (int) $requestedCampusId;
        }

        // If user is assigned to a specific campus, use it
        if ($user->campus_id) {
            return $user->campus_id;
        }

        // Super admin / Principal → no auto-fallback
        return null;
    }

    protected function getSchoolId()
    {
        $user = auth()->user();

        if (!$user) return null;

        if ($user->isSuperAdmin()) {
            return request('school_id') ?: $user->school_id;
        }

        return $user->school_id;
    }

    protected function getAccessibleCampusIds(): array
    {
        $user = auth()->user();
        if (!$user) return [];

        return $user->accessible_campus_ids;
    }

    protected function getAccessibleSchoolIds(): array
    {
        $user = auth()->user();

        if (!$user) return [];

        if ($user->isSuperAdmin()) {
            return \App\Models\School::pluck('id')->toArray();
        }

        if ($user->isSchoolLevel() && $user->school_id) {
            return [$user->school_id];
        }

        if ($user->campus_id) {
            $schoolId = \App\Models\Campus::where('id', $user->campus_id)->value('school_id');
            return $schoolId ? [$schoolId] : [];
        }

        return [];
    }

    /**
     * Scope query by accessible campus IDs.
     * For principals: filters to all campuses of their school.
     * For campus-level users: filters to their campus only.
     *
     * If the model has `campus_id` directly, no need for $viaRelation.
     * If not, pass the relation name that leads to campus_id.
     */
    protected function scopeQuery($query, $campusColumn = 'campus_id', $viaRelation = null)
    {
        $user = auth()->user();

        if (!$user) return $query;

        if ($user->isSuperAdmin()) {
            return $query;
        }

        $campusIds = $user->accessible_campus_ids;

        if (empty($campusIds)) {
            return $query->whereRaw('1 = 0');
        }

        if (!$viaRelation) {
            return $query->whereIn($campusColumn, $campusIds);
        }

        return $query->whereHas($viaRelation, function ($q) use ($campusIds, $campusColumn) {
            $q->whereIn($campusColumn, $campusIds);
        });
    }

    /**
     * Scope via a nested relation that has campus_id.
     */
    protected function scopeQueryVia($query, $relation, $campusColumn = 'campus_id')
    {
        $user = auth()->user();

        if (!$user) return $query;

        if ($user->isSuperAdmin()) {
            return $query;
        }

        $campusIds = $user->accessible_campus_ids;

        if (empty($campusIds)) {
            return $query->whereRaw('1 = 0');
        }

        return $query->whereHas($relation, function ($q) use ($campusIds, $campusColumn) {
            $q->whereIn($campusColumn, $campusIds);
        });
    }

    /**
     * Scope via relation chain leading to `users` table.
     */
    protected function scopeQueryViaUser($query, $userRelation = 'user')
    {
        $user = auth()->user();

        if (!$user) return $query;

        if ($user->isSuperAdmin()) {
            return $query;
        }

        $campusIds = $user->accessible_campus_ids;

        if (empty($campusIds)) {
            return $query->whereRaw('1 = 0');
        }

        return $query->whereHas($userRelation, function ($q) use ($campusIds) {
            $q->whereIn('campus_id', $campusIds);
        });
    }

    /* ==================== RESPONSES ==================== */

    protected function successRedirect($route, $message = 'Operation successful')
    {
        return redirect()->route($route)->with('success', $message);
    }

    protected function errorRedirect($route, $message = 'Operation failed')
    {
        return redirect()->route($route)->with('error', $message);
    }

    protected function successResponse($data = null, $message = 'Success', $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function errorResponse($message = 'Error', $code = 400, $errors = null): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }
}