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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('nom_fichier');
            $table->enum('type', ['PDF', 'IMAGE', 'VIDEO', 'ZIP', 'AUTRE']);
            $table->string('url');
            $table->bigInteger('taille'); // en bytes
            $table->text('description')->nullable();
            $table->timestamp('date_upload')->nullable();
            $table->foreignId('proprietaire_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('projet_associe_id')->nullable()->constrained('projets')->onDelete('set null');
            $table->boolean('est_public')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
