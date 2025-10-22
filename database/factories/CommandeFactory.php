<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reference' => 'CMD-'.strtoupper($this->faker->bothify('??####')),
            'montant_final' => $this->faker->randomFloat(2, 100, 10000),
            'statut' => $this->faker->randomElement([
                'EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EN_COURS', 'LIVREE', 'ANNULEE',
            ]),
            'date_commande' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'date_livraison_prevue' => $this->faker->dateTimeBetween('now', '+3 months'),
            'date_livraison_reelle' => $this->faker->optional(0.3)->dateTimeBetween('-1 month', 'now'),
            'adresse_livraison' => $this->faker->address(),
            'instructions_speciales' => $this->faker->optional(0.3)->paragraph(),
            'frais_livraison' => $this->faker->randomFloat(2, 0, 50),
            'remise_pourcentage' => $this->faker->optional(0.2)->randomFloat(1, 5, 20),
        ];
    }
}
