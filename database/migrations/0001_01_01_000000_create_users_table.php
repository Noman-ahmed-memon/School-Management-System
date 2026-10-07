<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            
            // Custom fields - NO FOREIGN KEY CONSTRAINTS
            $table->enum('role', [
                'super_admin', 'school_admin', 'principal', 'vice_principal',
                'teacher', 'accountant', 'librarian', 'receptionist',
                'student', 'guardian', 'transport_manager', 'hr_manager', 'staff'
            ])->nullable();
            
            // Use unsignedBigInteger instead of foreignId
            $table->unsignedBigInteger('campus_id')->nullable()->index();
            
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('profile_picture')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamp('last_login_at')->nullable();
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};