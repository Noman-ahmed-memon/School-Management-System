<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'day_of_week', 'start_time', 'end_time'
    ];

    // NOTE: Do NOT cast start_time/end_time to datetime.
    // MySQL TIME columns return strings (HH:MM:SS) which is what we want.

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function timetableEntries()
    {
        return $this->hasMany(TimetableEntry::class);
    }

    public function getTimeRangeAttribute()
    {
        return $this->start_time . ' - ' . $this->end_time;
    }
}