<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard général (fallback) - redirige selon le rôle
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard')->middleware('redirect.role');

    // Dashboard spécifique aux créateurs
    Route::get('createur/dashboard', function () {
        return Inertia::render('createur/dashboard');
    })->name('createur.dashboard')->middleware('role:CREATEUR');

    // Dashboard spécifique aux ateliers
    Route::get('atelier/dashboard', function () {
        return Inertia::render('atelier/dashboard');
    })->name('atelier.dashboard')->middleware('role:ATELIER');

    // Dashboard spécifique aux prestataires
    Route::get('prestataire/dashboard', function () {
        return Inertia::render('prestataire/dashboard');
    })->name('prestataire.dashboard')->middleware('role:PRESTATAIRE');
});

// Routes Admin - Gestion complète de la plateforme
Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:ADMIN'])->group(function () {
    // Dashboard admin
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/analytics', [App\Http\Controllers\Admin\DashboardController::class, 'analytics'])->name('analytics');
    
    // Gestion des utilisateurs
    Route::get('/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
    
    // Validation des profils
    Route::get('/validation', [App\Http\Controllers\Admin\ValidationController::class, 'index'])->name('validation.index');
    Route::get('/validation/{user}', [App\Http\Controllers\Admin\ValidationController::class, 'show'])->name('validation.show');
    Route::post('/validation/{user}/approve', [App\Http\Controllers\Admin\ValidationController::class, 'approve'])->name('validation.approve');
    Route::post('/validation/{user}/reject', [App\Http\Controllers\Admin\ValidationController::class, 'reject'])->name('validation.reject');
    
    // Gestion des projets
    Route::get('/projects', [App\Http\Controllers\Admin\ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'show'])->name('projects.show');
    Route::delete('/projects/{project}', [App\Http\Controllers\Admin\ProjectController::class, 'destroy'])->name('projects.destroy');
    
    // Gestion des commandes
    Route::get('/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/create', [App\Http\Controllers\Admin\OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [App\Http\Controllers\Admin\OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::get('/orders/{order}/edit', [App\Http\Controllers\Admin\OrderController::class, 'edit'])->name('orders.edit');
    Route::put('/orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [App\Http\Controllers\Admin\OrderController::class, 'destroy'])->name('orders.destroy');
    Route::put('/orders/{order}/status', [App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('orders.status');
    
    // Gestion des portfolios
    Route::get('/portfolios', [App\Http\Controllers\Admin\PortfolioController::class, 'index'])->name('portfolios.index');
    Route::get('/portfolios/create', [App\Http\Controllers\Admin\PortfolioController::class, 'create'])->name('portfolios.create');
    Route::post('/portfolios', [App\Http\Controllers\Admin\PortfolioController::class, 'store'])->name('portfolios.store');
    Route::get('/portfolios/{portfolio}', [App\Http\Controllers\Admin\PortfolioController::class, 'show'])->name('portfolios.show');
    Route::get('/portfolios/{portfolio}/edit', [App\Http\Controllers\Admin\PortfolioController::class, 'edit'])->name('portfolios.edit');
    Route::put('/portfolios/{portfolio}', [App\Http\Controllers\Admin\PortfolioController::class, 'update'])->name('portfolios.update');
    Route::delete('/portfolios/{portfolio}', [App\Http\Controllers\Admin\PortfolioController::class, 'destroy'])->name('portfolios.destroy');
    
    // Gestion des devis
    Route::get('/devis', [App\Http\Controllers\Admin\DevisController::class, 'index'])->name('devis.index');
    Route::get('/devis/create', [App\Http\Controllers\Admin\DevisController::class, 'create'])->name('devis.create');
    Route::post('/devis', [App\Http\Controllers\Admin\DevisController::class, 'store'])->name('devis.store');
    Route::get('/devis/{devis}', [App\Http\Controllers\Admin\DevisController::class, 'show'])->name('devis.show');
    Route::get('/devis/{devis}/edit', [App\Http\Controllers\Admin\DevisController::class, 'edit'])->name('devis.edit');
    Route::put('/devis/{devis}', [App\Http\Controllers\Admin\DevisController::class, 'update'])->name('devis.update');
    Route::delete('/devis/{devis}', [App\Http\Controllers\Admin\DevisController::class, 'destroy'])->name('devis.destroy');
    Route::put('/devis/{devis}/status', [App\Http\Controllers\Admin\DevisController::class, 'updateStatus'])->name('devis.status');
    
    // Gestion des conversations
    Route::get('/conversations', [App\Http\Controllers\Admin\ConversationController::class, 'index'])->name('conversations.index');
    Route::get('/conversations/create', [App\Http\Controllers\Admin\ConversationController::class, 'create'])->name('conversations.create');
    Route::post('/conversations', [App\Http\Controllers\Admin\ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [App\Http\Controllers\Admin\ConversationController::class, 'show'])->name('conversations.show');
    Route::get('/conversations/{conversation}/edit', [App\Http\Controllers\Admin\ConversationController::class, 'edit'])->name('conversations.edit');
    Route::put('/conversations/{conversation}', [App\Http\Controllers\Admin\ConversationController::class, 'update'])->name('conversations.update');
    Route::delete('/conversations/{conversation}', [App\Http\Controllers\Admin\ConversationController::class, 'destroy'])->name('conversations.destroy');
    Route::put('/conversations/{conversation}/archive', [App\Http\Controllers\Admin\ConversationController::class, 'archive'])->name('conversations.archive');
    
    // Gestion des avis
    Route::get('/avis', [App\Http\Controllers\Admin\AvisController::class, 'index'])->name('avis.index');
    Route::get('/avis/create', [App\Http\Controllers\Admin\AvisController::class, 'create'])->name('avis.create');
    Route::post('/avis', [App\Http\Controllers\Admin\AvisController::class, 'store'])->name('avis.store');
    Route::get('/avis/{avis}', [App\Http\Controllers\Admin\AvisController::class, 'show'])->name('avis.show');
    Route::get('/avis/{avis}/edit', [App\Http\Controllers\Admin\AvisController::class, 'edit'])->name('avis.edit');
    Route::put('/avis/{avis}', [App\Http\Controllers\Admin\AvisController::class, 'update'])->name('avis.update');
    Route::delete('/avis/{avis}', [App\Http\Controllers\Admin\AvisController::class, 'destroy'])->name('avis.destroy');
    
    // Gestion des paiements
    Route::get('/paiements', [App\Http\Controllers\Admin\PaiementController::class, 'index'])->name('paiements.index');
    Route::get('/paiements/create', [App\Http\Controllers\Admin\PaiementController::class, 'create'])->name('paiements.create');
    Route::post('/paiements', [App\Http\Controllers\Admin\PaiementController::class, 'store'])->name('paiements.store');
    Route::get('/paiements/{paiement}', [App\Http\Controllers\Admin\PaiementController::class, 'show'])->name('paiements.show');
    Route::get('/paiements/{paiement}/edit', [App\Http\Controllers\Admin\PaiementController::class, 'edit'])->name('paiements.edit');
    Route::put('/paiements/{paiement}', [App\Http\Controllers\Admin\PaiementController::class, 'update'])->name('paiements.update');
    Route::delete('/paiements/{paiement}', [App\Http\Controllers\Admin\PaiementController::class, 'destroy'])->name('paiements.destroy');
    Route::put('/paiements/{paiement}/status', [App\Http\Controllers\Admin\PaiementController::class, 'updateStatus'])->name('paiements.status');
    
    // Gestion des rendez-vous
    Route::get('/rendez-vous', [App\Http\Controllers\Admin\RendezVousController::class, 'index'])->name('rendez-vous.index');
    Route::get('/rendez-vous/create', [App\Http\Controllers\Admin\RendezVousController::class, 'create'])->name('rendez-vous.create');
    Route::post('/rendez-vous', [App\Http\Controllers\Admin\RendezVousController::class, 'store'])->name('rendez-vous.store');
    Route::get('/rendez-vous/{rendezVous}', [App\Http\Controllers\Admin\RendezVousController::class, 'show'])->name('rendez-vous.show');
    Route::get('/rendez-vous/{rendezVous}/edit', [App\Http\Controllers\Admin\RendezVousController::class, 'edit'])->name('rendez-vous.edit');
    Route::put('/rendez-vous/{rendezVous}', [App\Http\Controllers\Admin\RendezVousController::class, 'update'])->name('rendez-vous.update');
    Route::delete('/rendez-vous/{rendezVous}', [App\Http\Controllers\Admin\RendezVousController::class, 'destroy'])->name('rendez-vous.destroy');
    Route::put('/rendez-vous/{rendezVous}/status', [App\Http\Controllers\Admin\RendezVousController::class, 'updateStatus'])->name('rendez-vous.status');
    
    // Gestion des cahiers des charges
    Route::get('/cahiers-charges', [App\Http\Controllers\Admin\CahierChargesController::class, 'index'])->name('cahiers-charges.index');
    Route::get('/cahiers-charges/create', [App\Http\Controllers\Admin\CahierChargesController::class, 'create'])->name('cahiers-charges.create');
    Route::post('/cahiers-charges', [App\Http\Controllers\Admin\CahierChargesController::class, 'store'])->name('cahiers-charges.store');
    Route::get('/cahiers-charges/{cahierCharges}', [App\Http\Controllers\Admin\CahierChargesController::class, 'show'])->name('cahiers-charges.show');
    Route::get('/cahiers-charges/{cahierCharges}/edit', [App\Http\Controllers\Admin\CahierChargesController::class, 'edit'])->name('cahiers-charges.edit');
    Route::put('/cahiers-charges/{cahierCharges}', [App\Http\Controllers\Admin\CahierChargesController::class, 'update'])->name('cahiers-charges.update');
    Route::delete('/cahiers-charges/{cahierCharges}', [App\Http\Controllers\Admin\CahierChargesController::class, 'destroy'])->name('cahiers-charges.destroy');
    
    // Gestion des étapes de production
    Route::get('/etapes-production', [App\Http\Controllers\Admin\EtapeProductionController::class, 'index'])->name('etapes-production.index');
    Route::get('/etapes-production/create', [App\Http\Controllers\Admin\EtapeProductionController::class, 'create'])->name('etapes-production.create');
    Route::post('/etapes-production', [App\Http\Controllers\Admin\EtapeProductionController::class, 'store'])->name('etapes-production.store');
    Route::get('/etapes-production/{etapeProduction}', [App\Http\Controllers\Admin\EtapeProductionController::class, 'show'])->name('etapes-production.show');
    Route::get('/etapes-production/{etapeProduction}/edit', [App\Http\Controllers\Admin\EtapeProductionController::class, 'edit'])->name('etapes-production.edit');
    Route::put('/etapes-production/{etapeProduction}', [App\Http\Controllers\Admin\EtapeProductionController::class, 'update'])->name('etapes-production.update');
    Route::delete('/etapes-production/{etapeProduction}', [App\Http\Controllers\Admin\EtapeProductionController::class, 'destroy'])->name('etapes-production.destroy');
    
    // Gestion des catégories de services
    Route::get('/categories-services', [App\Http\Controllers\Admin\CategorieServiceController::class, 'index'])->name('categories-services.index');
    Route::get('/categories-services/create', [App\Http\Controllers\Admin\CategorieServiceController::class, 'create'])->name('categories-services.create');
    Route::post('/categories-services', [App\Http\Controllers\Admin\CategorieServiceController::class, 'store'])->name('categories-services.store');
    Route::get('/categories-services/{categorieService}', [App\Http\Controllers\Admin\CategorieServiceController::class, 'show'])->name('categories-services.show');
    Route::get('/categories-services/{categorieService}/edit', [App\Http\Controllers\Admin\CategorieServiceController::class, 'edit'])->name('categories-services.edit');
    Route::put('/categories-services/{categorieService}', [App\Http\Controllers\Admin\CategorieServiceController::class, 'update'])->name('categories-services.update');
    Route::delete('/categories-services/{categorieService}', [App\Http\Controllers\Admin\CategorieServiceController::class, 'destroy'])->name('categories-services.destroy');
    
    // Gestion des compétences
    Route::get('/competences', [App\Http\Controllers\Admin\CompetenceController::class, 'index'])->name('competences.index');
    Route::get('/competences/create', [App\Http\Controllers\Admin\CompetenceController::class, 'create'])->name('competences.create');
    Route::post('/competences', [App\Http\Controllers\Admin\CompetenceController::class, 'store'])->name('competences.store');
    Route::get('/competences/{competence}', [App\Http\Controllers\Admin\CompetenceController::class, 'show'])->name('competences.show');
    Route::get('/competences/{competence}/edit', [App\Http\Controllers\Admin\CompetenceController::class, 'edit'])->name('competences.edit');
    Route::put('/competences/{competence}', [App\Http\Controllers\Admin\CompetenceController::class, 'update'])->name('competences.update');
    Route::delete('/competences/{competence}', [App\Http\Controllers\Admin\CompetenceController::class, 'destroy'])->name('competences.destroy');
    
    // Gestion des matériaux
    Route::get('/materiaux', [App\Http\Controllers\Admin\MateriauController::class, 'index'])->name('materiaux.index');
    Route::get('/materiaux/create', [App\Http\Controllers\Admin\MateriauController::class, 'create'])->name('materiaux.create');
    Route::post('/materiaux', [App\Http\Controllers\Admin\MateriauController::class, 'store'])->name('materiaux.store');
    Route::get('/materiaux/{materiau}', [App\Http\Controllers\Admin\MateriauController::class, 'show'])->name('materiaux.show');
    Route::get('/materiaux/{materiau}/edit', [App\Http\Controllers\Admin\MateriauController::class, 'edit'])->name('materiaux.edit');
    Route::put('/materiaux/{materiau}', [App\Http\Controllers\Admin\MateriauController::class, 'update'])->name('materiaux.update');
    Route::delete('/materiaux/{materiau}', [App\Http\Controllers\Admin\MateriauController::class, 'destroy'])->name('materiaux.destroy');
    
    // Gestion des notifications
    Route::get('/notifications', [App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/create', [App\Http\Controllers\Admin\NotificationController::class, 'create'])->name('notifications.create');
    Route::post('/notifications', [App\Http\Controllers\Admin\NotificationController::class, 'store'])->name('notifications.store');
    Route::get('/notifications/{notification}', [App\Http\Controllers\Admin\NotificationController::class, 'show'])->name('notifications.show');
    Route::get('/notifications/{notification}/edit', [App\Http\Controllers\Admin\NotificationController::class, 'edit'])->name('notifications.edit');
    Route::put('/notifications/{notification}', [App\Http\Controllers\Admin\NotificationController::class, 'update'])->name('notifications.update');
    Route::delete('/notifications/{notification}', [App\Http\Controllers\Admin\NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::put('/notifications/{notification}/read', [App\Http\Controllers\Admin\NotificationController::class, 'markAsRead'])->name('notifications.read');
    
    // Gestion des signalements
    Route::get('/signalements', [App\Http\Controllers\Admin\SignalementController::class, 'index'])->name('signalements.index');
    Route::get('/signalements/create', [App\Http\Controllers\Admin\SignalementController::class, 'create'])->name('signalements.create');
    Route::post('/signalements', [App\Http\Controllers\Admin\SignalementController::class, 'store'])->name('signalements.store');
    Route::get('/signalements/{signalement}', [App\Http\Controllers\Admin\SignalementController::class, 'show'])->name('signalements.show');
    Route::get('/signalements/{signalement}/edit', [App\Http\Controllers\Admin\SignalementController::class, 'edit'])->name('signalements.edit');
    Route::put('/signalements/{signalement}', [App\Http\Controllers\Admin\SignalementController::class, 'update'])->name('signalements.update');
    Route::delete('/signalements/{signalement}', [App\Http\Controllers\Admin\SignalementController::class, 'destroy'])->name('signalements.destroy');
    Route::put('/signalements/{signalement}/status', [App\Http\Controllers\Admin\SignalementController::class, 'updateStatus'])->name('signalements.status');
    
    // Gestion des statistiques
    Route::get('/statistiques', [App\Http\Controllers\Admin\StatistiqueController::class, 'index'])->name('statistiques.index');
    
    // Gestion des documents
    Route::get('/documents', [App\Http\Controllers\Admin\DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/create', [App\Http\Controllers\Admin\DocumentController::class, 'create'])->name('documents.create');
    Route::post('/documents', [App\Http\Controllers\Admin\DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{document}', [App\Http\Controllers\Admin\DocumentController::class, 'show'])->name('documents.show');
    Route::get('/documents/{document}/edit', [App\Http\Controllers\Admin\DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{document}', [App\Http\Controllers\Admin\DocumentController::class, 'update'])->name('documents.update');
    Route::delete('/documents/{document}', [App\Http\Controllers\Admin\DocumentController::class, 'destroy'])->name('documents.destroy');
    
    // Gestion des messages
    Route::get('/messages', [App\Http\Controllers\Admin\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/create', [App\Http\Controllers\Admin\MessageController::class, 'create'])->name('messages.create');
    Route::post('/messages', [App\Http\Controllers\Admin\MessageController::class, 'store'])->name('messages.store');
    Route::get('/messages/{message}', [App\Http\Controllers\Admin\MessageController::class, 'show'])->name('messages.show');
    Route::get('/messages/{message}/edit', [App\Http\Controllers\Admin\MessageController::class, 'edit'])->name('messages.edit');
    Route::put('/messages/{message}', [App\Http\Controllers\Admin\MessageController::class, 'update'])->name('messages.update');
    Route::delete('/messages/{message}', [App\Http\Controllers\Admin\MessageController::class, 'destroy'])->name('messages.destroy');
    
    // Gestion des profils créateurs
    Route::get('/profils-createurs', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'index'])->name('profils-createurs.index');
    Route::get('/profils-createurs/create', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'create'])->name('profils-createurs.create');
    Route::post('/profils-createurs', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'store'])->name('profils-createurs.store');
    Route::get('/profils-createurs/{profilCreateur}', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'show'])->name('profils-createurs.show');
    Route::get('/profils-createurs/{profilCreateur}/edit', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'edit'])->name('profils-createurs.edit');
    Route::put('/profils-createurs/{profilCreateur}', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'update'])->name('profils-createurs.update');
    Route::delete('/profils-createurs/{profilCreateur}', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'destroy'])->name('profils-createurs.destroy');
    Route::put('/profils-createurs/{profilCreateur}/status', [App\Http\Controllers\Admin\ProfilCreateurController::class, 'updateStatus'])->name('profils-createurs.status');
    
    // Gestion des profils ateliers
    Route::get('/profils-ateliers', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'index'])->name('profils-ateliers.index');
    Route::get('/profils-ateliers/create', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'create'])->name('profils-ateliers.create');
    Route::post('/profils-ateliers', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'store'])->name('profils-ateliers.store');
    Route::get('/profils-ateliers/{profilAtelier}', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'show'])->name('profils-ateliers.show');
    Route::get('/profils-ateliers/{profilAtelier}/edit', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'edit'])->name('profils-ateliers.edit');
    Route::put('/profils-ateliers/{profilAtelier}', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'update'])->name('profils-ateliers.update');
    Route::delete('/profils-ateliers/{profilAtelier}', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'destroy'])->name('profils-ateliers.destroy');
    Route::put('/profils-ateliers/{profilAtelier}/status', [App\Http\Controllers\Admin\ProfilAtelierController::class, 'updateStatus'])->name('profils-ateliers.status');
    
    // Gestion des adresses
    Route::get('/adresses', [App\Http\Controllers\Admin\AdresseController::class, 'index'])->name('adresses.index');
    Route::get('/adresses/create', [App\Http\Controllers\Admin\AdresseController::class, 'create'])->name('adresses.create');
    Route::post('/adresses', [App\Http\Controllers\Admin\AdresseController::class, 'store'])->name('adresses.store');
    Route::get('/adresses/{adresse}', [App\Http\Controllers\Admin\AdresseController::class, 'show'])->name('adresses.show');
    Route::get('/adresses/{adresse}/edit', [App\Http\Controllers\Admin\AdresseController::class, 'edit'])->name('adresses.edit');
    Route::put('/adresses/{adresse}', [App\Http\Controllers\Admin\AdresseController::class, 'update'])->name('adresses.update');
    Route::delete('/adresses/{adresse}', [App\Http\Controllers\Admin\AdresseController::class, 'destroy'])->name('adresses.destroy');
    
    // Rapports
    Route::get('/reports', [App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/create', [App\Http\Controllers\Admin\ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [App\Http\Controllers\Admin\ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/{report}', [App\Http\Controllers\Admin\ReportController::class, 'show'])->name('reports.show');
    Route::get('/reports/{report}/edit', [App\Http\Controllers\Admin\ReportController::class, 'edit'])->name('reports.edit');
    Route::put('/reports/{report}', [App\Http\Controllers\Admin\ReportController::class, 'update'])->name('reports.update');
    Route::delete('/reports/{report}', [App\Http\Controllers\Admin\ReportController::class, 'destroy'])->name('reports.destroy');
    Route::get('/reports/export', [App\Http\Controllers\Admin\ReportController::class, 'export'])->name('reports.export');
    
    // Paramètres système
    Route::get('/settings', [App\Http\Controllers\Admin\SystemSettingsController::class, 'index'])->name('settings.index');
    Route::get('/settings/create', [App\Http\Controllers\Admin\SystemSettingsController::class, 'create'])->name('settings.create');
    Route::post('/settings', [App\Http\Controllers\Admin\SystemSettingsController::class, 'store'])->name('settings.store');
    Route::get('/settings/{setting}', [App\Http\Controllers\Admin\SystemSettingsController::class, 'show'])->name('settings.show');
    Route::get('/settings/{setting}/edit', [App\Http\Controllers\Admin\SystemSettingsController::class, 'edit'])->name('settings.edit');
    Route::put('/settings/{setting}', [App\Http\Controllers\Admin\SystemSettingsController::class, 'update'])->name('settings.update');
    Route::delete('/settings/{setting}', [App\Http\Controllers\Admin\SystemSettingsController::class, 'destroy'])->name('settings.destroy');
});

// Routes d'inscription step by step
Route::prefix('register')->name('register.')->group(function () {
    Route::get('/', [App\Http\Controllers\Auth\StepRegistrationController::class, 'showStep1'])->name('step1');
    Route::post('/', [App\Http\Controllers\Auth\StepRegistrationController::class, 'storeStep1'])->name('step1');

    Route::get('/step2', [App\Http\Controllers\Auth\StepRegistrationController::class, 'showStep2'])->name('step2');
    Route::post('/step2', [App\Http\Controllers\Auth\StepRegistrationController::class, 'storeStep2'])->name('step2');

    Route::get('/step3', [App\Http\Controllers\Auth\StepRegistrationController::class, 'showStep3'])->name('step3');
    Route::post('/step3', [App\Http\Controllers\Auth\StepRegistrationController::class, 'storeStep3'])->name('step3');

    Route::get('/step4', [App\Http\Controllers\Auth\StepRegistrationController::class, 'showStep4'])->name('step4');
    Route::post('/step4', [App\Http\Controllers\Auth\StepRegistrationController::class, 'storeStep4'])->name('step4');

    Route::get('/step5', [App\Http\Controllers\Auth\StepRegistrationController::class, 'showStep5'])->name('step5');
    Route::post('/step5', [App\Http\Controllers\Auth\StepRegistrationController::class, 'storeStep5'])->name('step5');

    Route::post('/back/{step}', [App\Http\Controllers\Auth\StepRegistrationController::class, 'backToStep'])->name('back');
});

// Routes d'administration
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    // Dashboard
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/analytics', [App\Http\Controllers\Admin\DashboardController::class, 'analytics'])->name('analytics');

    // Gestion des utilisateurs


    // Gestion des projets
    Route::resource('projects', App\Http\Controllers\Admin\ProjectManagementController::class);
    Route::post('projects/{project}/approve', [App\Http\Controllers\Admin\ProjectManagementController::class, 'approve'])->name('projects.approve');
    Route::post('projects/{project}/reject', [App\Http\Controllers\Admin\ProjectManagementController::class, 'reject'])->name('projects.reject');
    Route::get('projects/statistics', [App\Http\Controllers\Admin\ProjectManagementController::class, 'statistics'])->name('projects.statistics');

    // Gestion des commandes

    // Rapports
    Route::get('reports', [App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
