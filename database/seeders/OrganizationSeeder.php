<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\School;
use App\Models\Campus;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        // ============================================
        // 1. ORGANIZATION
        // ============================================
        $org = Organization::firstOrCreate(
            ['code' => 'DEG'],
            [
                'name' => 'Demo Education Group',
                'email' => 'info@demogroup.com',
                'phone' => '+92 300 1234567',
                'address' => 'Lahore, Pakistan',
                'website' => 'https://demogroup.com',
                'status' => 'active',
            ]
        );

        // ============================================
        // 2. SCHOOLS (2 schools)
        // ============================================
        $schools = [
            [
                'name' => 'Beaconhouse School',
                'code' => 'BHS',
                'email' => 'info@beaconhouse.com',
                'phone' => '+92 42 111 111 111',
                'address' => 'Johar Town, Lahore',
                'website' => 'https://beaconhouse.com',
                'established_year' => 2005,
            ],
            [
                'name' => 'Grammar School',
                'code' => 'GS',
                'email' => 'info@grammar.com',
                'phone' => '+92 42 222 222 222',
                'address' => 'DHA Phase 5, Lahore',
                'website' => 'https://grammar.com',
                'established_year' => 2010,
            ],
        ];

        foreach ($schools as $schoolData) {
            $school = School::firstOrCreate(
                ['code' => $schoolData['code']],
                array_merge($schoolData, [
                    'organization_id' => $org->id,
                    'status' => 'active',
                ])
            );

            // ============================================
            // 3. PRINCIPAL (one per school)
            // ============================================
            $principalEmail = strtolower($school->code) . '.principal@school.com';
            $principal = User::firstOrCreate(
                ['email' => $principalEmail],
                [
                    'name' => $school->name . ' Principal',
                    'password' => bcrypt('password123'),
                    'role' => 'principal',
                    'school_id' => $school->id,
                    'campus_id' => null,
                    'phone' => '+92 300 1111111',
                    'status' => 'active',
                ]
            );
            // Ensure role assignment
            $principal->syncRoles(['principal']);

            // ============================================
            // 4. CAMPUSES (2 per school)
            // ============================================
            $campuses = [
                ['name' => $school->name . ' — Main Campus', 'code' => $school->code . '-MAIN'],
                ['name' => $school->name . ' — North Campus', 'code' => $school->code . '-NORTH'],
            ];

            foreach ($campuses as $campusData) {
                $campus = Campus::firstOrCreate(
                    ['code' => $campusData['code']],
                    [
                        'school_id' => $school->id,
                        'name' => $campusData['name'],
                        'address' => $school->address,
                        'phone' => $school->phone,
                        'status' => 'active',
                    ]
                );

                // ============================================
                // 5. VICE PRINCIPAL (one per campus)
                // ============================================
                $vpEmail = strtolower($campus->code) . '.vp@school.com';
                $vp = User::firstOrCreate(
                    ['email' => $vpEmail],
                    [
                        'name' => $campus->name . ' VP',
                        'password' => bcrypt('password123'),
                        'role' => 'vice_principal',
                        'school_id' => $school->id,
                        'campus_id' => $campus->id,
                        'phone' => '+92 300 2222222',
                        'status' => 'active',
                    ]
                );
                $vp->syncRoles(['vice_principal']);

                // Link VP to campus
                $campus->update(['vice_principal_id' => $vp->id]);
            }
        }

        $this->command->info('Organization, schools, campuses, principals, VPs seeded.');
    }
}