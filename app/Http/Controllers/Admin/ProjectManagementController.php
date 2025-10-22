<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competence;
use App\Models\Materiau;
use App\Models\Projet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectManagementController extends Controller
{
    public function __construct()
    {
        // Middleware sera géré par les routes
    }

    public function index(Request $request)
    {
        $query = Projet::with(['createur', 'cahierDesCharges', 'devis', 'commande']);

        // Filtres
        if ($request->filled('status')) {
            $query->where('statut', $request->status);
        }

        if ($request->filled('complexity')) {
            $query->where('complexite', $request->complexity);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('titre', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('creator')) {
            $query->where('createur_id', $request->creator);
        }

        $projects = $query->latest()->paginate(20);

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['status', 'complexity', 'search', 'creator']),
            'statuses' => ['BROUILLON', 'PUBLIE', 'EN_NEGOCIATION', 'EN_COURS', 'TERMINE', 'ANNULE'],
            'complexities' => ['SIMPLE', 'MOYEN', 'COMPLEXE'],
            'creators' => User::where('role', 'CREATEUR')->get(['id', 'prenom', 'nom']),
        ]);
    }

    public function show(Projet $projet)
    {
        $projet->load([
            'createur.adresse',
            'cahierDesCharges',
            'devis.atelier.utilisateur',
            'commande.atelier.utilisateur',
            'competencesRequises',
            'materiaux',
            'conversations',
            'documents',
            'avis',
        ]);

        return Inertia::render('admin/projects/show', [
            'project' => $projet,
        ]);
    }

    public function edit(Projet $projet)
    {
        $projet->load(['createur', 'cahierDesCharges', 'competencesRequises', 'materiaux']);

        return Inertia::render('admin/projects/edit', [
            'project' => $projet,
            'creators' => User::where('role', 'CREATEUR')->get(['id', 'prenom', 'nom']),
            'competences' => Competence::all(['id', 'nom', 'categorie']),
            'materiaux' => Materiau::all(['id', 'nom', 'type']),
        ]);
    }

    public function update(Request $request, Projet $projet)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'statut' => 'required|in:BROUILLON,PUBLIE,EN_NEGOCIATION,EN_COURS,TERMINE,ANNULE',
            'complexite' => 'required|in:SIMPLE,MOYEN,COMPLEXE',
            'confidentialite' => 'required|in:PUBLIC,PRIVE,CONFIDENTIEL',
            'budget_estime' => 'nullable|numeric|min:0',
            'quantite' => 'required|integer|min:1',
            'date_limite' => 'nullable|date|after:today',
            'date_debut_souhaitee' => 'nullable|date|after:today',
        ]);

        $projet->update($request->only([
            'titre', 'description', 'statut', 'complexite', 'confidentialite',
            'budget_estime', 'quantite', 'date_limite', 'date_debut_souhaitee',
        ]));

        // Synchroniser les compétences requises
        if ($request->has('competences_requises')) {
            $projet->competencesRequises()->sync($request->competences_requises);
        }

        // Synchroniser les matériaux
        if ($request->has('materiaux')) {
            $projet->materiaux()->sync($request->materiaux);
        }

        return redirect()->route('admin.projects.show', $projet)
            ->with('success', 'Projet mis à jour avec succès.');
    }

    public function destroy(Projet $projet)
    {
        $projet->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet supprimé avec succès.');
    }

    public function approve(Projet $projet)
    {
        $projet->update(['statut' => 'PUBLIE']);

        return back()->with('success', 'Projet approuvé et publié.');
    }

    public function reject(Projet $projet)
    {
        $projet->update(['statut' => 'ANNULE']);

        return back()->with('success', 'Projet rejeté.');
    }

    public function statistics()
    {
        $stats = [
            'total_projects' => Projet::count(),
            'published_projects' => Projet::where('statut', 'PUBLIE')->count(),
            'in_progress_projects' => Projet::where('statut', 'EN_COURS')->count(),
            'completed_projects' => Projet::where('statut', 'TERMINE')->count(),
            'average_budget' => Projet::whereNotNull('budget_estime')->avg('budget_estime'),
        ];

        $projectsByStatus = Projet::select('statut', DB::raw('count(*) as total'))
            ->groupBy('statut')
            ->get()
            ->pluck('total', 'statut');

        $projectsByComplexity = Projet::select('complexite', DB::raw('count(*) as total'))
            ->groupBy('complexite')
            ->get()
            ->pluck('total', 'complexite');

        return Inertia::render('admin/projects/statistics', [
            'stats' => $stats,
            'projectsByStatus' => $projectsByStatus,
            'projectsByComplexity' => $projectsByComplexity,
        ]);
    }
}
