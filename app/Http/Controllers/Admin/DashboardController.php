<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Conversation;
use App\Models\Devis;
use App\Models\Projet;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct()
    {
        // Middleware sera géré par les routes
    }

    public function index()
    {
        try {
            // Statistiques générales avec gestion d'erreurs
            $stats = [
                'total_users' => User::count(),
                'total_createurs' => class_exists('App\Models\ProfilCreateur') ? \App\Models\ProfilCreateur::count() : 0,
                'total_ateliers' => class_exists('App\Models\ProfilAtelier') ? \App\Models\ProfilAtelier::count() : 0,
                'total_projects' => class_exists('App\Models\Projet') ? \App\Models\Projet::count() : 0,
                'total_portfolios' => class_exists('App\Models\Portfolio') ? \App\Models\Portfolio::count() : 0,
                'total_orders' => class_exists('App\Models\Commande') ? \App\Models\Commande::count() : 0,
                'total_quotes' => class_exists('App\Models\Devis') ? \App\Models\Devis::count() : 0,
                'active_conversations' => class_exists('App\Models\Conversation') ? \App\Models\Conversation::where('est_archive', false)->count() : 0,
            ];

            // Utilisateurs par rôle
            $usersByRole = User::select('role', DB::raw('count(*) as total'))
                ->groupBy('role')
                ->get()
                ->pluck('total', 'role');

            // Créateurs récents avec leurs vraies données
            $recentCreateurs = class_exists('App\Models\ProfilCreateur') ? 
                \App\Models\ProfilCreateur::with('utilisateur')
                    ->latest()
                    ->limit(3)
                    ->get()
                    ->map(function ($createur) {
                        return [
                            'id' => $createur->id,
                            'nom_marque' => $createur->nom_marque,
                            'style' => $createur->style,
                            'experience' => $createur->experience,
                            'createur' => $createur->utilisateur ? 
                                $createur->utilisateur->prenom . ' ' . $createur->utilisateur->nom : 
                                'Non défini',
                            'photo_profil' => $createur->photo_profil,
                            'created_at' => $createur->created_at,
                        ];
                    }) : collect([]);

            // Projets récents avec vraies données
            $recentProjets = class_exists('App\Models\Projet') ? 
                \App\Models\Projet::with('createur')
                    ->latest()
                    ->limit(3)
                    ->get()
                    ->map(function ($projet) {
                        return [
                            'id' => $projet->id,
                            'titre' => $projet->titre,
                            'description' => $projet->description,
                            'image_principale' => $projet->image_principale,
                            'createur' => $projet->createur ? 
                                $projet->createur->prenom . ' ' . $projet->createur->nom : 
                                'Non défini',
                            'created_at' => $projet->created_at,
                        ];
                    }) : collect([]);

            // Données simulées pour les tests
            $projectsByStatus = collect([
                'en_cours' => 15,
                'termine' => 8,
                'en_attente' => 3
            ]);

            $ordersByStatus = collect([
                'en_attente' => 12,
                'confirme' => 5,
                'livre' => 8
            ]);

            $monthlyRevenue = collect([
                ['month' => '2024-01', 'revenue' => 15000],
                ['month' => '2024-02', 'revenue' => 18000],
                ['month' => '2024-03', 'revenue' => 22000],
            ]);

            // Utilisateurs récents
            $recentUsers = User::latest()->limit(5)->get();

            // Projets récents (simulés)
            $recentProjects = collect([
                [
                    'id' => 1,
                    'nom' => 'Collection Printemps 2024',
                    'createur' => ['name' => 'Marie Dubois'],
                    'statut' => 'en_cours',
                    'created_at' => now()->subDays(2)
                ],
                [
                    'id' => 2,
                    'nom' => 'Robe de Soirée Haute Couture',
                    'createur' => ['name' => 'Jean Martin'],
                    'statut' => 'termine',
                    'created_at' => now()->subDays(5)
                ]
            ]);

            return Inertia::render('admin/dashboard', [
                'stats' => $stats,
                'usersByRole' => $usersByRole,
                'projectsByStatus' => $projectsByStatus,
                'ordersByStatus' => $ordersByStatus,
                'monthlyRevenue' => $monthlyRevenue,
                'recentUsers' => $recentUsers,
                'recentProjects' => $recentProjects,
                'recentCreateurs' => $recentCreateurs,
                'recentProjets' => $recentProjets,
            ]);
        } catch (\Exception $e) {
            // En cas d'erreur, retourner des données par défaut
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'total_users' => 0,
                    'total_projects' => 0,
                    'total_orders' => 0,
                    'total_quotes' => 0,
                    'active_conversations' => 0,
                ],
                'usersByRole' => collect(),
                'projectsByStatus' => collect(),
                'ordersByStatus' => collect(),
                'monthlyRevenue' => collect(),
                'recentUsers' => collect(),
                'recentProjects' => collect(),
                'error' => $e->getMessage()
            ]);
        }
    }

    public function analytics()
    {
        // Analytics détaillées
        $userGrowth = User::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', now()->subYear())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $projectTrends = Projet::select(
            DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
            DB::raw('COUNT(*) as count')
        )
            ->where('created_at', '>=', now()->subYear())
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('admin/analytics', [
            'userGrowth' => $userGrowth,
            'projectTrends' => $projectTrends,
        ]);
    }
}
