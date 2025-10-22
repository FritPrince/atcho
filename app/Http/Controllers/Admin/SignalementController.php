<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Signalement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SignalementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $signalements = Signalement::with(['signalant', 'signale'])
            ->paginate(15);

        return Inertia::render('admin/signalement/index', [
            'signalements' => $signalements,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/signalement/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'signalant_id' => 'required|exists:users,id',
            'signale_id' => 'required|exists:users,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'priorite' => 'required|in:faible,moyenne,haute,critique',
            'statut' => 'required|in:en_attente,en_cours,resolu,rejete',
            'date_signalement' => 'nullable|date',
        ]);

        $signalement = Signalement::create($validated);

        return redirect()->route('admin.signalements.show', $signalement)
            ->with('success', 'Signalement créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Signalement $signalement)
    {
        $signalement->load(['signalant', 'signale']);

        return Inertia::render('admin/signalement/show', [
            'signalement' => $signalement,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Signalement $signalement)
    {
        return Inertia::render('admin/signalement/edit', [
            'signalement' => $signalement,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Signalement $signalement)
    {
        $validated = $request->validate([
            'signalant_id' => 'required|exists:users,id',
            'signale_id' => 'required|exists:users,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'priorite' => 'required|in:faible,moyenne,haute,critique',
            'statut' => 'required|in:en_attente,en_cours,resolu,rejete',
            'date_signalement' => 'nullable|date',
        ]);

        $signalement->update($validated);

        return redirect()->route('admin.signalements.show', $signalement)
            ->with('success', 'Signalement mis à jour avec succès.');
    }

    /**
     * Update signalement status.
     */
    public function updateStatus(Request $request, Signalement $signalement)
    {
        $validated = $request->validate([
            'statut' => 'required|in:en_attente,en_cours,resolu,rejete',
        ]);

        $signalement->update($validated);

        return redirect()->route('admin.signalements.show', $signalement)
            ->with('success', 'Statut du signalement mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Signalement $signalement)
    {
        $signalement->delete();

        return redirect()->route('admin.signalements.index')
            ->with('success', 'Signalement supprimé avec succès.');
    }
}
