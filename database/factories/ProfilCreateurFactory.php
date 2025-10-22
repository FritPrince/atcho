<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProfilCreateur>
 */
class ProfilCreateurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'specialites' => $this->faker->randomElements([
                'Couture sur-mesure', 'Retouches', 'Création de costumes',
                'Accessoires', 'Décoration textile', 'Broderie',
            ], $this->faker->numberBetween(1, 4)),
            'annees_experience' => $this->faker->numberBetween(0, 30),
            'description_professionnelle' => $this->faker->paragraphs(2, true),
            'site_web' => $this->faker->optional(0.3)->url(),
            'reseaux_sociaux' => [
                'instagram' => $this->faker->optional(0.4)->userName(),
                'facebook' => $this->faker->optional(0.3)->userName(),
                'tiktok' => $this->faker->optional(0.2)->userName(),
            ],
            'tarif_horaire_min' => $this->faker->randomFloat(2, 15, 50),
            'tarif_horaire_max' => $this->faker->randomFloat(2, 50, 150),
            'disponibilites' => $this->faker->randomElements([
                'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche',
            ], $this->faker->numberBetween(3, 7)),
            'rayon_intervention' => $this->faker->numberBetween(5, 100),
            'est_verifie' => $this->faker->boolean(70),
            'note_moyenne' => $this->faker->randomFloat(1, 3.0, 5.0),
            'nombre_avis' => $this->faker->numberBetween(0, 50),
        ];
    }
}
