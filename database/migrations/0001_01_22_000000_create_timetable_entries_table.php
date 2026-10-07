<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('timetable_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('standard_id')->constrained()->onDelete('cascade');
            $table->foreignId('section_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('time_slot_id')->constrained()->onDelete('cascade');
            $table->string('room_number');
            $table->foreignId('academic_session_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Prevent conflicts
            $table->unique(['standard_id', 'section_id', 'time_slot_id'], 'unique_timetable_standard_section_time');
            $table->unique(['teacher_id', 'time_slot_id'], 'unique_timetable_teacher_time');
            $table->unique(['room_number', 'time_slot_id'], 'unique_timetable_room_time');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetable_entries');
    }
};