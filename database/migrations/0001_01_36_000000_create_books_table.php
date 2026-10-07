<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campus_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('book_categories')->onDelete('cascade');
            $table->string('title');
            $table->string('isbn')->unique();
            $table->string('author');
            $table->string('publisher')->nullable();
            $table->string('edition')->nullable();
            $table->year('year')->nullable();
            $table->integer('total_copies')->default(1);
            $table->integer('available_copies')->default(1);
            $table->string('shelf_location')->nullable();
            $table->string('rack_number')->nullable();
            $table->enum('status', ['available', 'issued', 'reserved'])->default('available');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};