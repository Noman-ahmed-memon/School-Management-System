<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteStop extends Model
{
    use HasFactory;

    protected $fillable = [
        'route_id', 'stop_name', 'latitude', 'longitude',
        'stop_order', 'arrival_time'
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'stop_order' => 'integer',
        'arrival_time' => 'datetime',
    ];

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function pickupStudents()
    {
        return $this->hasMany(StudentTransport::class, 'pickup_stop_id');
    }

    public function dropoffStudents()
    {
        return $this->hasMany(StudentTransport::class, 'dropoff_stop_id');
    }
}