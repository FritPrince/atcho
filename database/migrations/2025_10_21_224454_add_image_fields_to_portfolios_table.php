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
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('image_principale')->nullable()->after('description');
            $table->string('image_couverture')->nullable()->after('image_principale');
            $table->json('galerie_images')->nullable()->after('image_couverture'); // Array d'URLs d'images
            $table->string('logo_atelier')->nullable()->after('galerie_images');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['image_principale', 'image_couverture', 'galerie_images', 'logo_atelier']);
        });
    }
};
