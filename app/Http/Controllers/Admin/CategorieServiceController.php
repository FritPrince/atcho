<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CategorieService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoriesServices = CategorieService::paginate(15);

        return Inertia::render('admin/categorie-service/index', [
            'categoriesServices' => $categoriesServices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categorie-service/create');
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

        $categorieService = CategorieService::create($validated);

        return redirect()->route('admin.categories-services.show', $categorieService)
            ->with('success', 'Catégorie de service créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CategorieService $categorieService)
    {
        return Inertia::render('admin/categorie-service/show', [
            'categorieService' => $categorieService,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategorieService $categorieService)
    {
        return Inertia::render('admin/categorie-service/edit', [
            'categorieService' => $categorieService,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategorieService $categorieService)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $categorieService->update($validated);

        return redirect()->route('admin.categories-services.show', $categorieService)
            ->with('success', 'Catégorie de service mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategorieService $categorieService)
    {
        $categorieService->delete();

        return redirect()->route('admin.categories-services.index')
            ->with('success', 'Catégorie de service supprimée avec succès.');
    }
}


