<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id',
        'name',
        'code',
        'address',
        'phone',
        'vice_principal_id',
        'status',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function academicSessions()
    {
        return $this->hasMany(AcademicSession::class);
    }

    public function standards()
    {
        return $this->hasMany(Standard::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }

    /**
     * Relation: assigned vice principal user.
     */
    public function vicePrincipal()
    {
        return $this->belongsTo(User::class, 'vice_principal_id');
    }

    /**
     * Helper: get the VP user (by role + campus_id lookup).
     */
    public function getVicePrincipalUserAttribute()
    {
        if ($this->vice_principal_id) {
            return User::find($this->vice_principal_id);
        }

        return User::role('vice_principal')
            ->where('campus_id', $this->id)
            ->first();
    }
}