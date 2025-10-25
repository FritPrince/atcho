<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = [
            'site_name' => config('app.name'),
            'site_description' => 'Plateforme de gestion des créateurs et ateliers',
            'maintenance_mode' => false,
            'registration_enabled' => true,
            'email_verification_required' => true,
        ];

        return Inertia::render('admin/setting/index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string',
            'maintenance_mode' => 'boolean',
            'registration_enabled' => 'boolean',
            'email_verification_required' => 'boolean',
        ]);

        // Ici, vous pourriez sauvegarder les paramètres dans la base de données
        // ou dans un fichier de configuration

        return redirect()->route('admin.settings.index')
            ->with('success', 'Paramètres mis à jour avec succès.');
    }
}


