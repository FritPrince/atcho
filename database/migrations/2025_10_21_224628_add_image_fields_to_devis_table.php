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
        Schema::table('devis', function (Blueprint $table) {
            $table->string('image_devis')->nullable()->after('date_creation');
            $table->json('images_produits')->nullable()->after('image_devis'); // Images des produits proposés
            $table->json('images_maquettes')->nullable()->after('images_produits'); // Images des maquettes
            $table->json('images_materiaux')->nullable()->after('images_maquettes'); // Images des matériaux proposés
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('devis', function (Blueprint $table) {
            $table->dropColumn(['image_devis', 'images_produits', 'images_maquettes', 'images_materiaux']);
        });
    }
};
