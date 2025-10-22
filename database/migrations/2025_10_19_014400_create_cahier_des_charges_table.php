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
        Schema::create('cahier_des_charges', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description_detaille');
            $table->json('specifications_techniques')->nullable(); // JSON
            $table->json('materiaux_requis')->nullable(); // JSON
            $table->json('contraintes')->nullable(); // JSON
            $table->text('notes_supplementaires')->nullable();
            $table->foreignId('createur_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cahier_des_charges');
    }
};
