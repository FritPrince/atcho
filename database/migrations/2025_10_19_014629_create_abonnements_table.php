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
        Schema::create('abonnements', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // BASIQUE, PRO, BUSINESS
            $table->text('description')->nullable();
            $table->decimal('prix_mensuel', 8, 2);
            $table->integer('duree_jours')->default(30);
            $table->json('avantages'); // JSON array
            $table->integer('limite_projets')->nullable();
            $table->integer('limite_devis')->nullable();
            $table->boolean('statistiques_avancees')->default(false);
            $table->boolean('support_prioritaire')->default(false);
            $table->boolean('est_actif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abonnements');
    }
};
