<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AccountValidationController extends Controller
{
    public function __construct()
    {
        // Middleware sera géré par les routes
    }

    public function index(Request $request)
    {
        $query = User::with(['adresse', 'profilCreateur', 'profilAtelier', 'documents'])
            ->where('est_verifie', false);

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

        $users = $query->latest()->paginate(20);

        return Inertia::render('admin/validation/index', [
            'users' => $users,
            'filters' => $request->only(['role', 'search']),
            'roles' => ['CREATEUR', 'ATELIER', 'PRESTATAIRE'],
        ]);
    }

    public function show(User $user)
    {
        $user->load([
            'adresse',
            'profilCreateur',
            'profilAtelier',
            'documents' => function ($query) {
                $query->where('type', 'VERIFICATION');
            },
        ]);

        return Inertia::render('admin/validation/show', [
            'user' => $user,
        ]);
    }

    public function approve(User $user)
    {
        $user->update(['est_verifie' => true]);

        // Envoyer une notification à l'utilisateur
        // $user->notify(new \App\Notifications\AccountVerified());

        return back()->with('success', 'Compte approuvé avec succès.');
    }

    public function reject(Request $request, User $user)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $user->update(['est_verifie' => false]);

        // Envoyer une notification à l'utilisateur avec la raison
        // $user->notify(new \App\Notifications\AccountRejected($request->reason));

        return back()->with('success', 'Compte rejeté avec succès.');
    }

    public function requestDocuments(User $user)
    {
        // Envoyer une notification demandant des documents supplémentaires
        // $user->notify(new \App\Notifications\AdditionalDocumentsRequired());

        return back()->with('success', 'Demande de documents supplémentaires envoyée.');
    }

    public function uploadDocument(Request $request, User $user)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // 10MB max
            'type' => 'required|in:IDENTITY,BUSINESS_LICENSE,PROOF_ADDRESS,OTHER',
            'description' => 'nullable|string|max:500',
        ]);

        $file = $request->file('document');
        $filename = time().'_'.$file->getClientOriginalName();
        $path = $file->storeAs('verification-documents', $filename, 'public');

        Document::create([
            'nom_fichier' => $file->getClientOriginalName(),
            'chemin_fichier' => $path,
            'type_mime' => $file->getMimeType(),
            'taille_fichier' => $file->getSize(),
            'type' => 'VERIFICATION',
            'description' => $request->description,
            'proprietaire_id' => $user->id,
            'est_public' => false,
        ]);

        return back()->with('success', 'Document téléchargé avec succès.');
    }

    public function downloadDocument(Document $document)
    {
        if (! Storage::disk('public')->exists($document->chemin_fichier)) {
            abort(404, 'Document non trouvé.');
        }

        return response()->download(storage_path('app/public/'.$document->chemin_fichier), $document->nom_fichier);
    }

    public function statistics()
    {
        $stats = [
            'pending_verifications' => User::where('est_verifie', false)->count(),
            'verified_today' => User::where('est_verifie', true)
                ->whereDate('updated_at', today())
                ->count(),
            'rejected_today' => User::where('est_verifie', false)
                ->whereDate('updated_at', today())
                ->count(),
        ];

        $verificationsByRole = User::select('role', DB::raw('count(*) as total'))
            ->where('est_verifie', false)
            ->groupBy('role')
            ->get()
            ->pluck('total', 'role');

        return Inertia::render('admin/validation/statistics', [
            'stats' => $stats,
            'verificationsByRole' => $verificationsByRole,
        ]);
    }
}
