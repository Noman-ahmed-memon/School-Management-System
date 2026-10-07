<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'registration_number', 'model', 'capacity',
        'driver_name', 'driver_phone', 'driver_license',
        'insurance_details', 'maintenance_date', 'status'
    ];

    protected $casts = [
        'capacity' => 'integer',
        'maintenance_date' => 'date',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function routes()
    {
        return $this->hasMany(Route::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeMaintenance($query)
    {
        return $query->where('status', 'maintenance');
    }
}