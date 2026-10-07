<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_item_id', 'transaction_type', 'quantity',
        'transaction_date', 'reference_number', 'note'
    ];

    protected $casts = [
        'quantity' => 'integer',
        'transaction_date' => 'date',
    ];

    public function inventoryItem()
    {
        return $this->belongsTo(InventoryItem::class);
    }
}