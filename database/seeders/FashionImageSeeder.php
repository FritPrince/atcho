<?php

namespace Database\Seeders;

use App\Models\ProfilCreateur;
use App\Models\ProfilAtelier;
use App\Models\Projet;
use App\Models\Portfolio;
use App\Models\Materiau;
use Illuminate\Database\Seeder;

class FashionImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🎨 Mise à jour des images de mode...');

        // Images spécialisées pour la mode
        $fashionImages = [
            // Images de créateurs et modèles
            'creators' => [
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
            ],
            
            // Images de mode et couture
            'fashion' => [
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop',
            ],
            
            // Images d'ateliers et équipements
            'workshops' => [
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=400&fit=crop',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=400&fit=crop',
                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
            ],
            
            // Images de tissus et matériaux
            'fabrics' => [
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
            ],
            
            // Images de projets de mode
            'projects' => [
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
            ],
            
            // Images de logos et marques
            'logos' => [
                'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop',
                'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop',
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
            ]
        ];

        // Mettre à jour les profils créateurs avec de nouvelles images
        $this->updateProfilCreateurs($fashionImages);
        
        // Mettre à jour les profils ateliers
        $this->updateProfilAteliers($fashionImages);
        
        // Mettre à jour les projets
        $this->updateProjets($fashionImages);
        
        // Mettre à jour les portfolios
        $this->updatePortfolios($fashionImages);
        
        // Mettre à jour les matériaux
        $this->updateMateriaux($fashionImages);

        $this->command->info('✨ Images de mode mises à jour avec succès !');
    }

    private function updateProfilCreateurs($images)
    {
        $profils = ProfilCreateur::all();
        
        foreach ($profils as $index => $profil) {
            $profil->update([
                'photo_profil' => $images['creators'][$index % count($images['creators'])],
                'photo_couverture' => $images['workshops'][$index % count($images['workshops'])],
                'galerie_images' => array_slice($images['fashion'], 0, 5),
                'logo_marque' => $images['logos'][$index % count($images['logos'])],
            ]);
        }
    }

    private function updateProfilAteliers($images)
    {
        $ateliers = ProfilAtelier::all();
        
        foreach ($ateliers as $index => $atelier) {
            $atelier->update([
                'photo_profil' => $images['creators'][$index % count($images['creators'])],
                'photo_couverture' => $images['workshops'][$index % count($images['workshops'])],
                'galerie_images' => array_slice($images['fashion'], 0, 4),
                'logo_atelier' => $images['logos'][$index % count($images['logos'])],
                'images_equipements' => array_slice($images['workshops'], 0, 3),
            ]);
        }
    }

    private function updateProjets($images)
    {
        $projets = Projet::all();
        
        foreach ($projets as $index => $projet) {
            $projet->update([
                'image_principale' => $images['projects'][$index % count($images['projects'])],
                'image_couverture' => $images['workshops'][$index % count($images['workshops'])],
                'galerie_images' => array_slice($images['projects'], 0, 4),
                'images_avant_apres' => array_slice($images['fashion'], 0, 3),
            ]);
        }
    }

    private function updatePortfolios($images)
    {
        $portfolios = Portfolio::all();
        
        foreach ($portfolios as $index => $portfolio) {
            $portfolio->update([
                'image_principale' => $images['projects'][$index % count($images['projects'])],
                'image_couverture' => $images['workshops'][$index % count($images['workshops'])],
                'galerie_images' => array_slice($images['projects'], 0, 5),
                'logo_atelier' => $images['logos'][$index % count($images['logos'])],
            ]);
        }
    }

    private function updateMateriaux($images)
    {
        $materiaux = Materiau::all();
        
        foreach ($materiaux as $index => $materiau) {
            $materiau->update([
                'image_url' => $images['fabrics'][$index % count($images['fabrics'])],
            ]);
        }
    }
}
