<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Avis>
 */
class AvisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'note' => $this->faker->numberBetween(1, 5),
            'commentaire' => $this->faker->optional(0.8)->paragraphs($this->faker->numberBetween(1, 3), true),
            'date_creation' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'est_public' => $this->faker->boolean(90),
            'reponse_atelier' => $this->faker->optional(0.3)->paragraph(),
            'date_reponse' => $this->faker->optional(0.3)->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
