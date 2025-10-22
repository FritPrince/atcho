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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('message');
            $table->enum('type', ['MESSAGE', 'DEVIS', 'PROJET', 'SYSTEME', 'AVIS']);
            $table->boolean('est_lue')->default(false);
            $table->timestamp('date_creation')->nullable();
            $table->string('lien_action')->nullable();
            $table->foreignId('destinataire_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('emetteur_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
