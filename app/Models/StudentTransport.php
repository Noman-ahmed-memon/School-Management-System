<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentTransport extends Model
{
    use HasFactory;

    protected $table = 'student_transport';

    protected $fillable = [
        'student_id', 'route_id', 'pickup_stop_id', 'dropoff_stop_id',
        'academic_session_id', 'start_date', 'end_date', 'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }

    public function pickupStop()
    {
        return $this->belongsTo(RouteStop::class, 'pickup_stop_id');
    }

    public function dropoffStop()
    {
        return $this->belongsTo(RouteStop::class, 'dropoff_stop_id');
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('start_date', '<=', now())
                     ->where(function($q) {
                         $q->whereNull('end_date')
                           ->orWhere('end_date', '>=', now());
                     });
    }
}