<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ============================================
        // 1. PERMISSIONS
        // ============================================

        $permissions = [
            // Dashboard
            'dashboard.view',

            // Organization (Super Admin only)
            'organizations.view', 'organizations.create', 'organizations.edit', 'organizations.delete',

            // Schools
            'schools.view', 'schools.create', 'schools.edit', 'schools.delete',

            // Campuses
            'campuses.view', 'campuses.create', 'campuses.edit', 'campuses.delete',

            // Academic
            'academic_sessions.view', 'academic_sessions.create', 'academic_sessions.edit', 'academic_sessions.delete',
            'departments.view', 'departments.create', 'departments.edit', 'departments.delete',
            'standards.view', 'standards.create', 'standards.edit', 'standards.delete',
            'sections.view', 'sections.create', 'sections.edit', 'sections.delete',
            'subjects.view', 'subjects.create', 'subjects.edit', 'subjects.delete',

            // Students
            'students.view', 'students.create', 'students.edit', 'students.delete',
            'students.import', 'students.export',

            // Guardians
            'guardians.view', 'guardians.create', 'guardians.edit', 'guardians.delete',

            // Teachers
            'teachers.view', 'teachers.create', 'teachers.edit', 'teachers.delete',

            // Staff
            'staff.view', 'staff.create', 'staff.edit', 'staff.delete',

            // Attendance
            'attendance.view', 'attendance.mark', 'attendance.edit', 'attendance.report',

            // Timetable
            'timetable.view', 'timetable.create', 'timetable.edit', 'timetable.delete',

            // Exams
            'exams.view', 'exams.create', 'exams.edit', 'exams.delete', 'exams.schedule',

            // Results
            'results.view', 'results.manage', 'results.publish', 'results.export',

            // Fees
            'fees.view', 'fees.collect', 'fees.refund', 'fees.structure', 'fees.report',

            // Library
            'library.view', 'library.manage', 'library.issue', 'library.return', 'library.fine',

            // Transport
            'transport.view', 'transport.manage', 'transport.assign',

            // Health
            'health.view', 'health.manage',

            // Inventory
            'inventory.view', 'inventory.manage', 'inventory.stock',

            // HR
            'hr.view', 'hr.manage', 'hr.payroll', 'hr.leave',

            // Reports
            'reports.view', 'reports.generate',

            // Settings
            'settings.view', 'settings.edit',

            // Users
            'users.view', 'users.create', 'users.edit', 'users.delete', 'users.roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ============================================
        // 2. ROLES
        // ============================================

        // Delete old school_admin role if it exists (replaced by principal)
        $oldRole = Role::where('name', 'school_admin')->first();
        if ($oldRole) {
            $oldRole->delete();
        }

        // Also remove 'parent' role if present (renamed to 'guardian')
        $oldParent = Role::where('name', 'parent')->first();
        if ($oldParent) {
            $oldParent->delete();
        }

        // -------- SUPER ADMIN --------
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdmin->syncPermissions(Permission::all());

        // -------- PRINCIPAL (School-level) --------
        $principal = Role::firstOrCreate(['name' => 'principal']);
        $principal->syncPermissions([
            'dashboard.view',
            // School-level view
            'schools.view',
            'campuses.view', 'campuses.create', 'campuses.edit',
            // Academic
            'academic_sessions.view', 'academic_sessions.create', 'academic_sessions.edit',
            'departments.view', 'departments.create', 'departments.edit', 'departments.delete',
            'standards.view', 'standards.create', 'standards.edit', 'standards.delete',
            'sections.view', 'sections.create', 'sections.edit', 'sections.delete',
            'subjects.view', 'subjects.create', 'subjects.edit', 'subjects.delete',
            // Students
            'students.view', 'students.create', 'students.edit', 'students.delete',
            'students.import', 'students.export',
            // Guardians
            'guardians.view', 'guardians.create', 'guardians.edit', 'guardians.delete',
            // Teachers & Staff
            'teachers.view', 'teachers.create', 'teachers.edit', 'teachers.delete',
            'staff.view', 'staff.create', 'staff.edit', 'staff.delete',
            // Attendance
            'attendance.view', 'attendance.mark', 'attendance.edit', 'attendance.report',
            // Timetable
            'timetable.view',
            // Exams & Results
            'exams.view', 'exams.create', 'exams.edit', 'exams.schedule',
            'results.view', 'results.manage', 'results.publish',
            // Fees
            'fees.view',
            // Library
            'library.view',
            // Transport
            'transport.view',
            // Health
            'health.view',
            // Reports
            'reports.view',
            // Users
            'users.view', 'users.create', 'users.edit',
        ]);

        // -------- VICE PRINCIPAL (Campus-level) --------
        $vicePrincipal = Role::firstOrCreate(['name' => 'vice_principal']);
        $vicePrincipal->syncPermissions([
            'dashboard.view',
            // Departments (own campus)
            'departments.view', 'departments.create', 'departments.edit', 'departments.delete',
            // Academic
            'standards.view', 'standards.create', 'standards.edit',
            'sections.view', 'sections.create', 'sections.edit',
            'subjects.view', 'subjects.create', 'subjects.edit',
            // Students
            'students.view', 'students.create', 'students.edit',
            'students.import', 'students.export',
            // Guardians
            'guardians.view', 'guardians.create', 'guardians.edit',
            // Teachers
            'teachers.view', 'teachers.create', 'teachers.edit',
            // Staff
            'staff.view',
            // Attendance
            'attendance.view', 'attendance.mark', 'attendance.report',
            // Timetable
            'timetable.view', 'timetable.create', 'timetable.edit', 'timetable.delete',
            // Exams & Results
            'exams.view', 'exams.create', 'exams.edit',
            'results.view', 'results.manage',
            // Fees
            'fees.view',
            // Library
            'library.view',
            // Transport
            'transport.view',
            // Health
            'health.view',
            // Reports
            'reports.view',
        ]);

        // -------- HR MANAGER (Campus-level) --------
        $hrManager = Role::firstOrCreate(['name' => 'hr_manager']);
        $hrManager->syncPermissions([
            'dashboard.view',
            // Teachers
            'teachers.view', 'teachers.create', 'teachers.edit', 'teachers.delete',
            // Staff
            'staff.view', 'staff.create', 'staff.edit', 'staff.delete',
            // Departments (view only)
            'departments.view',
            // HR
            'hr.view', 'hr.manage', 'hr.payroll', 'hr.leave',
            // Reports
            'reports.view',
        ]);

        // -------- RECEPTIONIST (Campus-level) --------
        $receptionist = Role::firstOrCreate(['name' => 'receptionist']);
        $receptionist->syncPermissions([
            'dashboard.view',
            // Students
            'students.view', 'students.create', 'students.edit', 'students.delete',
            'students.import', 'students.export',
            // Guardians
            'guardians.view', 'guardians.create', 'guardians.edit', 'guardians.delete',
            // Attendance
            'attendance.view',
            // Timetable
            'timetable.view', 'timetable.create', 'timetable.edit', 'timetable.delete',
            // Transport
            'transport.view',
            // Health
            'health.view',
        ]);

        // -------- TEACHER (Campus-level) --------
        $teacher = Role::firstOrCreate(['name' => 'teacher']);
        $teacher->syncPermissions([
            'dashboard.view',
            'students.view',
            'guardians.view',
            'attendance.view', 'attendance.mark',
            'timetable.view',
            'exams.view',
            'results.view', 'results.manage',
            'library.view', 'library.issue',
            'transport.view',
            'health.view',
        ]);

        // -------- LIBRARIAN (from Staff module) --------
        $librarian = Role::firstOrCreate(['name' => 'librarian']);
        $librarian->syncPermissions([
            'dashboard.view',
            'students.view',
            'library.view', 'library.manage', 'library.issue', 'library.return', 'library.fine',
            'reports.view',
        ]);

        // -------- TRANSPORT MANAGER (from Staff module) --------
        $transportManager = Role::firstOrCreate(['name' => 'transport_manager']);
        $transportManager->syncPermissions([
            'dashboard.view',
            'students.view',
            'transport.view', 'transport.manage', 'transport.assign',
            'reports.view',
        ]);

        // -------- ACCOUNTANT (from Staff module) --------
        $accountant = Role::firstOrCreate(['name' => 'accountant']);
        $accountant->syncPermissions([
            'dashboard.view',
            'students.view',
            'fees.view', 'fees.collect', 'fees.refund', 'fees.structure', 'fees.report',
            'reports.view',
        ]);

        // -------- STAFF (default) --------
        $staff = Role::firstOrCreate(['name' => 'staff']);
        $staff->syncPermissions([
            'dashboard.view',
            'staff.view',
            'hr.view',
        ]);

        // -------- STUDENT --------
        $student = Role::firstOrCreate(['name' => 'student']);
        $student->syncPermissions([
            'dashboard.view',
            'students.view',
            'attendance.view',
            'timetable.view',
            'exams.view',
            'results.view',
            'fees.view',
            'library.view',
            'transport.view',
            'health.view',
        ]);

        // -------- GUARDIAN --------
        $guardian = Role::firstOrCreate(['name' => 'guardian']);
        $guardian->syncPermissions([
            'dashboard.view',
            'students.view',
            'attendance.view',
            'timetable.view',
            'exams.view',
            'results.view',
            'fees.view',
            'library.view',
            'transport.view',
            'health.view',
        ]);

        // ============================================
        // 3. SUMMARY
        // ============================================

        $this->command->info('');
        $this->command->info('✅ Roles and permissions seeded successfully!');
        $this->command->info('');
        $this->command->info('📋 Roles created:');
        $roles = Role::withCount('permissions')->get();
        foreach ($roles as $role) {
            $this->command->info("   • {$role->name} ({$role->permissions_count} permissions)");
        }
        $this->command->info('');
        $this->command->info('');
    }
}