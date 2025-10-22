<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Adresse;
use App\Models\ProfilAtelier;
use App\Models\ProfilCreateur;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StepRegistrationController extends Controller
{
    public function showStep1()
    {
        return Inertia::render('Auth/Register/Step1');
    }

    public function storeStep1(Request $request)
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:20',
        ]);

        // Stocker les données dans la session
        $request->session()->put('registration.step1', $request->only([
            'prenom', 'nom', 'email', 'password', 'telephone',
        ]));

        return redirect()->route('register.step2');
    }

    public function showStep2()
    {
        if (! session()->has('registration.step1')) {
            return redirect()->route('register.step1');
        }

        return Inertia::render('Auth/Register/Step2');
    }

    public function storeStep2(Request $request)
    {
        $request->validate([
            'role' => 'required|in:CREATEUR,ATELIER,PRESTATAIRE',
            'bio' => 'nullable|string|max:1000',
        ]);

        $request->session()->put('registration.step2', $request->only(['role', 'bio']));

        return redirect()->route('register.step3');
    }

    public function showStep3()
    {
        if (! session()->has('registration.step1') || ! session()->has('registration.step2')) {
            return redirect()->route('register.step1');
        }

        return Inertia::render('Auth/Register/Step3');
    }

    public function storeStep3(Request $request)
    {
        $request->validate([
            'adresse' => 'required|array',
            'adresse.ligne1' => 'required|string|max:255',
            'adresse.ligne2' => 'nullable|string|max:255',
            'adresse.code_postal' => 'required|string|max:10',
            'adresse.ville' => 'required|string|max:255',
            'adresse.pays' => 'required|string|max:255',
            'adresse.region' => 'nullable|string|max:255',
        ]);

        $request->session()->put('registration.step3', $request->only(['adresse']));

        return redirect()->route('register.step4');
    }

    public function showStep4()
    {
        if (! session()->has('registration.step1') ||
            ! session()->has('registration.step2') ||
            ! session()->has('registration.step3')) {
            return redirect()->route('register.step1');
        }

        $role = session('registration.step2.role');

        return Inertia::render('Auth/Register/Step4', [
            'role' => $role,
        ]);
    }

    public function storeStep4(Request $request)
    {
        $role = session('registration.step2.role');

        $validationRules = [];

        if ($role === 'CREATEUR') {
            $validationRules = [
                'nom_marque' => 'required|string|max:255',
                'style' => 'nullable|in:LUXE,STREETWEAR,ECO_RESPONSABLE,CLASSIQUE,MODERNE,VINTAGE',
                'experience' => 'required|in:DEBUTANT,INTERMEDIAIRE,EXPERT',
                'secteur' => 'nullable|in:PRET_A_PORTER,ACCESSOIRES,MARIAGE,HAUTE_COUTURE,SPORT',
            ];
        } elseif ($role === 'ATELIER') {
            $validationRules = [
                'nom_atelier' => 'required|string|max:255',
                'description_entreprise' => 'nullable|string|max:1000',
                'type_entreprise' => 'required|in:INDIVIDUEL,SARL,SA,AUTO_ENTREPRENEUR',
                'numero_siret' => 'nullable|string|max:20',
                'taille_equipe' => 'required|integer|min:1',
                'tarif_horaire_moyen' => 'nullable|numeric|min:0',
                'delai_livraison_moyen_jours' => 'nullable|integer|min:1',
                'capacite_production_mensuelle' => 'nullable|integer|min:1',
            ];
        }

        $request->validate($validationRules);

        $request->session()->put('registration.step4', $request->all());

        return redirect()->route('register.step5');
    }

    public function showStep5()
    {
        if (! session()->has('registration.step1') ||
            ! session()->has('registration.step2') ||
            ! session()->has('registration.step3') ||
            ! session()->has('registration.step4')) {
            return redirect()->route('register.step1');
        }

        return Inertia::render('Auth/Register/Step5');
    }

    public function storeStep5(Request $request)
    {
        $request->validate([
            'preferences_notifications' => 'nullable|array',
            'preferences_notifications.email' => 'boolean',
            'preferences_notifications.sms' => 'boolean',
            'preferences_notifications.push' => 'boolean',
            'accept_terms' => 'required|accepted',
            'accept_privacy' => 'required|accepted',
        ]);

        // Créer l'utilisateur
        $step1 = session('registration.step1');
        $step2 = session('registration.step2');
        $step3 = session('registration.step3');
        $step4 = session('registration.step4');

        // Créer l'adresse
        $adresse = Adresse::create($step3['adresse']);

        // Créer l'utilisateur
        $user = User::create([
            'prenom' => $step1['prenom'],
            'nom' => $step1['nom'],
            'email' => $step1['email'],
            'password' => Hash::make($step1['password']),
            'telephone' => $step1['telephone'],
            'bio' => $step2['bio'],
            'role' => $step2['role'],
            'adresse_id' => $adresse->id,
            'est_verifie' => false,
            'est_actif' => true,
            'preferences_notifications' => $request->preferences_notifications ?? [
                'email' => true,
                'sms' => false,
                'push' => true,
            ],
            'date_inscription' => now(),
        ]);

        // Assigner le rôle
        $user->assignRole($step2['role']);

        // Créer le profil spécifique
        if ($step2['role'] === 'CREATEUR') {
            ProfilCreateur::create([
                'utilisateur_id' => $user->id,
                'nom_marque' => $step4['nom_marque'],
                'style' => $step4['style'] ?? null,
                'experience' => $step4['experience'],
                'secteur' => $step4['secteur'] ?? null,
            ]);
        } elseif ($step2['role'] === 'ATELIER') {
            ProfilAtelier::create([
                'utilisateur_id' => $user->id,
                'nom_atelier' => $step4['nom_atelier'],
                'description_entreprise' => $step4['description_entreprise'] ?? null,
                'type_entreprise' => $step4['type_entreprise'],
                'numero_siret' => $step4['numero_siret'] ?? null,
                'taille_equipe' => $step4['taille_equipe'],
                'tarif_horaire_moyen' => $step4['tarif_horaire_moyen'] ?? null,
                'delai_livraison_moyen_jours' => $step4['delai_livraison_moyen_jours'] ?? null,
                'capacite_production_mensuelle' => $step4['capacite_production_mensuelle'] ?? null,
            ]);
        }

        // Nettoyer la session
        $request->session()->forget('registration');

        // Connecter l'utilisateur
        Auth::login($user);

        // Redirection basée sur le rôle
        $redirectRoute = match ($step2['role']) {
            'ADMIN' => 'admin.dashboard',
            'CREATEUR' => 'createur.dashboard',
            'ATELIER' => 'atelier.dashboard',
            'PRESTATAIRE' => 'prestataire.dashboard',
            default => 'dashboard',
        };

        return redirect()->route($redirectRoute)
            ->with('success', 'Inscription réussie ! Bienvenue sur Atcho.');
    }

    public function backToStep(Request $request, $step)
    {
        $validSteps = [1, 2, 3, 4];

        if (! in_array($step, $validSteps)) {
            return redirect()->route('register.step1');
        }

        // Supprimer les étapes suivantes
        for ($i = $step + 1; $i <= 5; $i++) {
            $request->session()->forget("registration.step{$i}");
        }

        return redirect()->route("register.step{$step}");
    }
}
