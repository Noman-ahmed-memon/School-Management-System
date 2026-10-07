<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'type', 'is_compulsory',
        'credit_hours', 'description', 'status'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function standardSubjects()
    {
        return $this->hasMany(StandardSubject::class);
    }

    public function timetableEntries()
    {
        return $this->hasMany(TimetableEntry::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function examSchedules()
    {
        return $this->hasMany(ExamSchedule::class);
    }
}
