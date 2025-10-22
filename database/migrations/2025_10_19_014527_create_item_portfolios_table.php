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
        Schema::create('item_portfolios', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->json('images_urls'); // Array of image URLs
            $table->json('competences_demonstrees'); // Array of competences
            $table->timestamp('date_realisation')->nullable();
            $table->enum('type_projet', ['PRET_A_PORTER', 'SUR_MESURE', 'ACCESSOIRE', 'HAUTE_COUTURE'])->nullable();
            $table->decimal('budget_realise', 10, 2)->nullable();
            $table->integer('delai_realisation_jours')->nullable();
            $table->foreignId('portfolio_id')->constrained('portfolios')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_portfolios');
    }
};
