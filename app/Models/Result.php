<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'exam_id', 'subject_id', 'marks_obtained',
        'total_marks', 'percentage', 'grade', 'grade_points', 'is_passed'
    ];

    protected $casts = [
        'marks_obtained' => 'float',
        'total_marks' => 'float',
        'percentage' => 'float',
        'grade_points' => 'float',
        'is_passed' => 'boolean',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    // Calculate grade based on grading system
    public function calculateGrade($campusId)
    {
        $grading = GradingSystem::getGrade($this->percentage, $campusId);
        if ($grading) {
            $this->grade = $grading->grade;
            $this->grade_points = $grading->points;
            $this->save();
        }
        return $this;
    }
}