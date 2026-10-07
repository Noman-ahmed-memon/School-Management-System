<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'asset_code', 'category', 'model',
        'serial_number', 'purchase_date', 'purchase_price',
        'warranty_expiry', 'location', 'assigned_to',
        'condition', 'status'
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'warranty_expiry' => 'date',
        'purchase_price' => 'decimal:2',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function assetMaintenance()
    {
        return $this->hasMany(AssetMaintenance::class);
    }

    // Check warranty status
    public function isUnderWarranty()
    {
        return $this->warranty_expiry && $this->warranty_expiry >= now();
    }
}