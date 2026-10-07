<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamType extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'name', 'code', 'description'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}