<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CahierDesCharges;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CahierChargesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cahiersCharges = CahierDesCharges::with(['projet', 'createur'])
            ->paginate(15);

        return Inertia::render('admin/cahier-charges/index', [
            'cahiersCharges' => $cahiersCharges,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/cahier-charges/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'projet_id' => 'required|exists:projets,id',
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'fichier' => 'nullable|file|mimes:pdf,doc,docx',
        ]);

        $cahierCharges = CahierDesCharges::create($validated);

        return redirect()->route('admin.cahiers-charges.show', $cahierCharges)
            ->with('success', 'Cahier des charges créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CahierDesCharges $cahierCharges)
    {
        $cahierCharges->load(['projet', 'createur']);

        return Inertia::render('admin/cahier-charges/show', [
            'cahierCharges' => $cahierCharges,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CahierDesCharges $cahierCharges)
    {
        return Inertia::render('admin/cahier-charges/edit', [
            'cahierCharges' => $cahierCharges,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CahierDesCharges $cahierCharges)
    {
        $validated = $request->validate([
            'projet_id' => 'required|exists:projets,id',
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'fichier' => 'nullable|file|mimes:pdf,doc,docx',
        ]);

        $cahierCharges->update($validated);

        return redirect()->route('admin.cahiers-charges.show', $cahierCharges)
            ->with('success', 'Cahier des charges mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CahierDesCharges $cahierCharges)
    {
        $cahierCharges->delete();

        return redirect()->route('admin.cahiers-charges.index')
            ->with('success', 'Cahier des charges supprimé avec succès.');
    }
}
