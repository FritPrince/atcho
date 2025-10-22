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
        Schema::create('profil_ateliers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('users')->onDelete('cascade');
            $table->string('nom_atelier');
            $table->text('description_entreprise')->nullable();
            $table->integer('annee_creation')->nullable();
            $table->enum('type_entreprise', ['INDIVIDUEL', 'SARL', 'SA', 'AUTO_ENTREPRENEUR'])->default('INDIVIDUEL');
            $table->string('numero_siret')->nullable();
            $table->integer('taille_equipe')->default(1);
            $table->decimal('tarif_horaire_moyen', 8, 2)->nullable();
            $table->integer('delai_livraison_moyen_jours')->nullable();
            $table->integer('capacite_production_mensuelle')->nullable();
            $table->decimal('note_moyenne', 3, 2)->default(0);
            $table->integer('nombre_projets_realises')->default(0);
            $table->json('equipements')->nullable(); // JSON pour les équipements
            $table->boolean('accepte_urgences')->default(false);
            $table->integer('rayon_intervention_km')->default(50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_ateliers');
    }
};
