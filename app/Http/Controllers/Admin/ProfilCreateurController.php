<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilCreateur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilCreateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profilsCreateurs = ProfilCreateur::with(['utilisateur'])
            ->whereNotNull('utilisateur_id')
            ->paginate(15);

        return Inertia::render('admin/profil-createur/index', [
            'profilsCreateurs' => $profilsCreateurs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/profil-createur/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:users,id',
            'nom_marque' => 'required|string|max:255',
            'style' => 'required|string',
            'site_web' => 'nullable|url',
            'instagram' => 'nullable|string',
            'experience' => 'required|string',
            'secteur' => 'required|string',
        ]);

        $profilCreateur = ProfilCreateur::create($validated);

        return redirect()->route('admin.profils-createurs.show', $profilCreateur)
            ->with('success', 'Profil créateur créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfilCreateur $profilCreateur)
    {
        $profilCreateur->load(['utilisateur']);

        return Inertia::render('admin/profil-createur/show', [
            'profilCreateur' => $profilCreateur,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProfilCreateur $profilCreateur)
    {
        return Inertia::render('admin/profil-createur/edit', [
            'profilCreateur' => $profilCreateur,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProfilCreateur $profilCreateur)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:users,id',
            'nom_marque' => 'required|string|max:255',
            'style' => 'required|string',
            'site_web' => 'nullable|url',
            'instagram' => 'nullable|string',
            'experience' => 'required|string',
            'secteur' => 'required|string',
        ]);

        $profilCreateur->update($validated);

        return redirect()->route('admin.profils-createurs.show', $profilCreateur)
            ->with('success', 'Profil créateur mis à jour avec succès.');
    }

    /**
     * Update profil createur status.
     */
    public function updateStatus(Request $request, ProfilCreateur $profilCreateur)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,APPROVED,REJECTED',
        ]);

        $profilCreateur->update($validated);

        return redirect()->route('admin.profils-createurs.show', $profilCreateur)
            ->with('success', 'Statut du profil créateur mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfilCreateur $profilCreateur)
    {
        $profilCreateur->delete();

        return redirect()->route('admin.profils-createurs.index')
            ->with('success', 'Profil créateur supprimé avec succès.');
    }
}
