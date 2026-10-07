<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id',
        'teacher_id',
        'leave_type_id',
        'start_date',
        'end_date',
        'days',
        'reason',
        'status',
        'approved_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'days' => 'integer',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Accessors
    public function getEmployeeNameAttribute()
    {
        return $this->teacher?->user?->name
            ?? $this->staff?->user?->name
            ?? 'Unknown';
    }

    public function getEmployeeIdCodeAttribute()
    {
        return $this->teacher?->employee_id
            ?? $this->staff?->employee_id
            ?? '—';
    }

    public function getEmployeeTypeAttribute()
    {
        if ($this->teacher_id) return 'teacher';
        if ($this->staff_id) return 'staff';
        return null;
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}