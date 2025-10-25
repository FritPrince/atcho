<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paiements = Paiement::with(['commande', 'createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/paiement/index', [
            'paiements' => $paiements,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/paiement/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'montant' => 'required|numeric|min:0',
            'methode_paiement' => 'required|string|max:255',
            'statut' => 'required|in:PENDING,COMPLETED,FAILED,REFUNDED',
        ]);

        $paiement = Paiement::create($validated);

        return redirect()->route('admin.paiements.show', $paiement)
            ->with('success', 'Paiement créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Paiement $paiement)
    {
        $paiement->load(['commande', 'createur', 'atelier']);

        return Inertia::render('admin/paiement/show', [
            'paiement' => $paiement,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paiement $paiement)
    {
        return Inertia::render('admin/paiement/edit', [
            'paiement' => $paiement,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paiement $paiement)
    {
        $validated = $request->validate([
            'commande_id' => 'required|exists:commandes,id',
            'montant' => 'required|numeric|min:0',
            'methode_paiement' => 'required|string|max:255',
            'statut' => 'required|in:PENDING,COMPLETED,FAILED,REFUNDED',
        ]);

        $paiement->update($validated);

        return redirect()->route('admin.paiements.show', $paiement)
            ->with('success', 'Paiement mis à jour avec succès.');
    }

    /**
     * Update payment status.
     */
    public function updateStatus(Request $request, Paiement $paiement)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,COMPLETED,FAILED,REFUNDED',
        ]);

        $paiement->update($validated);

        return redirect()->route('admin.paiements.show', $paiement)
            ->with('success', 'Statut du paiement mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paiement $paiement)
    {
        $paiement->delete();

        return redirect()->route('admin.paiements.index')
            ->with('success', 'Paiement supprimé avec succès.');
    }
}


