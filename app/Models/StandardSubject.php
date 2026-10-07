<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StandardSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'standard_id', 'subject_id', 'teacher_id', 'academic_session_id', 'is_compulsory'
    ];

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}