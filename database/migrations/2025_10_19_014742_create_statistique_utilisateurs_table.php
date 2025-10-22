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
        Schema::create('statistique_utilisateurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('users')->onDelete('cascade');
            $table->integer('nombre_projets_postes')->default(0);
            $table->integer('nombre_devis_envoyes')->default(0);
            $table->integer('nombre_devis_recus')->default(0);
            $table->integer('nombre_transactions')->default(0);
            $table->decimal('taux_reponse', 5, 2)->default(0); // %
            $table->decimal('satisfaction_moyenne', 3, 2)->default(0); // /5
            $table->integer('delai_moyen_reponse_heures')->default(0);
            $table->timestamp('date_mise_a_jour')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistique_utilisateurs');
    }
};
