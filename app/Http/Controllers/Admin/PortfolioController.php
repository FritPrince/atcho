<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolios = Portfolio::with(['atelier'])
            ->paginate(15);

        return Inertia::render('admin/portfolio/index', [
            'portfolios' => $portfolios,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/portfolio/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'createur_id' => 'required|exists:users,id',
            'images' => 'nullable|array',
        ]);

        $portfolio = Portfolio::create($validated);

        return redirect()->route('admin.portfolios.show', $portfolio)
            ->with('success', 'Portfolio créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        $portfolio->load(['atelier']);

        return Inertia::render('admin/portfolio/show', [
            'portfolio' => $portfolio,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('admin/portfolio/edit', [
            'portfolio' => $portfolio,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'createur_id' => 'required|exists:users,id',
            'images' => 'nullable|array',
        ]);

        $portfolio->update($validated);

        return redirect()->route('admin.portfolios.show', $portfolio)
            ->with('success', 'Portfolio mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio supprimé avec succès.');
    }
}
