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
        Schema::create('projets', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->foreignId('cahier_des_charges_id')->nullable()->constrained('cahier_des_charges')->onDelete('set null');
            $table->timestamp('date_creation')->nullable();
            $table->timestamp('date_limite')->nullable();
            $table->timestamp('date_debut_souhaitee')->nullable();
            $table->decimal('budget_estime', 10, 2)->nullable();
            $table->integer('quantite')->default(1); // Nombre de pièces
            $table->enum('complexite', ['SIMPLE', 'MOYEN', 'COMPLEXE'])->default('MOYEN');
            $table->enum('confidentialite', ['PUBLIC', 'PRIVE', 'CONFIDENTIEL'])->default('PUBLIC');
            $table->enum('statut', ['BROUILLON', 'PUBLIE', 'EN_NEGOCIATION', 'EN_COURS', 'TERMINE', 'ANNULE'])->default('BROUILLON');
            $table->foreignId('createur_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projets');
    }
};
