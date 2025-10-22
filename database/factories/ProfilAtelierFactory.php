<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfilAtelier>
 */
class ProfilAtelierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $typesEntreprise = ['INDIVIDUEL', 'SARL', 'SA', 'AUTO_ENTREPRENEUR'];

        return [
            'utilisateur_id' => \App\Models\User::factory(),
            'nom_atelier' => $this->faker->company().' Atelier',
            'description_entreprise' => $this->faker->paragraph(3),
            'annee_creation' => $this->faker->numberBetween(1990, 2023),
            'type_entreprise' => $this->faker->randomElement($typesEntreprise),
            'numero_siret' => $this->faker->optional(0.8)->numerify('##############'),
            'taille_equipe' => $this->faker->numberBetween(1, 20),
            'tarif_horaire_moyen' => $this->faker->randomFloat(2, 15, 80),
            'delai_livraison_moyen_jours' => $this->faker->numberBetween(1, 30),
            'capacite_production_mensuelle' => $this->faker->numberBetween(10, 500),
            'note_moyenne' => $this->faker->randomFloat(1, 3, 5),
            'nombre_projets_realises' => $this->faker->numberBetween(0, 100),
            'equipements' => $this->faker->randomElements([
                'Machine à coudre', 'Surjeteuse', 'Presse à repasser', 'Ciseaux professionnels',
                'Mètre ruban', 'Épingles', 'Fils', 'Boutons', 'Fermetures éclair',
            ], $this->faker->numberBetween(3, 8)),
            'accepte_urgences' => $this->faker->boolean(30),
            'rayon_intervention_km' => $this->faker->numberBetween(10, 200),
        ];
    }
}
