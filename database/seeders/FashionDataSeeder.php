<?php

namespace Database\Seeders;

use App\Models\Adresse;
use App\Models\CahierDesCharges;
use App\Models\CategorieService;
use App\Models\Commande;
use App\Models\Competence;
use App\Models\Conversation;
use App\Models\Devis;
use App\Models\ItemPortfolio;
use App\Models\Materiau;
use App\Models\Portfolio;
use App\Models\ProfilAtelier;
use App\Models\ProfilCreateur;
use App\Models\Projet;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FashionDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🌹 Création des données de mode Atcho...');

        // 1. Créer des adresses
        $adresses = $this->createAddresses();
        
        // 2. Créer des utilisateurs avec images
        $users = $this->createUsers($adresses);
        
        // 3. Créer des profils créateurs
        $createurs = $this->createProfilsCreateurs($users);
        
        // 4. Créer des profils ateliers
        $ateliers = $this->createProfilsAteliers($users);
        
        // 5. Créer des compétences
        $competences = $this->createCompetences();
        
        // 6. Créer des matériaux
        $materiaux = $this->createMateriaux();
        
        // 7. Créer des catégories de services
        $categories = $this->createCategoriesServices();
        
        // 8. Créer des portfolios (simplifié)
        $this->createPortfolios($ateliers);
        
        // 9. Créer des projets (simplifié)
        $this->createProjets($createurs);

        $this->command->info('✨ Données de mode créées avec succès !');
    }

    private function createAddresses()
    {
        $adresses = [
            [
                'ligne1' => '123 Avenue des Champs-Élysées',
                'ligne2' => 'Appartement 4B',
                'code_postal' => '75008',
                'ville' => 'Paris',
                'pays' => 'France',
                'region' => 'Île-de-France',
            ],
            [
                'ligne1' => '45 Rue de la Paix',
                'ligne2' => 'Atelier 2ème étage',
                'code_postal' => '75002',
                'ville' => 'Paris',
                'pays' => 'France',
                'region' => 'Île-de-France',
            ],
            [
                'ligne1' => '78 Boulevard Saint-Germain',
                'ligne2' => 'Studio de création',
                'code_postal' => '75006',
                'ville' => 'Paris',
                'pays' => 'France',
                'region' => 'Île-de-France',
            ],
            [
                'ligne1' => '12 Place Vendôme',
                'ligne2' => 'Boutique haute couture',
                'code_postal' => '75001',
                'ville' => 'Paris',
                'pays' => 'France',
                'region' => 'Île-de-France',
            ],
            [
                'ligne1' => '89 Rue du Faubourg Saint-Honoré',
                'ligne2' => 'Atelier principal',
                'code_postal' => '75008',
                'ville' => 'Paris',
                'pays' => 'France',
                'region' => 'Île-de-France',
            ]
        ];

        return collect($adresses)->map(function ($adresse) {
            return Adresse::create($adresse);
        });
    }

    private function createUsers($adresses)
    {
        $users = [
            // Créateurs
            [
                'prenom' => 'Marie',
                'nom' => 'Dubois',
                'email' => 'marie.dubois@fashion.com',
                'password' => Hash::make('password'),
                'telephone' => '+33123456789',
                'photo_profil' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1594736797933-d0c29c8a32c6?w=600&h=400&fit=crop'
                ],
                'bio' => 'Créatrice de mode spécialisée dans la haute couture et le prêt-à-porter de luxe.',
                'role' => 'CREATEUR',
                'adresse_id' => $adresses[0]->id,
                'est_verifie' => true,
                'est_actif' => true,
                'date_inscription' => now()->subDays(30),
            ],
            [
                'prenom' => 'Sophie',
                'nom' => 'Martin',
                'email' => 'sophie.martin@couture.com',
                'password' => Hash::make('password'),
                'telephone' => '+33123456790',
                'photo_profil' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop'
                ],
                'bio' => 'Designer spécialisée dans les robes de mariée et la couture sur mesure.',
                'role' => 'CREATEUR',
                'adresse_id' => $adresses[1]->id,
                'est_verifie' => true,
                'est_actif' => true,
                'date_inscription' => now()->subDays(25),
            ],
            // Ateliers
            [
                'prenom' => 'Jean',
                'nom' => 'Leroy',
                'email' => 'jean.leroy@atelier.com',
                'password' => Hash::make('password'),
                'telephone' => '+33123456791',
                'photo_profil' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'bio' => 'Maître artisan spécialisé dans la couture traditionnelle et la haute couture.',
                'role' => 'ATELIER',
                'adresse_id' => $adresses[2]->id,
                'est_verifie' => true,
                'est_actif' => true,
                'date_inscription' => now()->subDays(20),
            ],
            [
                'prenom' => 'Pierre',
                'nom' => 'Moreau',
                'email' => 'pierre.moreau@couture.com',
                'password' => Hash::make('password'),
                'telephone' => '+33123456792',
                'photo_profil' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'bio' => 'Atelier de couture familiale depuis 3 générations, spécialisé dans le sur-mesure.',
                'role' => 'ATELIER',
                'adresse_id' => $adresses[3]->id,
                'est_verifie' => true,
                'est_actif' => true,
                'date_inscription' => now()->subDays(15),
            ]
        ];

        return collect($users)->map(function ($userData) {
            return User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        });
    }

    private function createProfilsCreateurs($users)
    {
        $createurs = $users->where('role', 'CREATEUR')->values();
        
        $profils = [
            [
                'utilisateur_id' => $createurs[0]->id,
                'nom_marque' => 'Marie Dubois Couture',
                'photo_profil' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop'
                ],
                'logo_marque' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'style' => 'LUXE',
                'site_web' => 'https://mariedubois-couture.com',
                'instagram' => '@mariedubois_couture',
                'experience' => 'EXPERT',
                'secteur' => 'HAUTE_COUTURE',
            ],
            [
                'utilisateur_id' => $createurs[1]->id,
                'nom_marque' => 'Sophie Martin Bridal',
                'photo_profil' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop'
                ],
                'logo_marque' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'style' => 'CLASSIQUE',
                'site_web' => 'https://sophiemartin-bridal.com',
                'instagram' => '@sophiemartin_bridal',
                'experience' => 'INTERMEDIAIRE',
                'secteur' => 'MARIAGE',
            ]
        ];

        return collect($profils)->map(function ($profil) {
            return ProfilCreateur::firstOrCreate(
                ['utilisateur_id' => $profil['utilisateur_id']],
                $profil
            );
        });
    }

    private function createProfilsAteliers($users)
    {
        $ateliers = $users->where('role', 'ATELIER')->values();
        
        $profils = [
            [
                'utilisateur_id' => $ateliers[0]->id,
                'nom_atelier' => 'Atelier Leroy',
                'photo_profil' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop'
                ],
                'logo_atelier' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'images_equipements' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'description_entreprise' => 'Atelier de couture traditionnelle avec plus de 30 ans d\'expérience.',
                'equipements' => ['Machine à coudre industrielle', 'Surjeteuse', 'Presse à repasser'],
                'capacite_production_mensuelle' => 50,
                'delai_livraison_moyen_jours' => 14,
                'tarif_horaire_moyen' => 45.00,
            ],
            [
                'utilisateur_id' => $ateliers[1]->id,
                'nom_atelier' => 'Couture Moreau & Fils',
                'photo_profil' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                'photo_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop'
                ],
                'logo_atelier' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'images_equipements' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'description_entreprise' => 'Atelier familial spécialisé dans le sur-mesure et la réparation.',
                'equipements' => ['Machine à coudre', 'Surjeteuse', 'Ciseaux professionnels'],
                'capacite_production_mensuelle' => 30,
                'delai_livraison_moyen_jours' => 10,
                'tarif_horaire_moyen' => 35.00,
            ]
        ];

        return collect($profils)->map(function ($profil) {
            return ProfilAtelier::firstOrCreate(
                ['utilisateur_id' => $profil['utilisateur_id']],
                $profil
            );
        });
    }

    private function createCompetences()
    {
        $competences = [
            ['nom' => 'Couture à la main', 'categorie' => 'TECHNIQUE', 'description' => 'Techniques de couture traditionnelle à la main'],
            ['nom' => 'Couture machine', 'categorie' => 'TECHNIQUE', 'description' => 'Maîtrise des machines à coudre industrielles'],
            ['nom' => 'Surfilage', 'categorie' => 'FINITION', 'description' => 'Techniques de surfilage et finitions'],
            ['nom' => 'Pose de fermetures', 'categorie' => 'ASSEMBLAGE', 'description' => 'Installation de zips, boutons, pressions'],
            ['nom' => 'Repassage professionnel', 'categorie' => 'FINITION', 'description' => 'Techniques de repassage haute couture'],
            ['nom' => 'Patronage', 'categorie' => 'CONCEPTION', 'description' => 'Création et modification de patrons'],
            ['nom' => 'Haute couture', 'categorie' => 'SPECIALISE', 'description' => 'Techniques de haute couture traditionnelle'],
            ['nom' => 'Broderie', 'categorie' => 'DECORATION', 'description' => 'Techniques de broderie main et machine'],
        ];

        return collect($competences)->map(function ($competence) {
            return Competence::firstOrCreate(
                ['nom' => $competence['nom']],
                $competence
            );
        });
    }

    private function createMateriaux()
    {
        $materiaux = [
            ['nom' => 'Soie', 'type' => 'TISSUS', 'description' => 'Tissu de soie naturelle', 'image_url' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'difficulte' => 'DIFFICILE'],
            ['nom' => 'Coton', 'type' => 'TISSUS', 'description' => 'Tissu de coton 100%', 'image_url' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', 'difficulte' => 'FACILE'],
            ['nom' => 'Laine', 'type' => 'TISSUS', 'description' => 'Tissu de laine cardée', 'image_url' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop', 'difficulte' => 'MOYEN'],
            ['nom' => 'Lin', 'type' => 'TISSUS', 'description' => 'Tissu de lin naturel', 'image_url' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'difficulte' => 'FACILE'],
            ['nom' => 'Velours', 'type' => 'TISSUS', 'description' => 'Tissu velours de qualité', 'image_url' => 'https://images.unsplash.com/photo-1594736797933-d0c29c8a32c6?w=400&h=400&fit=crop', 'difficulte' => 'DIFFICILE'],
            ['nom' => 'Dentelle', 'type' => 'DECORATION', 'description' => 'Dentelle française', 'image_url' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop', 'difficulte' => 'DIFFICILE'],
            ['nom' => 'Tulle', 'type' => 'TISSUS', 'description' => 'Tulle pour robes de mariée', 'image_url' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'difficulte' => 'MOYEN'],
            ['nom' => 'Satin', 'type' => 'TISSUS', 'description' => 'Satin de soie', 'image_url' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', 'difficulte' => 'DIFFICILE'],
        ];

        return collect($materiaux)->map(function ($materiau) {
            return Materiau::firstOrCreate(
                ['nom' => $materiau['nom']],
                $materiau
            );
        });
    }

    private function createCategoriesServices()
    {
        $categories = [
            ['nom' => 'Haute Couture', 'description' => 'Créations sur mesure de haute couture'],
            ['nom' => 'Prêt-à-porter', 'description' => 'Vêtements prêts à porter'],
            ['nom' => 'Mariage', 'description' => 'Robes de mariée et accessoires'],
            ['nom' => 'Accessoires', 'description' => 'Sac, chaussures, bijoux'],
            ['nom' => 'Réparation', 'description' => 'Réparation et retouches'],
            ['nom' => 'Modification', 'description' => 'Modification de vêtements existants'],
        ];

        return collect($categories)->map(function ($categorie) {
            return CategorieService::create($categorie);
        });
    }

    private function createPortfolios($ateliers)
    {
        $ateliers = $ateliers->values();
        $portfolios = [
            [
                'nom' => 'Collection Haute Couture 2024',
                'description' => 'Notre dernière collection de haute couture',
                'image_principale' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                'image_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop'
                ],
                'logo_atelier' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'est_public' => true,
                'date_creation' => now()->subDays(10),
                'atelier_id' => $ateliers[0]->id,
            ],
            [
                'nom' => 'Créations Sur Mesure',
                'description' => 'Nos créations sur mesure personnalisées',
                'image_principale' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                'image_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop'
                ],
                'logo_atelier' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'est_public' => true,
                'date_creation' => now()->subDays(5),
                'atelier_id' => $ateliers[1]->id,
            ]
        ];

        return collect($portfolios)->map(function ($portfolio) {
            return Portfolio::create($portfolio);
        });
    }

    private function createItemPortfolios($portfolios)
    {
        $items = [
            [
                'titre' => 'Robe de Soirée Haute Couture',
                'description' => 'Robe de soirée en soie avec broderies main',
                'images_urls' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop'
                ],
                'competences_demonstrees' => ['Couture à la main', 'Broderie', 'Haute couture'],
                'date_realisation' => now()->subDays(15),
                'type_projet' => 'HAUTE_COUTURE',
                'budget_realise' => 2500.00,
                'delai_realisation_jours' => 21,
                'portfolio_id' => $portfolios[0]->id,
            ],
            [
                'titre' => 'Costume Sur Mesure',
                'description' => 'Costume trois pièces en laine',
                'images_urls' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop'
                ],
                'competences_demonstrees' => ['Couture machine', 'Patronage', 'Repassage professionnel'],
                'date_realisation' => now()->subDays(8),
                'type_projet' => 'SUR_MESURE',
                'budget_realise' => 1200.00,
                'delai_realisation_jours' => 14,
                'portfolio_id' => $portfolios[1]->id,
            ]
        ];

        return collect($items)->map(function ($item) {
            return ItemPortfolio::create($item);
        });
    }

    private function createProjets($createurs)
    {
        $createurs = $createurs->values();
        
        // Vérifier qu'on a au moins un créateur
        if ($createurs->isEmpty()) {
            $this->command->warn('Aucun créateur trouvé, création d\'un projet par défaut...');
            return collect();
        }
        
        $projets = [
            [
                'titre' => 'Robe de Mariée Princesse',
                'description' => 'Création d\'une robe de mariée style princesse avec traîne',
                'image_principale' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                'galerie_images' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop'
                ],
                'image_couverture' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'images_avant_apres' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'date_creation' => now()->subDays(20),
                'date_limite' => now()->addDays(30),
                'date_debut_souhaitee' => now()->addDays(5),
                'budget_estime' => 3000.00,
                'quantite' => 1,
                'complexite' => 'COMPLEXE',
                'confidentialite' => 'PUBLIC',
                'statut' => 'PUBLIE',
                'createur_id' => $createurs[0]->id,
            ]
        ];

        // Pour l'instant, créons seulement un projet pour éviter les problèmes de clés étrangères

        return collect($projets)->map(function ($projet) {
            return Projet::firstOrCreate(
                ['titre' => $projet['titre'], 'createur_id' => $projet['createur_id']],
                $projet
            );
        });
    }

    private function createCahiersCharges($projets)
    {
        $cahiers = [
            [
                'titre' => 'Cahier des charges - Robe de Mariée',
                'description' => 'Spécifications détaillées pour la robe de mariée princesse',
                'exigences_techniques' => 'Couture main, broderies, finitions parfaites',
                'materiaux_souhaites' => 'Soie, dentelle, tulle',
                'contraintes' => 'Respecter les traditions familiales',
                'budget_max' => 3500.00,
                'delai_souhaite' => now()->addDays(30),
                'projet_id' => $projets[0]->id,
            ],
            [
                'titre' => 'Cahier des charges - Costume de Gala',
                'description' => 'Spécifications pour le costume de gala',
                'exigences_techniques' => 'Couture machine, finitions professionnelles',
                'materiaux_souhaites' => 'Laine, soie pour doublure',
                'contraintes' => 'Confort et élégance',
                'budget_max' => 1800.00,
                'delai_souhaite' => now()->addDays(20),
                'projet_id' => $projets[1]->id,
            ]
        ];

        return collect($cahiers)->map(function ($cahier) {
            return CahierDesCharges::create($cahier);
        });
    }

    private function createDevis($projets, $ateliers)
    {
        $devis = [
            [
                'projet_id' => $projets[0]->id,
                'atelier_id' => $ateliers[0]->id,
                'montant' => 3200.00,
                'delai_jours' => 25,
                'image_devis' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                'images_produits' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop'
                ],
                'images_maquettes' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop'
                ],
                'images_materiaux' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'statut' => 'EN_ATTENTE',
                'date_creation' => now()->subDays(5),
                'date_validite' => now()->addDays(15),
            ],
            [
                'projet_id' => $projets[1]->id,
                'atelier_id' => $ateliers[1]->id,
                'montant' => 1400.00,
                'delai_jours' => 18,
                'image_devis' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                'images_produits' => [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop'
                ],
                'images_maquettes' => [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'images_materiaux' => [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop'
                ],
                'statut' => 'ACCEPTE',
                'date_creation' => now()->subDays(3),
                'date_validite' => now()->addDays(12),
            ]
        ];

        return collect($devis)->map(function ($devi) {
            return Devis::create($devi);
        });
    }

    private function createCommandes($projets, $ateliers)
    {
        $commandes = [
            [
                'projet_id' => $projets[1]->id,
                'atelier_id' => $ateliers[1]->id,
                'reference' => 'CMD-' . strtoupper(uniqid()),
                'montant_final' => 1400.00,
                'image_commande' => 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                'images_produits' => [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop'
                ],
                'images_avant_apres' => [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop'
                ],
                'images_livraison' => [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop'
                ],
                'statut' => 'EN_COURS',
                'date_creation' => now()->subDays(2),
                'date_livraison_prevue' => now()->addDays(16),
            ]
        ];

        return collect($commandes)->map(function ($commande) {
            return Commande::create($commande);
        });
    }

    private function createConversations($users)
    {
        $conversations = [
            [
                'titre' => 'Discussion Robe de Mariée',
                'description' => 'Échange sur les détails de la robe de mariée',
                'est_archive' => false,
                'date_derniere_activite' => now()->subHours(2),
            ],
            [
                'titre' => 'Négociation Costume de Gala',
                'description' => 'Discussion sur le costume de gala',
                'est_archive' => false,
                'date_derniere_activite' => now()->subHours(5),
            ]
        ];

        return collect($conversations)->map(function ($conversation) {
            return Conversation::create($conversation);
        });
    }
}
