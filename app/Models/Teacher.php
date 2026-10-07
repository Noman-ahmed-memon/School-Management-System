<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_id',
        'qualification',
        'experience_years',
        'salary',
        'employment_type',
        'specialization',
        'joining_date',
        'status',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'joining_date' => 'date',
        'experience_years' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function standardSubjects()
    {
        return $this->hasMany(StandardSubject::class);
    }

    public function timetableEntries()
    {
        return $this->hasMany(TimetableEntry::class);
    }

    public function teacherAttendances()
    {
        return $this->hasMany(TeacherAttendance::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }
}