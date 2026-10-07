<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'vehicle_id', 'name', 'code',
        'description', 'start_time', 'end_time', 'status'
    ];


    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function routeStops()
    {
        return $this->hasMany(RouteStop::class)->orderBy('stop_order');
    }

    public function studentTransport()
    {
        return $this->hasMany(StudentTransport::class);
    }

    // Get first and last stops
    public function getFirstStopAttribute()
    {
        return $this->routeStops->first();
    }

    public function getLastStopAttribute()
    {
        return $this->routeStops->last();
    }
}