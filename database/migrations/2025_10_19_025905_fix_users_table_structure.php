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
        Schema::table('users', function (Blueprint $table) {
            // Vérifier si la colonne 'name' existe et la renommer en 'prenom'
            if (Schema::hasColumn('users', 'name')) {
                $table->renameColumn('name', 'prenom');
            }

            // Ajouter 'nom' si elle n'existe pas
            if (! Schema::hasColumn('users', 'nom')) {
                $table->string('nom')->after('prenom');
            }

            // Ajouter les autres colonnes si elles n'existent pas
            if (! Schema::hasColumn('users', 'telephone')) {
                $table->string('telephone')->nullable()->after('email');
            }
            if (! Schema::hasColumn('users', 'photo_profil')) {
                $table->string('photo_profil')->nullable()->after('telephone');
            }
            if (! Schema::hasColumn('users', 'bio')) {
                $table->text('bio')->nullable()->after('photo_profil');
            }
            if (! Schema::hasColumn('users', 'adresse_id')) {
                $table->foreignId('adresse_id')->nullable()->constrained('addresses')->after('bio');
            }
            if (! Schema::hasColumn('users', 'role')) {
                $table->enum('role', ['CREATEUR', 'ATELIER', 'PRESTATAIRE', 'ADMIN'])->default('CREATEUR')->after('adresse_id');
            }
            if (! Schema::hasColumn('users', 'est_verifie')) {
                $table->boolean('est_verifie')->default(false)->after('role');
            }
            if (! Schema::hasColumn('users', 'est_actif')) {
                $table->boolean('est_actif')->default(true)->after('est_verifie');
            }
            if (! Schema::hasColumn('users', 'preferences_notifications')) {
                $table->json('preferences_notifications')->nullable()->after('est_actif');
            }
            if (! Schema::hasColumn('users', 'date_inscription')) {
                $table->timestamp('date_inscription')->nullable()->after('preferences_notifications');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
