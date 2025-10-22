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
        Schema::create('message_supports', function (Blueprint $table) {
            $table->id();
            $table->text('contenu');
            $table->boolean('est_interne')->default(false); // Message entre admins
            $table->timestamp('date_envoi')->nullable();
            $table->foreignId('auteur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ticket_id')->constrained('ticket_supports')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_supports');
    }
};
