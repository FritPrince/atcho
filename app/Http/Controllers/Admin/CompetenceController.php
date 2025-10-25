<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competence;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $competences = Competence::paginate(15);

        return Inertia::render('admin/competence/index', [
            'competences' => $competences,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/competence/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $competence = Competence::create($validated);

        return redirect()->route('admin.competences.show', $competence)
            ->with('success', 'Compétence créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Competence $competence)
    {
        return Inertia::render('admin/competence/show', [
            'competence' => $competence,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Competence $competence)
    {
        return Inertia::render('admin/competence/edit', [
            'competence' => $competence,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Competence $competence)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $competence->update($validated);

        return redirect()->route('admin.competences.show', $competence)
            ->with('success', 'Compétence mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Competence $competence)
    {
        $competence->delete();

        return redirect()->route('admin.competences.index')
            ->with('success', 'Compétence supprimée avec succès.');
    }
}


