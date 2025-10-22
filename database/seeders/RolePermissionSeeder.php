<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer les rôles
        $roles = [
            'ADMIN' => 'Administrateur',
            'CREATEUR' => 'Créateur de mode',
            'ATELIER' => 'Atelier de couture',
            'PRESTATAIRE' => 'Prestataire de services',
        ];

        foreach ($roles as $name => $description) {
            Role::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        // Créer les permissions
        $permissions = [
            // Gestion des utilisateurs
            'users.view' => 'Voir les utilisateurs',
            'users.create' => 'Créer des utilisateurs',
            'users.edit' => 'Modifier les utilisateurs',
            'users.delete' => 'Supprimer les utilisateurs',
            'users.verify' => 'Vérifier les utilisateurs',
            'users.activate' => 'Activer/Désactiver les utilisateurs',

            // Gestion des projets
            'projects.view' => 'Voir les projets',
            'projects.create' => 'Créer des projets',
            'projects.edit' => 'Modifier les projets',
            'projects.delete' => 'Supprimer les projets',
            'projects.approve' => 'Approuver les projets',
            'projects.reject' => 'Rejeter les projets',

            // Gestion des commandes
            'orders.view' => 'Voir les commandes',
            'orders.create' => 'Créer des commandes',
            'orders.edit' => 'Modifier les commandes',
            'orders.delete' => 'Supprimer les commandes',
            'orders.manage' => 'Gérer les commandes',

            // Gestion des devis
            'quotes.view' => 'Voir les devis',
            'quotes.create' => 'Créer des devis',
            'quotes.edit' => 'Modifier les devis',
            'quotes.delete' => 'Supprimer les devis',
            'quotes.approve' => 'Approuver les devis',

            // Gestion des conversations
            'conversations.view' => 'Voir les conversations',
            'conversations.create' => 'Créer des conversations',
            'conversations.edit' => 'Modifier les conversations',
            'conversations.delete' => 'Supprimer les conversations',

            // Gestion des documents
            'documents.view' => 'Voir les documents',
            'documents.upload' => 'Télécharger des documents',
            'documents.delete' => 'Supprimer les documents',

            // Administration
            'admin.dashboard' => 'Accès au tableau de bord admin',
            'admin.analytics' => 'Voir les analytics',
            'admin.settings' => 'Gérer les paramètres',
            'admin.reports' => 'Générer des rapports',

            // Profil personnel
            'profile.view' => 'Voir son profil',
            'profile.edit' => 'Modifier son profil',
            'profile.delete' => 'Supprimer son profil',
        ];

        foreach ($permissions as $name => $description) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        // Assigner les permissions aux rôles
        $adminRole = Role::findByName('ADMIN');
        $adminRole->givePermissionTo(Permission::all());

        $createurRole = Role::findByName('CREATEUR');
        $createurRole->givePermissionTo([
            'projects.create', 'projects.edit', 'projects.view',
            'orders.view', 'orders.create',
            'quotes.view', 'quotes.create',
            'conversations.view', 'conversations.create',
            'documents.view', 'documents.upload',
            'profile.view', 'profile.edit',
        ]);

        $atelierRole = Role::findByName('ATELIER');
        $atelierRole->givePermissionTo([
            'projects.view',
            'orders.view', 'orders.edit', 'orders.manage',
            'quotes.view', 'quotes.create', 'quotes.edit',
            'conversations.view', 'conversations.create',
            'documents.view', 'documents.upload',
            'profile.view', 'profile.edit',
        ]);

        $prestataireRole = Role::findByName('PRESTATAIRE');
        $prestataireRole->givePermissionTo([
            'projects.view',
            'orders.view',
            'quotes.view', 'quotes.create',
            'conversations.view', 'conversations.create',
            'documents.view', 'documents.upload',
            'profile.view', 'profile.edit',
        ]);
    }
}
