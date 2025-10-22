<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
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
        $this->configureViews();
        $this->configureRateLimiting();
        $this->configureRedirects();
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    /**
     * Configure redirects based on user roles.
     */
    private function configureRedirects(): void
    {
        Fortify::redirects('login', function (Request $request) {
            $user = $request->user();
            
            if (!$user) {
                return '/dashboard';
            }

            // Redirection basée sur le rôle
            return match ($user->role) {
                'ADMIN' => '/admin',
                'CREATEUR' => '/createur/dashboard',
                'ATELIER' => '/atelier/dashboard',
                'PRESTATAIRE' => '/prestataire/dashboard',
                default => '/dashboard',
            };
        });

        Fortify::redirects('register', function (Request $request) {
            $user = $request->user();
            
            if (!$user) {
                return '/dashboard';
            }

            // Redirection basée sur le rôle après inscription
            return match ($user->role) {
                'ADMIN' => '/admin',
                'CREATEUR' => '/createur/dashboard',
                'ATELIER' => '/atelier/dashboard',
                'PRESTATAIRE' => '/prestataire/dashboard',
                default => '/dashboard',
            };
        });
    }
}
