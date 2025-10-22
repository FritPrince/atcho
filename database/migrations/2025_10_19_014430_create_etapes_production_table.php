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
        Schema::create('etapes_production', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Coupe, Assemblage, Finitions
            $table->text('description')->nullable();
            $table->integer('ordre');
            $table->integer('duree_estimee_heures')->nullable();
            $table->boolean('est_terminee')->default(false);
            $table->timestamp('date_debut')->nullable();
            $table->timestamp('date_completion')->nullable();
            $table->text('photos')->nullable(); // URLs séparées par des virgules
            $table->foreignId('commande_id')->constrained('commandes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etapes_production');
    }
};
