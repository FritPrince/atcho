<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prenom' => fake()->firstName(),
            'nom' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= 'password',
            'remember_token' => Str::random(10),
            'telephone' => fake()->optional(0.8)->phoneNumber(),
            'photo_profil' => fake()->optional(0.3)->imageUrl(200, 200, 'people'),
            'bio' => fake()->optional(0.7)->paragraph(),
            'role' => fake()->randomElement(['CREATEUR', 'ATELIER', 'PRESTATAIRE', 'ADMIN']),
            'est_verifie' => fake()->boolean(80),
            'est_actif' => fake()->boolean(95),
            'preferences_notifications' => [
                'email' => fake()->boolean(70),
                'sms' => fake()->boolean(30),
                'push' => fake()->boolean(60),
            ],
            'date_inscription' => fake()->dateTimeBetween('-2 years', 'now'),
            'two_factor_secret' => fake()->optional(0.2)->randomAscii(),
            'two_factor_recovery_codes' => fake()->optional(0.2)->randomAscii(),
            'two_factor_confirmed_at' => fake()->optional(0.2)->dateTime(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model does not have two-factor authentication configured.
     */
    public function withoutTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => [
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);
    }
}
