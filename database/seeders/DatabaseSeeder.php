<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌹 Initialisation des données Atcho...');
        
        // 1. Créer les rôles et permissions
        $this->call([
            RolePermissionSeeder::class,
        ]);
        
        // 2. Créer l'utilisateur admin
        $this->call([
            AdminUserSeeder::class,
        ]);
        
        // 3. Créer les données de mode complètes
        $this->call([
            FashionDataSeeder::class,
        ]);

        $this->call([
            FashionImageSeeder::class,
        ]);

        $this->command->info('✨ Base de données initialisée avec succès !');
    }
}
