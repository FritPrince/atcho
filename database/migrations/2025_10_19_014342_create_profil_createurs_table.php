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
        Schema::create('profil_createurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('users')->onDelete('cascade');
            $table->string('nom_marque');
            $table->enum('style', ['LUXE', 'STREETWEAR', 'ECO_RESPONSABLE', 'CLASSIQUE', 'MODERNE', 'VINTAGE'])->nullable();
            $table->string('site_web')->nullable();
            $table->string('instagram')->nullable();
            $table->enum('experience', ['DEBUTANT', 'INTERMEDIAIRE', 'EXPERT'])->default('DEBUTANT');
            $table->enum('secteur', ['PRET_A_PORTER', 'ACCESSOIRES', 'MARIAGE', 'HAUTE_COUTURE', 'SPORT'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_createurs');
    }
};
