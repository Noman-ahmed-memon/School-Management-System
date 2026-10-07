<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeStructure extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'standard_id', 'fee_type_id', 'academic_session_id',
        'amount', 'is_optional'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'is_optional' => 'boolean',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class);
    }

    public function feeType()
    {
        return $this->belongsTo(FeeType::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }
}