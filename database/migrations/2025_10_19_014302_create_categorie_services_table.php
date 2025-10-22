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
        Schema::create('categorie_services', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Confection, Broderie, Teinture, Retouches
            $table->text('description')->nullable();
            $table->string('icone')->nullable();
            $table->integer('ordre_affichage')->default(0);
            $table->boolean('est_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorie_services');
    }
};
