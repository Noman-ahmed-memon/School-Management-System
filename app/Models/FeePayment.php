<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'fee_invoice_id', 'student_id', 'payment_number', 'amount',
        'payment_date', 'payment_method', 'transaction_id',
        'bank_name', 'cheque_number', 'receipt_number', 'status'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date',
    ];

    public function feeInvoice()
    {
        return $this->belongsTo(FeeInvoice::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Generate payment number
    public static function generatePaymentNumber()
    {
        $last = self::latest('id')->first();
        $number = $last ? intval(substr($last->payment_number, -5)) + 1 : 1;
        return 'PAY-' . date('Y') . '-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    // Generate receipt number
    public static function generateReceiptNumber()
    {
        $last = self::latest('id')->first();
        $number = $last ? intval(substr($last->receipt_number, -5)) + 1 : 1;
        return 'RCP-' . date('Y') . '-' . str_pad($number, 5, '0', STR_PAD_LEFT);
    }

    // Scopes
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}