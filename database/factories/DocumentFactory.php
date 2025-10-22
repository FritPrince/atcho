<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['IMAGE', 'PDF', 'DOCUMENT', 'PATRON', 'REFERENCE'];
        $extensions = ['jpg', 'png', 'pdf', 'doc', 'docx', 'ai', 'psd'];

        return [
            'nom_fichier' => $this->faker->word().'.'.$this->faker->randomElement($extensions),
            'chemin_fichier' => 'documents/'.$this->faker->uuid().'.'.$this->faker->randomElement($extensions),
            'type_mime' => $this->faker->randomElement([
                'image/jpeg', 'image/png', 'application/pdf', 'application/msword',
            ]),
            'taille_fichier' => $this->faker->numberBetween(1024, 10485760), // 1KB à 10MB
            'type' => $this->faker->randomElement($types),
            'description' => $this->faker->optional(0.7)->sentence(),
            'est_public' => $this->faker->boolean(70),
            'date_upload' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
