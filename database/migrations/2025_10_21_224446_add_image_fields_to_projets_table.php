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
        Schema::table('projets', function (Blueprint $table) {
            $table->string('image_principale')->nullable()->after('description');
            $table->json('galerie_images')->nullable()->after('image_principale'); // Array d'URLs d'images
            $table->string('image_couverture')->nullable()->after('galerie_images');
            $table->json('images_avant_apres')->nullable()->after('image_couverture'); // Pour montrer l'évolution
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projets', function (Blueprint $table) {
            $table->dropColumn(['image_principale', 'galerie_images', 'image_couverture', 'images_avant_apres']);
        });
    }
};
