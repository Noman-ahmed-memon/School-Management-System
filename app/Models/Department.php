<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id',
        'name',
        'code',
        'description',
        'head_name',
        'status',
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }

    /**
     * Predefined department templates.
     * Used during campus creation and by seeders.
     */
    public static function defaultDepartments(): array
    {
        return [
            [
                'name' => 'Administration',
                'code' => 'ADMIN',
                'description' => 'Administrative and management staff',
                'role_mapping' => 'staff',
            ],
            [
                'name' => 'Finance',
                'code' => 'FIN',
                'description' => 'Accounts and finance department',
                'role_mapping' => 'accountant',
            ],
            [
                'name' => 'Library',
                'code' => 'LIB',
                'description' => 'Library and information services',
                'role_mapping' => 'librarian',
            ],
            [
                'name' => 'Transport',
                'code' => 'TRAN',
                'description' => 'Transport and fleet management',
                'role_mapping' => 'transport_manager',
            ],
            [
                'name' => 'Reception',
                'code' => 'RECP',
                'description' => 'Front desk and student reception',
                'role_mapping' => 'receptionist',
            ],
            [
                'name' => 'Support',
                'code' => 'SUPP',
                'description' => 'Support staff and services',
                'role_mapping' => 'staff',
            ],
        ];
    }

    /**
     * Get the role name associated with this department.
     * Used to auto-assign user role when a staff member is created.
     */
    public function getRoleMappingAttribute(): string
    {
        $map = [
            'ADMIN' => 'staff',
            'FIN' => 'accountant',
            'LIB' => 'librarian',
            'TRAN' => 'transport_manager',
            'RECP' => 'receptionist',
            'SUPP' => 'staff',
        ];

        return $map[$this->code] ?? 'staff';
    }
}