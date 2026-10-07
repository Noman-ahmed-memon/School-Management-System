<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'standard_id', 'name', 'code', 'capacity', 'status'
    ];

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function studentAcademicRecords()
    {
        return $this->hasMany(StudentAcademicRecord::class);
    }

    public function studentAttendances()
    {
        return $this->hasMany(StudentAttendance::class);
    }

    public function timetableEntries()
    {
        return $this->hasMany(TimetableEntry::class);
    }
}