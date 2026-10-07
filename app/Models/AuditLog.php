<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'action', 'module', 'description',
        'ip_address', 'user_agent'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Log activity
    public static function log($userId, $action, $module, $description = null)
    {
        return self::create([
            'user_id' => $userId,
            'action' => $action,
            'module' => $module,
            'description' => $description,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    // Scopes
    public function scopeModule($query, $module)
    {
        return $query->where('module', $module);
    }

    public function scopeAction($query, $action)
    {
        return $query->where('action', $action);
    }

    public function scopeUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeDateRange($query, $start, $end)
    {
        return $query->whereBetween('created_at', [$start, $end]);
    }
}