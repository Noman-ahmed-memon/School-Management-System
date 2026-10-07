<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campus_id')->constrained()->onDelete('cascade');
            $table->string('setting_key');
            $table->text('setting_value');
            $table->enum('setting_type', ['string', 'boolean', 'integer', 'json'])->default('string');
            $table->timestamps();
            
            $table->unique(['campus_id', 'setting_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_settings');
    }
};