<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Materiau>
 */
class MateriauFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $materiaux = [
            'Coton', 'Laine', 'Soie', 'Lin', 'Polyester', 'Viscose', 'Denim',
            'Cuir', 'Suede', 'Fourrure', 'Tissu technique', 'Organza', 'Chiffon',
            'Velours', 'Jersey', 'Tweed', 'Satin', 'Crêpe', 'Gabardine',
        ];

        $couleurs = [
            'Blanc', 'Noir', 'Rouge', 'Bleu', 'Vert', 'Jaune', 'Rose', 'Violet',
            'Orange', 'Marron', 'Gris', 'Beige', 'Multicolore',
        ];

        return [
            'nom' => $this->faker->randomElement($materiaux),
            'couleur' => $this->faker->randomElement($couleurs),
            'type' => $this->faker->randomElement(['Tissu', 'Fil', 'Accessoire', 'Autre']),
            'description' => $this->faker->sentence(8),
            'prix_unitaire' => $this->faker->randomFloat(2, 5, 200),
            'unite_mesure' => $this->faker->randomElement(['mètre', 'm²', 'kg', 'pièce']),
            'est_disponible' => $this->faker->boolean(85),
            'stock_quantite' => $this->faker->numberBetween(0, 1000),
        ];
    }
}
