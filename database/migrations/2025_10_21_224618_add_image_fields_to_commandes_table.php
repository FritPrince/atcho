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
        Schema::table('commandes', function (Blueprint $table) {
            $table->string('image_commande')->nullable()->after('date_creation');
            $table->json('images_produits')->nullable()->after('image_commande'); // Images des produits commandés
            $table->json('images_avant_apres')->nullable()->after('images_produits'); // Images avant/après réalisation
            $table->json('images_livraison')->nullable()->after('images_avant_apres'); // Images de la livraison
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commandes', function (Blueprint $table) {
            $table->dropColumn(['image_commande', 'images_produits', 'images_avant_apres', 'images_livraison']);
        });
    }
};
