<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->string('image_principale')->nullable();
            $table->string('image_couverture')->nullable();
            $table->json('galerie_images')->nullable();
            $table->string('logo_atelier')->nullable();
            $table->boolean('est_public')->default(true);
            $table->timestamp('date_creation')->nullable();
            $table->foreignId('atelier_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
