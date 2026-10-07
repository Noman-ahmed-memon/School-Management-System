<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'first_name', 'last_name', 'email', 'phone',
        'address', 'occupation', 'relation'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function studentGuardians()
    {
        return $this->hasMany(StudentGuardian::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'student_guardians')
                    ->withPivot('is_primary_contact')
                    ->withTimestamps();
    }

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}