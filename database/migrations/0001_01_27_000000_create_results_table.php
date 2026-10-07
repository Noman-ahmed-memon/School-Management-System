<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->decimal('marks_obtained', 5, 2);
            $table->decimal('total_marks', 5, 2);
            $table->decimal('percentage', 5, 2);
            $table->string('grade')->nullable();
            $table->decimal('grade_points', 3, 2)->nullable();
            $table->boolean('is_passed')->default(false);
            $table->timestamps();
            
            $table->unique(['student_id', 'exam_id', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};