<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SystemSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Simulation des paramètres système
        $settings = [
            'general' => [
                'site_name' => 'Atcho Platform',
                'site_description' => 'Plateforme de gestion des projets créatifs',
                'site_url' => 'https://atcho.com',
                'admin_email' => 'admin@atcho.com',
                'timezone' => 'Europe/Paris',
                'language' => 'fr',
            ],
            'email' => [
                'smtp_host' => 'smtp.gmail.com',
                'smtp_port' => 587,
                'smtp_username' => 'noreply@atcho.com',
                'smtp_encryption' => 'tls',
                'from_name' => 'Atcho Platform',
                'from_email' => 'noreply@atcho.com',
            ],
            'security' => [
                'password_min_length' => 8,
                'password_require_special' => true,
                'session_timeout' => 120,
                'max_login_attempts' => 5,
                'two_factor_enabled' => true,
            ],
            'notifications' => [
                'email_notifications' => true,
                'push_notifications' => true,
                'sms_notifications' => false,
                'notification_frequency' => 'immediate',
            ],
            'storage' => [
                'max_file_size' => 10485760, // 10MB
                'allowed_file_types' => ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
                'storage_driver' => 'local',
                'backup_enabled' => true,
            ],
            'api' => [
                'rate_limit' => 1000,
                'api_key_expiry' => 365,
                'webhook_enabled' => true,
                'cors_enabled' => true,
            ]
        ];

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/settings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|in:general,email,security,notifications,storage,api',
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'description' => 'nullable|string',
        ]);

        // Simulation de sauvegarde des paramètres
        return redirect()->route('admin.settings.index')
            ->with('success', 'Paramètre créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Simulation d'un paramètre spécifique
        $setting = [
            'id' => $id,
            'category' => 'general',
            'key' => 'site_name',
            'value' => 'Atcho Platform',
            'description' => 'Nom du site web',
            'created_at' => now()->subDays(30)->toISOString(),
            'updated_at' => now()->subDays(5)->toISOString(),
        ];

        return Inertia::render('admin/settings/show', [
            'setting' => $setting,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Simulation d'un paramètre pour édition
        $setting = [
            'id' => $id,
            'category' => 'general',
            'key' => 'site_name',
            'value' => 'Atcho Platform',
            'description' => 'Nom du site web',
            'created_at' => now()->subDays(30)->toISOString(),
            'updated_at' => now()->subDays(5)->toISOString(),
        ];

        return Inertia::render('admin/settings/edit', [
            'setting' => $setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'category' => 'required|string|in:general,email,security,notifications,storage,api',
            'key' => 'required|string|max:255',
            'value' => 'required|string',
            'description' => 'nullable|string',
        ]);

        // Simulation de mise à jour des paramètres
        return redirect()->route('admin.settings.show', $id)
            ->with('success', 'Paramètre mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Simulation de suppression des paramètres
        return redirect()->route('admin.settings.index')
            ->with('success', 'Paramètre supprimé avec succès.');
    }
}
