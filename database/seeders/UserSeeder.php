<?php

namespace Database\Seeders;

use App\Models\Campus;
use App\Models\Department;
use App\Models\Staff;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $campuses = Campus::with('school')->get();

        foreach ($campuses as $campus) {
            $code = strtolower($campus->code);

            // HR MANAGER
            $hr = User::firstOrCreate(
                ['email' => "{$code}.hr@school.com"],
                [
                    'name' => $campus->name . ' HR Manager',
                    'password' => bcrypt('password123'),
                    'role' => 'hr_manager',
                    'school_id' => $campus->school_id,
                    'campus_id' => $campus->id,
                    'status' => 'active',
                ]
            );
            $hr->syncRoles(['hr_manager']);

            // RECEPTIONIST
            $recept = User::firstOrCreate(
                ['email' => "{$code}.reception@school.com"],
                [
                    'name' => $campus->name . ' Receptionist',
                    'password' => bcrypt('password123'),
                    'role' => 'receptionist',
                    'school_id' => $campus->school_id,
                    'campus_id' => $campus->id,
                    'status' => 'active',
                ]
            );
            $recept->syncRoles(['receptionist']);

            // LIBRARIAN (Staff in Library dept)
            $libDept = Department::where('campus_id', $campus->id)
                ->where('code', 'LIB')->first();

            $lib = User::firstOrCreate(
                ['email' => "{$code}.librarian@school.com"],
                [
                    'name' => $campus->name . ' Librarian',
                    'password' => bcrypt('password123'),
                    'role' => 'librarian',
                    'school_id' => $campus->school_id,
                    'campus_id' => $campus->id,
                    'status' => 'active',
                ]
            );
            $lib->syncRoles(['librarian', 'staff']);

            if ($libDept) {
                Staff::firstOrCreate(
                    ['user_id' => $lib->id],
                    [
                        'employee_id' => strtoupper($campus->code) . '-LIB-001',
                        'department_id' => $libDept->id,
                        'designation' => 'Librarian',
                        'salary' => 45000,
                        'employment_type' => 'full_time',
                        'joining_date' => now()->subYear(),
                        'status' => 'active',
                    ]
                );
            }

            // TRANSPORT MANAGER (Staff in Transport dept)
            $transDept = Department::where('campus_id', $campus->id)
                ->where('code', 'TRAN')->first();

            $trans = User::firstOrCreate(
                ['email' => "{$code}.transport@school.com"],
                [
                    'name' => $campus->name . ' Transport Manager',
                    'password' => bcrypt('password123'),
                    'role' => 'transport_manager',
                    'school_id' => $campus->school_id,
                    'campus_id' => $campus->id,
                    'status' => 'active',
                ]
            );
            $trans->syncRoles(['transport_manager', 'staff']);

            if ($transDept) {
                Staff::firstOrCreate(
                    ['user_id' => $trans->id],
                    [
                        'employee_id' => strtoupper($campus->code) . '-TRAN-001',
                        'department_id' => $transDept->id,
                        'designation' => 'Transport Manager',
                        'salary' => 55000,
                        'employment_type' => 'full_time',
                        'joining_date' => now()->subYear(),
                        'status' => 'active',
                    ]
                );
            }

            // ACCOUNTANT (Staff in Finance dept)
            $finDept = Department::where('campus_id', $campus->id)
                ->where('code', 'FIN')->first();

            $fin = User::firstOrCreate(
                ['email' => "{$code}.accountant@school.com"],
                [
                    'name' => $campus->name . ' Accountant',
                    'password' => bcrypt('password123'),
                    'role' => 'accountant',
                    'school_id' => $campus->school_id,
                    'campus_id' => $campus->id,
                    'status' => 'active',
                ]
            );
            $fin->syncRoles(['accountant', 'staff']);

            if ($finDept) {
                Staff::firstOrCreate(
                    ['user_id' => $fin->id],
                    [
                        'employee_id' => strtoupper($campus->code) . '-FIN-001',
                        'department_id' => $finDept->id,
                        'designation' => 'Accountant',
                        'salary' => 60000,
                        'employment_type' => 'full_time',
                        'joining_date' => now()->subYear(),
                        'status' => 'active',
                    ]
                );
            }

            // TEACHERS (5 per campus)
            $teacherData = [
                ['name' => 'Ahmed Khan', 'spec' => 'Mathematics', 'gender' => 'male'],
                ['name' => 'Sara Ali', 'spec' => 'English', 'gender' => 'female'],
                ['name' => 'Muhammad Salman', 'spec' => 'Science', 'gender' => 'male'],
                ['name' => 'Fatima Noor', 'spec' => 'Urdu', 'gender' => 'female'],
                ['name' => 'Usman Raza', 'spec' => 'Computer Science', 'gender' => 'male'],
            ];

            foreach ($teacherData as $i => $data) {
                $tUser = User::firstOrCreate(
                    ['email' => "{$code}.teacher" . ($i + 1) . '@school.com'],
                    [
                        'name' => $data['name'],
                        'password' => bcrypt('password123'),
                        'role' => 'teacher',
                        'school_id' => $campus->school_id,
                        'campus_id' => $campus->id,
                        'gender' => $data['gender'],
                        'status' => 'active',
                    ]
                );
                $tUser->syncRoles(['teacher']);

                Teacher::firstOrCreate(
                    ['user_id' => $tUser->id],
                    [
                        'employee_id' => strtoupper($campus->code) . '-TCH-' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                        'qualification' => 'M.Sc ' . $data['spec'],
                        'experience_years' => rand(3, 10),
                        'specialization' => $data['spec'],
                        'salary' => rand(40000, 70000),
                        'employment_type' => 'full_time',
                        'joining_date' => now()->subYears(rand(1, 5)),
                        'status' => 'active',
                    ]
                );
            }
        }

        $this->command->info('✅ HR, Receptionists, Librarians, Transport Managers, Accountants, Teachers seeded.');
    }
}