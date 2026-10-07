<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use App\Traits\HasPermissions;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasPermissions;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'school_id',
        'campus_id',
        'phone',
        'address',
        'profile_picture',
        'gender',
        'date_of_birth',
        'status',
        'last_login_at',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
        'last_login_at' => 'datetime',
    ];

    /* ==================== RELATIONS ==================== */

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function teacher()
    {
        return $this->hasOne(Teacher::class);
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class);
    }

    public function staff()
    {
        return $this->hasOne(Staff::class);
    }

    /* ==================== ACCESSORS ==================== */

    public function getRoleNameAttribute()
    {
        $roles = [
            'super_admin' => 'Super Admin',
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
            'staff' => 'Staff',
        ];

        return $roles[$this->role] ?? $this->role;
    }

    public function getIsActiveAttribute()
    {
        return $this->status === 'active';
    }

    /* ==================== SCOPING HELPERS ==================== */

    /**
     * Check if user is super admin.
     * Checks both the 'role' column AND Spatie roles for robustness.
     */
    public function isSuperAdmin(): bool
    {
        if ($this->role === 'super_admin') {
            return true;
        }

        return $this->hasRole('super_admin');
    }

    /**
     * Check if user is school-level (Principal).
     * School-level users see all campuses of their school.
     */
    public function isSchoolLevel(): bool
    {
        if ($this->role === 'principal') {
            return true;
        }

        return $this->hasRole('principal');
    }

    /**
     * Check if user is campus-level.
     * Campus-level users see only their assigned campus.
     */
    public function isCampusLevel(): bool
    {
        if ($this->isSuperAdmin() || $this->isSchoolLevel()) {
            return false;
        }

        return $this->campus_id !== null;
    }

    /**
     * Get the campus IDs this user can access.
     */
    public function getAccessibleCampusIdsAttribute(): array
    {
        // Super admin sees all
        if ($this->isSuperAdmin()) {
            return Campus::pluck('id')->toArray();
        }

        // Principal: all campuses of their school
        if ($this->isSchoolLevel() && $this->school_id) {
            return Campus::where('school_id', $this->school_id)->pluck('id')->toArray();
        }

        // Others: just their campus
        return $this->campus_id ? [$this->campus_id] : [];
    }
}