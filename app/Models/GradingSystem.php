<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradingSystem extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'grade', 'min_percentage',
        'max_percentage', 'points', 'description'
    ];

    protected $casts = [
        'min_percentage' => 'float',
        'max_percentage' => 'float',
        'points' => 'float',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    // Helper method to find grade by percentage
    public static function getGrade($percentage, $campusId)
    {
        return self::where('campus_id', $campusId)
                   ->where('min_percentage', '<=', $percentage)
                   ->where('max_percentage', '>=', $percentage)
                   ->first();
    }
}