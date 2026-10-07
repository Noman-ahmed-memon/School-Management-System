<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('result_summaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->decimal('total_marks_obtained', 5, 2);
            $table->decimal('total_marks', 5, 2);
            $table->decimal('percentage', 5, 2);
            $table->string('grade')->nullable();
            $table->decimal('gpa', 3, 2)->nullable();
            $table->integer('position')->nullable();
            $table->boolean('is_passed')->default(false);
            $table->text('remark')->nullable();
            $table->timestamps();
            
            $table->unique(['student_id', 'exam_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('result_summaries');
    }
};