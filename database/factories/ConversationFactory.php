<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conversation>
 */
class ConversationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sujet' => $this->faker->optional(0.7)->sentence(4),
            'type' => $this->faker->randomElement(['PROJET', 'GENERAL', 'SUPPORT']),
            'est_archivee' => $this->faker->boolean(10),
            'date_creation' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'date_derniere_activite' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
