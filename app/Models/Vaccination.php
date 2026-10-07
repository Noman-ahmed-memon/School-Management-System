<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'vaccine_name', 'dose_number',
        'date_administered', 'next_dose_date', 'administered_by'
    ];

    protected $casts = [
        'date_administered' => 'date',
        'next_dose_date' => 'date',
        'dose_number' => 'integer',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Check if next dose is due
    public function isNextDoseDue()
    {
        return $this->next_dose_date && $this->next_dose_date <= now();
    }
}