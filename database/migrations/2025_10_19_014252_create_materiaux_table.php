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
        Schema::create('materiaux', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Coton, Wax, Bazin, Cuir
            $table->string('type'); // Tissu, Accessoire, Fil
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->enum('difficulte', ['FACILE', 'MOYEN', 'DIFFICILE'])->default('MOYEN');
            $table->boolean('est_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiaux');
    }
};
