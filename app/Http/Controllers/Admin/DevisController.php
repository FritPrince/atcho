<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Devis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $devis = Devis::with(['createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/devis/index', [
            'devis' => $devis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/devis/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'montant' => 'required|numeric|min:0',
            'statut' => 'required|in:PENDING,ACCEPTED,REJECTED',
        ]);

        $devis = Devis::create($validated);

        return redirect()->route('admin.devis.show', $devis)
            ->with('success', 'Devis créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Devis $devis)
    {
        $devis->load(['createur', 'atelier']);

        return Inertia::render('admin/devis/show', [
            'devis' => $devis,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devis $devis)
    {
        return Inertia::render('admin/devis/edit', [
            'devis' => $devis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Devis $devis)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'montant' => 'required|numeric|min:0',
            'statut' => 'required|in:PENDING,ACCEPTED,REJECTED',
        ]);

        $devis->update($validated);

        return redirect()->route('admin.devis.show', $devis)
            ->with('success', 'Devis mis à jour avec succès.');
    }

    /**
     * Update devis status.
     */
    public function updateStatus(Request $request, Devis $devis)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,ACCEPTED,REJECTED',
        ]);

        $devis->update($validated);

        return redirect()->route('admin.devis.show', $devis)
            ->with('success', 'Statut du devis mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devis $devis)
    {
        $devis->delete();

        return redirect()->route('admin.devis.index')
            ->with('success', 'Devis supprimé avec succès.');
    }
}
