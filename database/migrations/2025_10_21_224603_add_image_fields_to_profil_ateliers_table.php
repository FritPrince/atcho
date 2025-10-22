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
        Schema::table('profil_ateliers', function (Blueprint $table) {
            $table->string('photo_profil')->nullable()->after('nom_atelier');
            $table->string('photo_couverture')->nullable()->after('photo_profil');
            $table->json('galerie_images')->nullable()->after('photo_couverture'); // Array d'URLs d'images
            $table->string('logo_atelier')->nullable()->after('galerie_images');
            $table->json('images_equipements')->nullable()->after('logo_atelier'); // Images des équipements
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_ateliers', function (Blueprint $table) {
            $table->dropColumn(['photo_profil', 'photo_couverture', 'galerie_images', 'logo_atelier', 'images_equipements']);
        });
    }
};
