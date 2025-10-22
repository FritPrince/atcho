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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->decimal('montant', 10, 2);
            $table->enum('methode', ['MOBILE_MONEY', 'CARTE', 'VIREMENT', 'ESPECES']);
            $table->enum('statut', ['EN_ATTENTE', 'PAYE', 'ECHEC', 'REMBOURSE'])->default('EN_ATTENTE');
            $table->timestamp('date_paiement')->nullable();
            $table->json('details_transaction')->nullable(); // JSON
            $table->foreignId('commande_id')->nullable()->constrained('commandes')->onDelete('set null');
            $table->foreignId('payeur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('beneficiaire_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
