<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_academic_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('standard_id')->constrained()->onDelete('cascade');
            $table->foreignId('section_id')->constrained()->onDelete('cascade');
            $table->foreignId('academic_session_id')->constrained()->onDelete('cascade');
            $table->date('enrollment_date');
            $table->date('promotion_date')->nullable();
            $table->enum('status', ['enrolled', 'promoted', 'graduated', 'transferred'])->default('enrolled');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_academic_records');
    }
};