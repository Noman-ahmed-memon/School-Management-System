<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'academic_session_id', 'invoice_number',
        'issue_date', 'due_date', 'total_amount', 'discount_amount',
        'discount_type', 'discount_reason', 'late_fee_amount',
        'net_amount', 'paid_amount', 'outstanding_amount', 'status'
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'total_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'late_fee_amount' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }

    public function feeInvoiceItems()
    {
        return $this->hasMany(FeeInvoiceItem::class);
    }

    public function feePayments()
    {
        return $this->hasMany(FeePayment::class);
    }

    // Calculate totals
    public function calculateTotals()
    {
        $this->total_amount = $this->feeInvoiceItems->sum('amount');
        
        $discount = 0;
        if ($this->discount_type === 'percentage') {
            $discount = ($this->discount_amount / 100) * $this->total_amount;
        } else {
            $discount = $this->discount_amount;
        }
        
        $this->net_amount = $this->total_amount - $discount + $this->late_fee_amount;
        $this->outstanding_amount = $this->net_amount - $this->paid_amount;
        $this->save();
    }

    // Generate invoice number
    public static function generateInvoiceNumber()
    {
        $last = self::latest('id')->first();
        $number = $last ? intval(substr($last->invoice_number, -5)) + 1 : 1;
        return 'INV-' . date('Y') . '-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    // Scopes
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    public function scopeUnpaid($query)
    {
        return $query->where('status', 'issued');
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue');
    }

    public function scopePartialPaid($query)
    {
        return $query->where('status', 'partial_paid');
    }
}