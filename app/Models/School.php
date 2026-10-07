<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'name',
        'code',
        'email',
        'phone',
        'address',
        'logo',
        'website',
        'established_year',
        'status',
    ];

    protected $casts = [
        'established_year' => 'integer',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function campuses()
    {
        return $this->hasMany(Campus::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the principal user of this school.
     * A principal is a user with role='principal' and school_id = this school.
     */
    public function principal()
    {
        return $this->hasOne(User::class)
            ->whereHas('roles', fn($q) => $q->where('name', 'principal'));
    }

    /**
     * Get the principal as a proper relation loaded with the query.
     */
    public function getPrincipalUserAttribute()
    {
        return User::role('principal')
            ->where('school_id', $this->id)
            ->first();
    }
}