<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contenu' => $this->faker->paragraphs($this->faker->numberBetween(1, 3), true),
            'type' => $this->faker->randomElement(['TEXTE', 'IMAGE', 'FICHIER', 'SYSTEME']),
            'est_lu' => $this->faker->boolean(70),
            'date_envoi' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'fichier_joint' => $this->faker->optional(0.2)->filePath(),
            'taille_fichier' => $this->faker->optional(0.2)->numberBetween(1024, 10485760), // 1KB à 10MB
        ];
    }
}
