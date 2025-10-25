<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Projet;
use App\Models\Commande;
use App\Models\Devis;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatistiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_projects' => Projet::count(),
            'total_orders' => Commande::count(),
            'total_quotes' => Devis::count(),
            'users_by_role' => User::selectRaw('role, COUNT(*) as count')
                ->groupBy('role')
                ->get(),
            'projects_by_status' => Projet::selectRaw('statut, COUNT(*) as count')
                ->groupBy('statut')
                ->get(),
            'orders_by_status' => Commande::selectRaw('statut, COUNT(*) as count')
                ->groupBy('statut')
                ->get(),
        ];

        return Inertia::render('admin/statistique/index', [
            'stats' => $stats,
        ]);
    }
}


