<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            // Drop existing unique constraint on 'code'
            $table->dropUnique(['code']);
        });

        Schema::table('departments', function (Blueprint $table) {
            // Add composite unique: code unique per campus
            $table->unique(['campus_id', 'code']);
        });
    }

    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropUnique(['campus_id', 'code']);
        });

        Schema::table('departments', function (Blueprint $table) {
            $table->unique('code');
        });
    }
};