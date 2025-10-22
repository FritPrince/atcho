<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Materiau;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $materiaux = Materiau::paginate(15);

        return Inertia::render('admin/materiau/index', [
            'materiaux' => $materiaux,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/materiau/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix_unitaire' => 'required|numeric|min:0',
        ]);

        $materiau = Materiau::create($validated);

        return redirect()->route('admin.materiaux.show', $materiau)
            ->with('success', 'Matériau créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Materiau $materiau)
    {
        return Inertia::render('admin/materiau/show', [
            'materiau' => $materiau,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Materiau $materiau)
    {
        return Inertia::render('admin/materiau/edit', [
            'materiau' => $materiau,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Materiau $materiau)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'prix_unitaire' => 'required|numeric|min:0',
        ]);

        $materiau->update($validated);

        return redirect()->route('admin.materiaux.show', $materiau)
            ->with('success', 'Matériau mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materiau $materiau)
    {
        $materiau->delete();

        return redirect()->route('admin.materiaux.index')
            ->with('success', 'Matériau supprimé avec succès.');
    }
}
