<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LibraryTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id', 'student_id', 'issued_by', 'issue_date',
        'due_date', 'return_date', 'status', 'fine_amount', 'remark'
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'return_date' => 'date',
        'fine_amount' => 'decimal:2',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function issuedBy()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    // Calculate fine
    public function calculateFine()
    {
        if ($this->return_date && $this->return_date > $this->due_date) {
            $days = $this->return_date->diffInDays($this->due_date);
            $this->fine_amount = $days * 10; // $10 per day late
            $this->save();
        }
        return $this->fine_amount;
    }

    // Scopes
    public function scopeIssued($query)
    {
        return $query->where('status', 'issued');
    }

    public function scopeReturned($query)
    {
        return $query->where('status', 'returned');
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'issued')
                     ->where('due_date', '<', now());
    }
}