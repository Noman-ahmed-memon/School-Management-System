<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'code', 'email', 'phone', 'address', 'logo', 'website', 'status'
    ];

    public function schools()
    {
        return $this->hasMany(School::class);
    }
}