<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CahierDesCharges>
 */
class CahierDesChargesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(4),
            'description_detaille' => $this->faker->paragraphs(3, true),
            'specifications_techniques' => [
                'dimensions' => $this->faker->randomElement(['S', 'M', 'L', 'XL', 'Sur-mesure']),
                'couleur_principale' => $this->faker->colorName(),
                'style' => $this->faker->randomElement(['Classique', 'Moderne', 'Vintage', 'Casual', 'Formel']),
                'saison' => $this->faker->randomElement(['Printemps', 'Été', 'Automne', 'Hiver', 'Toutes saisons']),
            ],
            'materiaux_requis' => [
                'tissu_principal' => $this->faker->randomElement(['Coton', 'Laine', 'Soie', 'Lin', 'Denim']),
                'couleur_tissu' => $this->faker->colorName(),
                'quantite_metres' => $this->faker->numberBetween(1, 10),
                'accessoires' => $this->faker->randomElements(['Boutons', 'Fermeture éclair', 'Fil', 'Doublure'], $this->faker->numberBetween(1, 3)),
            ],
            'contraintes' => [
                'delai_maximum' => $this->faker->numberBetween(7, 90).' jours',
                'budget_maximum' => $this->faker->randomFloat(2, 100, 2000),
                'livraison' => $this->faker->randomElement(['À domicile', 'Point relais', 'Atelier']),
                'essayages' => $this->faker->numberBetween(1, 3),
            ],
            'notes_supplementaires' => $this->faker->optional(0.6)->paragraph(),
        ];
    }
}
