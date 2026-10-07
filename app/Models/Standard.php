<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standard extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'order', 'description', 'status'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function standardSubjects()
    {
        return $this->hasMany(StandardSubject::class);
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

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

    public function feeStructures()
    {
        return $this->hasMany(FeeStructure::class);
    }
}