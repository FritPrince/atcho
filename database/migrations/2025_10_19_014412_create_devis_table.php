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
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->text('description');
            $table->string('image_devis')->nullable();
            $table->json('images_produits')->nullable();
            $table->json('images_maquettes')->nullable();
            $table->json('images_materiaux')->nullable();
            $table->decimal('montant', 10, 2);
            $table->integer('delai_jours');
            $table->timestamp('date_creation')->nullable();
            $table->timestamp('date_expiration')->nullable();
            $table->text('conditions_paiement')->nullable();
            $table->text('garantie')->nullable();
            $table->enum('statut', ['EN_ATTENTE', 'ACCEPTE', 'REFUSE', 'EXPIRE'])->default('EN_ATTENTE');
            $table->foreignId('projet_id')->constrained('projets')->onDelete('cascade');
            $table->foreignId('atelier_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};
