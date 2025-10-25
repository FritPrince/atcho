<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avis = Avis::with(['createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/avis/index', [
            'avis' => $avis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/avis/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string',
        ]);

        $avis = Avis::create($validated);

        return redirect()->route('admin.avis.show', $avis)
            ->with('success', 'Avis créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Avis $avis)
    {
        $avis->load(['createur', 'atelier']);

        return Inertia::render('admin/avis/show', [
            'avis' => $avis,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avis $avis)
    {
        return Inertia::render('admin/avis/edit', [
            'avis' => $avis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Avis $avis)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string',
        ]);

        $avis->update($validated);

        return redirect()->route('admin.avis.show', $avis)
            ->with('success', 'Avis mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avis $avis)
    {
        $avis->delete();

        return redirect()->route('admin.avis.index')
            ->with('success', 'Avis supprimé avec succès.');
    }
}


