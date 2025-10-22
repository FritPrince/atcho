<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Adresse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdresseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $adresses = Adresse::with(['user'])
            ->paginate(15);

        return Inertia::render('admin/adresse/index', [
            'adresses' => $adresses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/adresse/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ligne1' => 'required|string|max:255',
            'ligne2' => 'nullable|string|max:255',
            'ville' => 'required|string|max:255',
            'code_postal' => 'required|string|max:10',
            'pays' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $adresse = Adresse::create($validated);

        return redirect()->route('admin.adresses.show', $adresse)
            ->with('success', 'Adresse créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Adresse $adresse)
    {
        $adresse->load(['user']);

        return Inertia::render('admin/adresse/show', [
            'adresse' => $adresse,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Adresse $adresse)
    {
        return Inertia::render('admin/adresse/edit', [
            'adresse' => $adresse,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Adresse $adresse)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ligne1' => 'required|string|max:255',
            'ligne2' => 'nullable|string|max:255',
            'ville' => 'required|string|max:255',
            'code_postal' => 'required|string|max:10',
            'pays' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $adresse->update($validated);

        return redirect()->route('admin.adresses.show', $adresse)
            ->with('success', 'Adresse mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Adresse $adresse)
    {
        $adresse->delete();

        return redirect()->route('admin.adresses.index')
            ->with('success', 'Adresse supprimée avec succès.');
    }
}
