<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\Standard;
use App\Models\Section;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class StandardSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::all();

        $standardList = [
            ['name' => 'Playgroup', 'code' => 'PG', 'order' => 1],
            ['name' => 'Nursery', 'code' => 'NUR', 'order' => 2],
            ['name' => 'KG', 'code' => 'KG', 'order' => 3],
            ['name' => 'Grade 1', 'code' => 'G1', 'order' => 4],
            ['name' => 'Grade 2', 'code' => 'G2', 'order' => 5],
        ];

        $subjectList = [
            ['name' => 'Mathematics', 'code' => 'MATH', 'type' => 'theory'],
            ['name' => 'English', 'code' => 'ENG', 'type' => 'theory'],
            ['name' => 'Science', 'code' => 'SCI', 'type' => 'theory'],
            ['name' => 'Urdu', 'code' => 'URD', 'type' => 'theory'],
            ['name' => 'Computer', 'code' => 'COMP', 'type' => 'theory'],
        ];

        foreach ($campuses as $campus) {
            $campusCode = $campus->code;

            // STANDARDS + SECTIONS
            foreach ($standardList as $stdData) {
                $standard = Standard::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $campusCode . '-' . $stdData['code'],
                    ],
                    [
                        'name' => $stdData['name'],
                        'order' => $stdData['order'],
                        'description' => $stdData['name'] . ' at ' . $campus->name,
                        'status' => 'active',
                    ]
                );

                foreach (['A', 'B'] as $sectionName) {
                    Section::firstOrCreate(
                        [
                            'standard_id' => $standard->id,
                            'name' => 'Section ' . $sectionName,
                        ],
                        [
                            'code' => $campusCode . '-' . $stdData['code'] . '-' . $sectionName,
                            'capacity' => 30,
                            'status' => 'active',
                        ]
                    );
                }
            }

            // SUBJECTS
            foreach ($subjectList as $subjData) {
                Subject::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $campusCode . '-' . $subjData['code'],
                    ],
                    [
                        'name' => $subjData['name'],
                        'type' => $subjData['type'],
                        'is_compulsory' => true,
                        'credit_hours' => 3,
                        'status' => 'active',
                    ]
                );
            }
        }

        $this->command->info('✅ Standards, sections, subjects seeded.');
    }
}