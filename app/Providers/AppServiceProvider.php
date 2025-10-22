<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Partager les données avec Inertia
        Inertia::share([
            'auth' => function () {
                $user = Auth::user();
                return [
                    'user' => $user ? [
                        'id' => $user->id,
                        'name' => $user->name, // Utilise l'accessor getNameAttribute()
                        'email' => $user->email,
                        'avatar' => $user->photo_profil, // Utilise le bon nom de champ
                        'role' => $user->role,
                        'email_verified_at' => $user->email_verified_at,
                        'two_factor_enabled' => $user->two_factor_confirmed_at !== null,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ] : null,
                ];
            },
            'sidebarOpen' => true, // Sidebar ouvert par défaut
        ]);
    }
}
