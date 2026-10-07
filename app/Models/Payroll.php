<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id',
        'teacher_id',
        'month',
        'year',
        'basic_salary',
        'allowances',
        'deductions',
        'bonuses',
        'total_earnings',
        'total_deductions',
        'net_salary',
        'status',
        'payment_date',
    ];

    protected $casts = [
        'month' => 'integer',
        'year' => 'integer',
        'basic_salary' => 'decimal:2',
        'allowances' => 'array',
        'deductions' => 'array',
        'bonuses' => 'array',
        'total_earnings' => 'decimal:2',
        'total_deductions' => 'decimal:2',
        'net_salary' => 'decimal:2',
        'payment_date' => 'date',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function payslips()
    {
        return $this->hasMany(Payslip::class);
    }

    // Helper
    public function getEmployeeNameAttribute()
    {
        return $this->teacher?->user?->name
            ?? $this->staff?->user?->name
            ?? 'Unknown';
    }

    public function getEmployeeTypeAttribute()
    {
        if ($this->teacher_id) return 'teacher';
        if ($this->staff_id) return 'staff';
        return null;
    }

    public function calculatePayroll()
    {
        $allowancesTotal = collect($this->allowances)->sum() ?? 0;
        $deductionsTotal = collect($this->deductions)->sum() ?? 0;
        $bonusesTotal = collect($this->bonuses)->sum() ?? 0;

        $this->total_earnings = $this->basic_salary + $allowancesTotal + $bonusesTotal;
        $this->total_deductions = $deductionsTotal;
        $this->net_salary = $this->total_earnings - $this->total_deductions;
        $this->save();
    }

    // Scopes
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }
}