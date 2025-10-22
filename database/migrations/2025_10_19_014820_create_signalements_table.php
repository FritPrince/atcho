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
        Schema::create('signalements', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['PROFIL', 'PROJET', 'MESSAGE', 'AVIS']);
            $table->string('raison');
            $table->text('description')->nullable();
            $table->enum('statut', ['EN_ATTENTE', 'TRAITE', 'REJETE'])->default('EN_ATTENTE');
            $table->timestamp('date_signalement')->nullable();
            $table->foreignId('signalant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('signale_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('projet_concerne_id')->nullable()->constrained('projets')->onDelete('set null');
            $table->foreignId('message_concerne_id')->nullable()->constrained('messages')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signalements');
    }
};
