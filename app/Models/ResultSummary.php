<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultSummary extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'exam_id', 'total_marks_obtained', 'total_marks',
        'percentage', 'grade', 'gpa', 'position', 'is_passed', 'remark'
    ];

    protected $casts = [
        'total_marks_obtained' => 'float',
        'total_marks' => 'float',
        'percentage' => 'float',
        'gpa' => 'float',
        'position' => 'integer',
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

    // Calculate summary from individual results
    public static function calculateSummary($studentId, $examId)
    {
        $results = Result::where('student_id', $studentId)
                        ->where('exam_id', $examId)
                        ->get();

        $totalMarks = $results->sum('total_marks');
        $totalObtained = $results->sum('marks_obtained');
        $percentage = $totalMarks > 0 ? ($totalObtained / $totalMarks) * 100 : 0;
        $isPassed = $results->every('is_passed', true);

        // Get grade from grading system
        $student = Student::find($studentId);
        $grading = GradingSystem::getGrade($percentage, $student->campus_id);

        return self::create([
            'student_id' => $studentId,
            'exam_id' => $examId,
            'total_marks_obtained' => $totalObtained,
            'total_marks' => $totalMarks,
            'percentage' => $percentage,
            'grade' => $grading ? $grading->grade : null,
            'gpa' => $grading ? $grading->points : null,
            'is_passed' => $isPassed,
        ]);
    }
}