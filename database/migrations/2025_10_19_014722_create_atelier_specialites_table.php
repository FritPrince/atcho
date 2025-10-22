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
        Schema::create('atelier_specialites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('atelier_id')->constrained('profil_ateliers')->onDelete('cascade');
            $table->foreignId('categorie_id')->constrained('categorie_services')->onDelete('cascade');
            $table->integer('niveau_expertise')->default(1); // 1-5
            $table->decimal('tarif_horaire', 8, 2)->nullable();
            $table->timestamps();

            $table->unique(['atelier_id', 'categorie_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atelier_specialites');
    }
};
