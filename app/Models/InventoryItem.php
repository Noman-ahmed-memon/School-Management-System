<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'category', 'quantity',
        'unit', 'purchase_price', 'selling_price', 'supplier', 'description'
    ];

    protected $casts = [
        'quantity' => 'integer',
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function inventoryTransactions()
    {
        return $this->hasMany(InventoryTransaction::class);
    }

    // Update stock
    public function updateStock($quantity, $type)
    {
        if ($type === 'stock_in' || $type === 'purchase') {
            $this->quantity += $quantity;
        } elseif ($type === 'stock_out') {
            $this->quantity -= $quantity;
        }
        $this->save();
    }
}