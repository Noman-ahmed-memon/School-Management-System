<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SuperAdminSeeder::class,
            RolePermissionSeeder::class,
            OrganizationSeeder::class,
            DepartmentSeeder::class,
            UserSeeder::class,
            AcademicSessionSeeder::class,
            StandardSeeder::class,
            StudentSeeder::class,
            FeeTypeSeeder::class,
            GradingSystemSeeder::class,
            ExamTypeSeeder::class,
            BookCategorySeeder::class,
            HolidaySeeder::class,
        ]);
    }
}