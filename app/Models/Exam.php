<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_type_id', 'academic_session_id', 'standard_id',
        'name', 'start_date', 'end_date', 'total_marks',
        'passing_marks', 'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function examType()
    {
        return $this->belongsTo(ExamType::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function examSchedules()
    {
        return $this->hasMany(ExamSchedule::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function resultSummaries()
    {
        return $this->hasMany(ResultSummary::class);
    }

    // Scopes
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}