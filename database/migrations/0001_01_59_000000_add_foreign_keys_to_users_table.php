<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add foreign key to users table
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('campus_id')
                  ->references('id')
                  ->on('campuses')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['campus_id']);
        });
    }
};