<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Projet;
use App\Models\Commande;
use App\Models\Devis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Simulation de rapports pour l'interface
        $reports = [
            'data' => [
                [
                    'id' => 1,
                    'nom' => 'Rapport Utilisateurs Q1 2024',
                    'description' => 'Analyse des utilisateurs pour le premier trimestre 2024',
                    'type' => 'utilisateurs',
                    'statut' => 'termine',
                    'date_generation' => now()->subDays(5)->toISOString(),
                    'created_by' => [
                        'id' => 1,
                        'name' => 'Admin'
                    ],
                    'created_at' => now()->subDays(10)->toISOString()
                ],
                [
                    'id' => 2,
                    'nom' => 'Rapport Ventes Mensuel',
                    'description' => 'Rapport des ventes du mois en cours',
                    'type' => 'ventes',
                    'statut' => 'en_cours',
                    'date_generation' => now()->subDays(2)->toISOString(),
                    'created_by' => [
                        'id' => 1,
                        'name' => 'Admin'
                    ],
                    'created_at' => now()->subDays(7)->toISOString()
                ],
                [
                    'id' => 3,
                    'nom' => 'Rapport Performance',
                    'description' => 'Analyse des performances du système',
                    'type' => 'performance',
                    'statut' => 'en_attente',
                    'date_generation' => now()->toISOString(),
                    'created_by' => [
                        'id' => 1,
                        'name' => 'Admin'
                    ],
                    'created_at' => now()->subDays(3)->toISOString()
                ]
            ],
            'links' => [],
            'meta' => []
        ];

        return Inertia::render('admin/report/index', [
            'reports' => $reports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/report/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:utilisateurs,ventes,performance,financier',
            'parametres' => 'nullable|string',
        ]);

        // Simulation de création de rapport
        return redirect()->route('admin.reports.index')
            ->with('success', 'Rapport créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Simulation d'un rapport
        $report = [
            'id' => $id,
            'nom' => 'Rapport Utilisateurs Q1 2024',
            'description' => 'Analyse des utilisateurs pour le premier trimestre 2024',
            'type' => 'utilisateurs',
            'statut' => 'termine',
            'date_generation' => now()->subDays(5)->toISOString(),
            'parametres' => [
                'date_debut' => '2024-01-01',
                'date_fin' => '2024-03-31',
                'format' => 'pdf'
            ],
            'created_by' => [
                'id' => 1,
                'name' => 'Admin'
            ],
            'created_at' => now()->subDays(10)->toISOString(),
            'updated_at' => now()->subDays(5)->toISOString()
        ];

        return Inertia::render('admin/report/show', [
            'report' => $report,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Simulation d'un rapport pour édition
        $report = [
            'id' => $id,
            'nom' => 'Rapport Utilisateurs Q1 2024',
            'description' => 'Analyse des utilisateurs pour le premier trimestre 2024',
            'type' => 'utilisateurs',
            'statut' => 'termine',
            'parametres' => [
                'date_debut' => '2024-01-01',
                'date_fin' => '2024-03-31',
                'format' => 'pdf'
            ],
            'created_by' => [
                'id' => 1,
                'name' => 'Admin'
            ],
            'created_at' => now()->subDays(10)->toISOString(),
            'updated_at' => now()->subDays(5)->toISOString()
        ];

        return Inertia::render('admin/report/edit', [
            'report' => $report,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:utilisateurs,ventes,performance,financier',
            'statut' => 'required|string|in:en_attente,en_cours,termine,erreur',
            'parametres' => 'nullable|string',
        ]);

        // Simulation de mise à jour de rapport
        return redirect()->route('admin.reports.show', $id)
            ->with('success', 'Rapport mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Simulation de suppression de rapport
        return redirect()->route('admin.reports.index')
            ->with('success', 'Rapport supprimé avec succès.');
    }

    /**
     * Export reports data.
     */
    public function export()
    {
        // Logique d'export des rapports
        return redirect()->route('admin.reports.index')
            ->with('success', 'Rapports exportés avec succès.');
    }
}