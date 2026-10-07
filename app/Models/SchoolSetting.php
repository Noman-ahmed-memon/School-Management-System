<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id', 'setting_key', 'setting_value', 'setting_type'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    // Helper to get setting value with proper type
    public function getValueAttribute()
    {
        switch ($this->setting_type) {
            case 'boolean':
                return filter_var($this->setting_value, FILTER_VALIDATE_BOOLEAN);
            case 'integer':
                return (int) $this->setting_value;
            case 'json':
                return json_decode($this->setting_value, true);
            default:
                return $this->setting_value;
        }
    }

    // Static helper to get setting
    public static function get($key, $campusId, $default = null)
    {
        $setting = self::where('campus_id', $campusId)
                       ->where('setting_key', $key)
                       ->first();
        return $setting ? $setting->value : $default;
    }
}