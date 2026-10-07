<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'name',
        'amount',
        'type',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Student this scholarship belongs to.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Scope: only active scholarships for the current date.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('start_date', '<=', now())
                     ->where('end_date', '>=', now());
    }

    /**
     * Get the active scholarship for a given student on a given date.
     * Returns null if none.
     */
    public static function getActiveForStudent($studentId, $date = null)
    {
        $date = $date ?: now();

        return self::where('student_id', $studentId)
            ->where('status', 'active')
            ->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date)
            ->orderByDesc('amount')  // if multiple, use largest
            ->first();
    }

    /**
     * Calculate the discount amount for a given subtotal.
     */
    public function calculateDiscount($subtotal)
    {
        $subtotal = (float) $subtotal;
        $amount = (float) $this->amount;

        if ($this->type === 'percentage') {
            return round(($subtotal * $amount) / 100, 2);
        }

        // Fixed: don't exceed subtotal
        return min($amount, $subtotal);
    }
}