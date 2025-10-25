<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EtapeProduction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EtapeProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $etapesProduction = EtapeProduction::with(['projet', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/etape-production/index', [
            'etapesProduction' => $etapesProduction,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/etape-production/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'projet_id' => 'required|exists:projets,id',
            'atelier_id' => 'required|exists:users,id',
            'nom_etape' => 'required|string|max:255',
            'description' => 'required|string',
            'statut' => 'required|in:PENDING,IN_PROGRESS,COMPLETED',
        ]);

        $etapeProduction = EtapeProduction::create($validated);

        return redirect()->route('admin.etapes-production.show', $etapeProduction)
            ->with('success', 'Étape de production créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(EtapeProduction $etapeProduction)
    {
        $etapeProduction->load(['projet', 'atelier']);

        return Inertia::render('admin/etape-production/show', [
            'etapeProduction' => $etapeProduction,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EtapeProduction $etapeProduction)
    {
        return Inertia::render('admin/etape-production/edit', [
            'etapeProduction' => $etapeProduction,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EtapeProduction $etapeProduction)
    {
        $validated = $request->validate([
            'projet_id' => 'required|exists:projets,id',
            'atelier_id' => 'required|exists:users,id',
            'nom_etape' => 'required|string|max:255',
            'description' => 'required|string',
            'statut' => 'required|in:PENDING,IN_PROGRESS,COMPLETED',
        ]);

        $etapeProduction->update($validated);

        return redirect()->route('admin.etapes-production.show', $etapeProduction)
            ->with('success', 'Étape de production mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EtapeProduction $etapeProduction)
    {
        $etapeProduction->delete();

        return redirect()->route('admin.etapes-production.index')
            ->with('success', 'Étape de production supprimée avec succès.');
    }
}


