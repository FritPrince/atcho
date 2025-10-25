<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RendezVous;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RendezVousController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rendezVous = RendezVous::with(['createur', 'atelier'])
            ->paginate(15);

        return Inertia::render('admin/rendez-vous/index', [
            'rendezVous' => $rendezVous,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/rendez-vous/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'date_rendez_vous' => 'required|date|after:now',
            'statut' => 'required|in:PENDING,CONFIRMED,CANCELLED,COMPLETED',
        ]);

        $rendezVous = RendezVous::create($validated);

        return redirect()->route('admin.rendez-vous.show', $rendezVous)
            ->with('success', 'Rendez-vous créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RendezVous $rendezVous)
    {
        $rendezVous->load(['createur', 'atelier']);

        return Inertia::render('admin/rendez-vous/show', [
            'rendezVous' => $rendezVous,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RendezVous $rendezVous)
    {
        return Inertia::render('admin/rendez-vous/edit', [
            'rendezVous' => $rendezVous,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RendezVous $rendezVous)
    {
        $validated = $request->validate([
            'createur_id' => 'required|exists:users,id',
            'atelier_id' => 'required|exists:users,id',
            'date_rendez_vous' => 'required|date|after:now',
            'statut' => 'required|in:PENDING,CONFIRMED,CANCELLED,COMPLETED',
        ]);

        $rendezVous->update($validated);

        return redirect()->route('admin.rendez-vous.show', $rendezVous)
            ->with('success', 'Rendez-vous mis à jour avec succès.');
    }

    /**
     * Update rendez-vous status.
     */
    public function updateStatus(Request $request, RendezVous $rendezVous)
    {
        $validated = $request->validate([
            'statut' => 'required|in:PENDING,CONFIRMED,CANCELLED,COMPLETED',
        ]);

        $rendezVous->update($validated);

        return redirect()->route('admin.rendez-vous.show', $rendezVous)
            ->with('success', 'Statut du rendez-vous mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RendezVous $rendezVous)
    {
        $rendezVous->delete();

        return redirect()->route('admin.rendez-vous.index')
            ->with('success', 'Rendez-vous supprimé avec succès.');
    }
}


