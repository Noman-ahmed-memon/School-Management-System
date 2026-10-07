<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'date', 'type', 'description', 'is_annual'
    ];

    protected $casts = [
        'date' => 'date',
        'is_annual' => 'boolean',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    // Scopes
    public function scopePublic($query)
    {
        return $query->where('type', 'public');
    }

    public function scopeReligious($query)
    {
        return $query->where('type', 'religious');
    }

    public function scopeSchool($query)
    {
        return $query->where('type', 'school');
    }

    public function scopeYear($query, $year)
    {
        return $query->whereYear('date', $year);
    }
}