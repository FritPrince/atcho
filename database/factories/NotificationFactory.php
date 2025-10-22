<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            'NOUVEAU_DEVIS', 'DEVIS_ACCEPTE', 'DEVIS_REFUSE', 'COMMANDE_CONFIRMEE',
            'COMMANDE_LIVREE', 'NOUVEAU_MESSAGE', 'RENDEZ_VOUS', 'AVIS_RECU',
            'PROJET_PUBLIE', 'SYSTEME',
        ];

        return [
            'titre' => $this->faker->sentence(4),
            'message' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement($types),
            'est_lue' => $this->faker->boolean(60),
            'date_creation' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'date_lecture' => $this->faker->optional(0.6)->dateTimeBetween('-1 week', 'now'),
            'donnees_supplementaires' => $this->faker->optional(0.3)->randomElements([
                'projet_id', 'devis_id', 'commande_id', 'conversation_id',
            ], $this->faker->numberBetween(1, 2)),
        ];
    }
}
