<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilAtelier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilAtelierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profilsAteliers = ProfilAtelier::with(['utilisateur'])
            ->paginate(15);

        return Inertia::render('admin/profil-atelier/index', [
            'profilsAteliers' => $profilsAteliers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/profil-atelier/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'nom_atelier' => 'required|string|max:255',
            'description' => 'required|string',
            'statut' => 'required|in:PENDING,APPROVED,REJECTED',
        ]);

        $profilAtelier = ProfilAtelier::create($validated);

        return redirect()->route('admin.profils-ateliers.show', $profilAtelier)
            ->with('success', 'Profil atelier créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfilAtelier $profilAtelier)
    {
        $profilAtelier->load(['utilisateur']);

        return Inertia::render('admin/profil-atelier/show', [
            'profilAtelier' => $profilAtelier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProfilAtelier $profilAtelier)
    {
        return Inertia::render('admin/profil-atelier/edit', [
            'profilAtelier' => $profilAtelier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProfilAtelier $profilAtelier)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'nom_atelier' => 'required|string|max:255',
            'description' => 'required|string',
            'statut' => 'required|in:PENDING,APPROVED,REJECTED',
        ]);

        $profilAtelier->update($validated);

        return redirect()->route('admin.profils-ateliers.show', $profilAtelier)
            ->with('success', 'Profil atelier mis à jour avec succès.');
    }

    /**
     * Update profil atelier status.
     */
    public function updateStatus(Request $request, ProfilAtelier $profilAtelier)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,APPROVED,REJECTED',
        ]);

        $profilAtelier->update($validated);

        return redirect()->route('admin.profils-ateliers.show', $profilAtelier)
            ->with('success', 'Statut du profil atelier mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProfilAtelier $profilAtelier)
    {
        $profilAtelier->delete();

        return redirect()->route('admin.profils-ateliers.index')
            ->with('success', 'Profil atelier supprimé avec succès.');
    }
}
