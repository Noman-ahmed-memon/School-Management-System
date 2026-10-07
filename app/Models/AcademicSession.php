<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'start_date', 'end_date', 'is_current', 'status'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function studentAcademicRecords()
    {
        return $this->hasMany(StudentAcademicRecord::class);
    }

    public function standardSubjects()
    {
        return $this->hasMany(StandardSubject::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    public function feeStructures()
    {
        return $this->hasMany(FeeStructure::class);
    }

    public function timetableEntries()
    {
        return $this->hasMany(TimetableEntry::class);
    }

    public function studentAttendances()
    {
        return $this->hasMany(StudentAttendance::class);
    }
}