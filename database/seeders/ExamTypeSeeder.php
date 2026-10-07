<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\ExamType;
use Illuminate\Database\Seeder;

class ExamTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Monthly Test', 'code' => 'MON'],
            ['name' => 'Midterm', 'code' => 'MID'],
            ['name' => 'Final Term', 'code' => 'FIN'],
            ['name' => 'Quiz', 'code' => 'QZ'],
        ];

        foreach (Campus::all() as $campus) {
            foreach ($types as $t) {
                ExamType::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $campus->code . '-' . $t['code'],
                    ],
                    [
                        'name' => $t['name'],
                        'description' => $t['name'] . ' for ' . $campus->name,
                    ]
                );
            }
        }

        $this->command->info('✅ Exam types seeded.');
    }
}