<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthCheckup extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'checkup_date', 'nurse_name', 'symptoms',
        'diagnosis', 'treatment', 'follow_up_date'
    ];

    protected $casts = [
        'checkup_date' => 'date',
        'follow_up_date' => 'date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}