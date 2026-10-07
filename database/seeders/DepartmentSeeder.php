<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::all();

        if ($campuses->isEmpty()) {
            $this->command->warn('⚠️  No campuses found. Skipping departments.');
            return;
        }

        $departments = Department::defaultDepartments();
        $created = 0;

        foreach ($campuses as $campus) {
            foreach ($departments as $dept) {
                Department::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $dept['code'],
                    ],
                    [
                        'name' => $dept['name'],
                        'description' => $dept['description'],
                        'status' => 'active',
                    ]
                );
                $created++;
            }
        }

        $this->command->info("Seeded {$created} departments across {$campuses->count()} campuses.");
    }
}