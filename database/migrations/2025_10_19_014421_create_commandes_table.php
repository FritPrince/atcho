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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->decimal('montant_final', 10, 2);
            $table->timestamp('date_creation')->nullable();
            $table->timestamp('date_livraison_prevue')->nullable();
            $table->timestamp('date_livraison_reelle')->nullable();
            $table->text('conditions_livraison')->nullable();
            $table->enum('statut', ['EN_PREPARATION', 'EN_COUPAGE', 'EN_ASSEMBLAGE', 'TERMINEE', 'LIVREE'])->default('EN_PREPARATION');
            $table->foreignId('projet_id')->constrained('projets')->onDelete('cascade');
            $table->foreignId('atelier_id')->constrained('profil_ateliers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
