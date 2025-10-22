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
        Schema::create('rendez_vous', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->timestamp('date_debut')->nullable();
            $table->timestamp('date_fin')->nullable();
            $table->enum('type', ['VISITE_ATELIER', 'FITTING', 'LIVRAISON', 'REUNION']);
            $table->enum('statut', ['PLANIFIE', 'CONFIRME', 'ANNULE', 'TERMINE'])->default('PLANIFIE');
            $table->string('lieu')->nullable();
            $table->foreignId('adresse_id')->nullable()->constrained('addresses')->onDelete('set null');
            $table->foreignId('createur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('participant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('projet_associe_id')->nullable()->constrained('projets')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendez_vous');
    }
};
