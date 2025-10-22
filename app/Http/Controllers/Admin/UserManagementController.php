<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Adresse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function __construct()
    {
        // Middleware sera géré par les routes
    }

    public function index(Request $request)
    {
        $query = User::with(['adresse', 'roles']);

        // Filtres
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('prenom', 'like', "%{$search}%")
                    ->orWhere('nom', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('est_actif', $request->status === 'active');
        }

        $users = $query->paginate(20);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search', 'status']),
            'roles' => ['CREATEUR', 'ATELIER', 'PRESTATAIRE', 'ADMIN'],
        ]);
    }

    public function show(User $user)
    {
        $user->load(['adresse', 'roles', 'projets', 'profilCreateur', 'profilAtelier']);

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create', [
            'roles' => ['CREATEUR', 'ATELIER', 'PRESTATAIRE', 'ADMIN'],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:CREATEUR,ATELIER,PRESTATAIRE,ADMIN',
            'telephone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'adresse' => 'nullable|array',
            'adresse.ligne1' => 'required_with:adresse|string|max:255',
            'adresse.code_postal' => 'required_with:adresse|string|max:10',
            'adresse.ville' => 'required_with:adresse|string|max:255',
        ]);

        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'telephone' => $request->telephone,
            'bio' => $request->bio,
            'est_verifie' => true,
            'est_actif' => true,
        ]);

        // Créer l'adresse si fournie
        if ($request->adresse) {
            $adresse = Adresse::create($request->adresse);
            $user->update(['adresse_id' => $adresse->id]);
        }

        // Assigner le rôle
        $user->assignRole($request->role);

        return redirect()->route('admin.users.show', $user)
            ->with('success', 'Utilisateur créé avec succès.');
    }

    public function edit(User $user)
    {
        $user->load(['adresse', 'roles']);

        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => ['CREATEUR', 'ATELIER', 'PRESTATAIRE', 'ADMIN'],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:CREATEUR,ATELIER,PRESTATAIRE,ADMIN',
            'telephone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'est_verifie' => 'boolean',
            'est_actif' => 'boolean',
        ]);

        $user->update($request->only([
            'prenom', 'nom', 'email', 'role', 'telephone', 'bio', 'est_verifie', 'est_actif',
        ]));

        // Mettre à jour le rôle
        $user->syncRoles([$request->role]);

        return redirect()->route('admin.users.show', $user)
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->user()->id) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }

    public function toggleStatus(User $user)
    {
        $user->update(['est_actif' => ! $user->est_actif]);

        $status = $user->est_actif ? 'activé' : 'désactivé';

        return back()->with('success', "Utilisateur {$status} avec succès.");
    }

    public function verify(User $user)
    {
        $user->update(['est_verifie' => true]);

        return back()->with('success', 'Utilisateur vérifié avec succès.');
    }

    public function resetPassword(Request $request, User $user)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Mot de passe réinitialisé avec succès.');
    }
}
