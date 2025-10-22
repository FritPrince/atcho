<?php

namespace Database\Seeders;

use App\Models\Adresse;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer une adresse pour l'admin
        $adresse = Adresse::create([
            'ligne1' => '123 Rue de la Mode',
            'ligne2' => 'Bâtiment A',
            'code_postal' => '75001',
            'ville' => 'Paris',
            'pays' => 'France',
            'region' => 'Île-de-France',
        ]);

        // Créer l'utilisateur admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@atcho.com'],
            [
            'prenom' => 'Admin',
            'nom' => 'Atcho',
            'email' => 'admin@atcho.com',
            'password' => Hash::make('password'),
            'telephone' => '+33123456789',
            'bio' => 'Administrateur principal de la plateforme Atcho',
            'role' => 'ADMIN',
            'adresse_id' => $adresse->id,
            'est_verifie' => true,
            'est_actif' => true,
            'preferences_notifications' => [
                'email' => true,
                'sms' => false,
                'push' => true,
            ],
            'date_inscription' => now(),
            ]
        );

        // Assigner le rôle admin
        $admin->assignRole('ADMIN');

        $this->command->info('Utilisateur admin créé avec succès !');
        $this->command->info('Email: admin@atcho.com');
        $this->command->info('Mot de passe: password');
    }
}
