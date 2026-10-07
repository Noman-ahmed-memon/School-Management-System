<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'employee_id', 'department_id', 'designation',
        'salary', 'employment_type', 'joining_date', 'termination_date', 'status'
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'joining_date' => 'date',
        'termination_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function staffDocuments()
    {
        return $this->hasMany(StaffDocument::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function payslips()
    {
        return $this->hasMany(Payslip::class);
    }
}