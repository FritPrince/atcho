<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Devis>
 */
class DevisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'montant' => $this->faker->randomFloat(2, 50, 5000),
            'delai_jours' => $this->faker->numberBetween(1, 90),
            'description_travaux' => $this->faker->paragraphs(2, true),
            'conditions_paiement' => $this->faker->randomElement([
                'Acompte 30% + solde à la livraison',
                'Paiement intégral à la commande',
                'Paiement en 3 fois',
                'Paiement à la livraison',
            ]),
            'garantie_mois' => $this->faker->numberBetween(0, 24),
            'statut' => $this->faker->randomElement(['EN_ATTENTE', 'ACCEPTE', 'REFUSE', 'EXPIRED']),
            'date_creation' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'date_expiration' => $this->faker->dateTimeBetween('now', '+1 month'),
            'notes_supplementaires' => $this->faker->optional(0.4)->paragraph(),
        ];
    }
}
