<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Adresse>
 */
class AdresseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ligne1' => $this->faker->streetAddress(),
            'ligne2' => $this->faker->optional(0.3)->secondaryAddress(),
            'code_postal' => $this->faker->postcode(),
            'ville' => $this->faker->city(),
            'pays' => 'France',
            'region' => $this->faker->optional(0.8)->state(),
            'latitude' => $this->faker->latitude(41.0, 51.0), // France
            'longitude' => $this->faker->longitude(-5.0, 9.0), // France
        ];
    }
}
