<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\AcademicSession;
use Illuminate\Database\Seeder;

class AcademicSessionSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::all();

        foreach ($campuses as $campus) {
            AcademicSession::firstOrCreate(
                [
                    'campus_id' => $campus->id,
                    'name' => '2025-2026',
                ],
                [
                    'start_date' => '2025-04-01',
                    'end_date' => '2026-03-31',
                    'is_current' => true,
                    'status' => 'active',
                ]
            );
        }

        $this->command->info('✅ Academic sessions seeded.');
    }
}