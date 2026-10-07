<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\Guardian;
use App\Models\Section;
use App\Models\Standard;
use App\Models\Student;
use App\Models\StudentAcademicRecord;
use App\Models\StudentGuardian;
use App\Models\User;
use App\Models\AcademicSession;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::all();

        $maleNames = ['Ali', 'Rehan', 'Hamza', 'Bilal', 'Ahmed'];
        $femaleNames = ['Aisha', 'Fatima', 'Zainab', 'Maryam', 'Hira'];
        $lastNames = ['Khan', 'Ali', 'Ahmed', 'Raza', 'Shah'];

        foreach ($campuses as $campus) {
            $code = strtolower($campus->code);
            $session = AcademicSession::where('campus_id', $campus->id)
                ->where('is_current', true)->first();
            if (!$session) continue;

            for ($i = 1; $i <= 10; $i++) {
                $isMale = $i % 2 === 0;
                $firstName = $isMale
                    ? $maleNames[array_rand($maleNames)]
                    : $femaleNames[array_rand($femaleNames)];
                $lastName = $lastNames[array_rand($lastNames)];

                $standards = Standard::where('campus_id', $campus->id)->get();
                if ($standards->isEmpty()) continue;
                $standard = $standards->random();
                $section = Section::where('standard_id', $standard->id)->first();

                // STUDENT USER
                $sUser = User::firstOrCreate(
                    ['email' => "{$code}.student{$i}@school.com"],
                    [
                        'name' => "{$firstName} {$lastName}",
                        'password' => bcrypt('password123'),
                        'role' => 'student',
                        'school_id' => $campus->school_id,
                        'campus_id' => $campus->id,
                        'gender' => $isMale ? 'male' : 'female',
                        'status' => 'active',
                    ]
                );
                $sUser->syncRoles(['student']);

                // STUDENT RECORD
                $student = Student::firstOrCreate(
                    ['user_id' => $sUser->id],
                    [
                        'campus_id' => $campus->id,
                        'admission_number' => strtoupper($campus->code) . '-ADM-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                        'roll_number' => (string) $i,
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'date_of_birth' => now()->subYears(rand(5, 12)),
                        'gender' => $isMale ? 'male' : 'female',
                        'blood_group' => 'O+',
                        'nationality' => 'Pakistani',
                        'religion' => 'Islam',
                        'address' => $campus->address,
                        'phone' => '+92 300 ' . rand(1000000, 9999999),
                        'email' => $sUser->email,
                        'admission_date' => now()->subYear(),
                        'status' => 'enrolled',
                        'is_active' => true,
                    ]
                );

                // ACADEMIC RECORD
                if ($standard && $section) {
                    StudentAcademicRecord::firstOrCreate(
                        [
                            'student_id' => $student->id,
                            'academic_session_id' => $session->id,
                        ],
                        [
                            'standard_id' => $standard->id,
                            'section_id' => $section->id,
                            'enrollment_date' => now()->subYear(),
                            'status' => 'enrolled',
                        ]
                    );
                }

                // GUARDIAN USER
                $gUser = User::firstOrCreate(
                    ['email' => "{$code}.guardian{$i}@school.com"],
                    [
                        'name' => "Parent of {$firstName}",
                        'password' => bcrypt('password123'),
                        'role' => 'guardian',
                        'school_id' => $campus->school_id,
                        'campus_id' => $campus->id,
                        'status' => 'active',
                    ]
                );
                $gUser->syncRoles(['guardian']);

                // GUARDIAN RECORD
                $guardian = Guardian::firstOrCreate(
                    ['user_id' => $gUser->id],
                    [
                        'first_name' => 'Parent',
                        'last_name' => $lastName,
                        'email' => $gUser->email,
                        'phone' => '+92 300 ' . rand(1000000, 9999999),
                        'occupation' => 'Business',
                        'relation' => 'father',
                    ]
                );

                // LINK
                StudentGuardian::firstOrCreate(
                    [
                        'student_id' => $student->id,
                        'guardian_id' => $guardian->id,
                    ],
                    ['is_primary_contact' => true]
                );
            }
        }

        $this->command->info('✅ Students and guardians seeded.');
    }
}