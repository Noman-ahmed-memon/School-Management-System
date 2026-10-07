<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'category_id', 'title', 'isbn', 'author',
        'publisher', 'edition', 'year', 'total_copies',
        'available_copies', 'shelf_location', 'rack_number', 'status'
    ];

    protected $casts = [
        'year' => 'integer',
        'total_copies' => 'integer',
        'available_copies' => 'integer',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function category()
    {
        return $this->belongsTo(BookCategory::class, 'category_id');
    }

    public function libraryTransactions()
    {
        return $this->hasMany(LibraryTransaction::class);
    }

    // Check if book is available
    public function isAvailable()
    {
        return $this->available_copies > 0 && $this->status === 'available';
    }

    // Decrease available copies when issued
    public function issueBook()
    {
        if ($this->isAvailable()) {
            $this->available_copies--;
            if ($this->available_copies === 0) {
                $this->status = 'issued';
            }
            $this->save();
            return true;
        }
        return false;
    }

    // Increase available copies when returned
    public function returnBook()
    {
        $this->available_copies++;
        if ($this->available_copies > 0) {
            $this->status = 'available';
        }
        $this->save();
    }
}