<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            $table->decimal('salary', 10, 2)->default(0)->after('experience_years');
            $table->enum('employment_type', ['full_time', 'part_time', 'contract', 'intern'])
                  ->default('full_time')->after('salary');
        });
    }

    public function down(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            $table->dropColumn(['salary', 'employment_type']);
        });
    }
};