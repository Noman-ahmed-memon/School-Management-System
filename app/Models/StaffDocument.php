<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_id', 'name', 'file_path', 'type', 'uploaded_at'
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}