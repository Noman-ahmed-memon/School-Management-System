<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\GradingSystem;
use Illuminate\Database\Seeder;

class GradingSystemSeeder extends Seeder
{
    public function run(): void
    {
        $grades = [
            ['grade' => 'A+', 'name' => 'Outstanding', 'min' => 90, 'max' => 100, 'points' => 4.0],
            ['grade' => 'A', 'name' => 'Excellent', 'min' => 80, 'max' => 89.99, 'points' => 3.7],
            ['grade' => 'B+', 'name' => 'Very Good', 'min' => 70, 'max' => 79.99, 'points' => 3.3],
            ['grade' => 'B', 'name' => 'Good', 'min' => 60, 'max' => 69.99, 'points' => 3.0],
            ['grade' => 'C', 'name' => 'Average', 'min' => 50, 'max' => 59.99, 'points' => 2.0],
            ['grade' => 'D', 'name' => 'Below Average', 'min' => 40, 'max' => 49.99, 'points' => 1.0],
            ['grade' => 'F', 'name' => 'Fail', 'min' => 0, 'max' => 39.99, 'points' => 0.0],
        ];

        foreach (Campus::all() as $campus) {
            foreach ($grades as $g) {
                GradingSystem::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'grade' => $g['grade'],
                    ],
                    [
                        'name' => $g['name'],
                        'min_percentage' => $g['min'],
                        'max_percentage' => $g['max'],
                        'points' => $g['points'],
                        'description' => $g['name'] . ' grade',
                    ]
                );
            }
        }

        $this->command->info('✅ Grading systems seeded.');
    }
}