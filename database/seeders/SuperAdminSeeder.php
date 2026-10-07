<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'superadmin@school.com'],
            [
                'name' => 'Super Admin',
                'password' => bcrypt('password123'),
                'role' => 'super_admin',
                'school_id' => null,
                'campus_id' => null,
                'status' => 'active',
            ]
        );
        $user->syncRoles(['super_admin']);

        $this->command->info('Super Admin created: superadmin@school.com / password123');
    }
}