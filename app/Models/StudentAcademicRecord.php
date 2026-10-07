<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentAcademicRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'standard_id', 'section_id', 'academic_session_id',
        'enrollment_date', 'promotion_date', 'status'
    ];

    protected $casts = [
        'enrollment_date' => 'date',
        'promotion_date' => 'date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}