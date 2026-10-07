<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'height', 'weight', 'blood_pressure',
        'allergies', 'medical_conditions', 'medications',
        'emergency_contact_name', 'emergency_contact_phone'
    ];

    protected $casts = [
        'height' => 'float',
        'weight' => 'float',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}