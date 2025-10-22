<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competence>
 */
class CompetenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $competences = [
            'Broderie', 'Tissage', 'Teinture', 'Couture', 'Coupe', 'Finition',
            'Pose de fermetures', 'Ourlet', 'Retouches', 'Sur-mesure',
            'Prêt-à-porter', 'Accessoires', 'Chaussures', 'Maroquinerie',
        ];

        $categories = ['Confection', 'Finition', 'Décoration', 'Accessoires'];

        return [
            'nom' => $this->faker->randomElement($competences),
            'categorie' => $this->faker->randomElement($categories),
            'description' => $this->faker->sentence(10),
            'icone' => $this->faker->optional(0.7)->randomElement(['✂️', '🧵', '📐', '🎨', '👗', '👠']),
            'est_active' => $this->faker->boolean(90),
        ];
    }
}
