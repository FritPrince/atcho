<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CategorieService>
 */
class CategorieServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Confection sur-mesure', 'Retouches et réparations', 'Couture créative',
            'Accessoires personnalisés', 'Décoration textile', 'Restauration vintage',
            'Création de costumes', 'Maroquinerie', 'Broderie personnalisée',
        ];

        return [
            'nom' => $this->faker->randomElement($categories),
            'description' => $this->faker->paragraph(2),
            'icone' => $this->faker->randomElement(['✂️', '🧵', '👗', '👠', '🎨', '📐']),
            'est_active' => $this->faker->boolean(90),
            'ordre_affichage' => $this->faker->numberBetween(1, 100),
        ];
    }
}
