<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'description'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function books()
    {
        return $this->hasMany(Book::class, 'category_id');
    }
}