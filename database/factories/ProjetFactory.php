<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projet>
 */
class ProjetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => fake()->sentence(3),
            'description' => fake()->paragraphs(3, true),
            'date_creation' => fake()->dateTimeBetween('-1 year', 'now'),
            'date_limite' => fake()->dateTimeBetween('now', '+6 months'),
            'date_debut_souhaitee' => fake()->dateTimeBetween('now', '+1 month'),
            'budget_estime' => fake()->randomFloat(2, 100, 10000),
            'quantite' => fake()->numberBetween(1, 100),
            'complexite' => fake()->randomElement(['SIMPLE', 'MOYEN', 'COMPLEXE']),
            'confidentialite' => fake()->randomElement(['PUBLIC', 'PRIVE', 'CONFIDENTIEL']),
            'statut' => fake()->randomElement(['BROUILLON', 'PUBLIE', 'EN_NEGOCIATION', 'EN_COURS', 'TERMINE', 'ANNULE']),
        ];
    }
}
