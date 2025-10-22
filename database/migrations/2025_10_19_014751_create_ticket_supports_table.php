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
        Schema::create('ticket_supports', function (Blueprint $table) {
            $table->id();
            $table->string('sujet');
            $table->text('description');
            $table->enum('priorite', ['BASSE', 'MOYENNE', 'HAUTE', 'URGENTE'])->default('MOYENNE');
            $table->enum('statut', ['OUVERT', 'EN_COURS', 'RESOLU', 'FERME'])->default('OUVERT');
            $table->enum('categorie', ['TECHNIQUE', 'FACTURATION', 'SIGNALEMENT', 'AUTRE'])->default('TECHNIQUE');
            $table->timestamp('date_creation')->nullable();
            $table->timestamp('date_resolution')->nullable();
            $table->foreignId('createur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('assigne_a_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_supports');
    }
};
