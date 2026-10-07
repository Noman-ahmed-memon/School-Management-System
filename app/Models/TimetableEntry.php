<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimetableEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'standard_id', 'section_id', 'subject_id', 'teacher_id',
        'time_slot_id', 'room_number', 'academic_session_id'
    ];

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}