<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeType extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'description', 'is_recurring'
    ];

    protected $casts = [
        'is_recurring' => 'boolean',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function feeStructures()
    {
        return $this->hasMany(FeeStructure::class);
    }

    public function feeInvoiceItems()
    {
        return $this->hasMany(FeeInvoiceItem::class);
    }
}