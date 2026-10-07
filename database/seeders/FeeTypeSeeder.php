<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\FeeType;
use App\Models\FeeStructure;
use App\Models\Standard;
use App\Models\AcademicSession;
use Illuminate\Database\Seeder;

class FeeTypeSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::all();

        $feeTypes = [
            ['name' => 'Tuition Fee', 'code' => 'TUIT', 'is_recurring' => true, 'amount' => 15000],
            ['name' => 'Transport Fee', 'code' => 'TRAN', 'is_recurring' => true, 'amount' => 3000],
            ['name' => 'Exam Fee', 'code' => 'EXAM', 'is_recurring' => false, 'amount' => 1500],
            ['name' => 'Library Fee', 'code' => 'LIB', 'is_recurring' => false, 'amount' => 500],
        ];

        foreach ($campuses as $campus) {
            $session = AcademicSession::where('campus_id', $campus->id)
                ->where('is_current', true)->first();
            if (!$session) continue;

            foreach ($feeTypes as $ft) {
                $feeType = FeeType::firstOrCreate(
                    [
                        'campus_id' => $campus->id,
                        'code' => $ft['code'],
                    ],
                    [
                        'name' => $ft['name'],
                        'description' => $ft['name'] . ' for ' . $campus->name,
                        'is_recurring' => $ft['is_recurring'],
                    ]
                );

                $standards = Standard::where('campus_id', $campus->id)->get();
                foreach ($standards as $standard) {
                    FeeStructure::firstOrCreate(
                        [
                            'campus_id' => $campus->id,
                            'standard_id' => $standard->id,
                            'fee_type_id' => $feeType->id,
                            'academic_session_id' => $session->id,
                        ],
                        [
                            'amount' => $ft['amount'],
                            'is_optional' => in_array($ft['code'], ['TRAN', 'LIB']),
                        ]
                    );
                }
            }
        }

        $this->command->info('✅ Fee types and structures seeded.');
    }
}