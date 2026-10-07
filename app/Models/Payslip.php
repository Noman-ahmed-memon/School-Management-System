<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payslip extends Model
{
    use HasFactory;

    protected $fillable = [
        'payroll_id',
        'staff_id',
        'teacher_id',
        'payslip_number',
        'pdf_path',
        'generated_at',
    ];

    protected $casts = [
        'generated_at' => 'datetime',
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public static function generatePayslipNumber()
    {
        $last = self::latest('id')->first();
        $number = $last ? intval(substr($last->payslip_number, -5)) + 1 : 1;
        return 'PSL-' . date('Y') . '-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }
}