<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'image_principale',
        'galerie_images',
        'image_couverture',
        'images_avant_apres',
        'cahier_des_charges_id',
        'date_creation',
        'date_limite',
        'date_debut_souhaitee',
        'budget_estime',
        'quantite',
        'complexite',
        'confidentialite',
        'statut',
        'createur_id',
    ];

    protected function casts(): array
    {
        return [
            'date_creation' => 'datetime',
            'date_limite' => 'datetime',
            'date_debut_souhaitee' => 'datetime',
            'budget_estime' => 'decimal:2',
            'galerie_images' => 'array',
            'images_avant_apres' => 'array',
        ];
    }

    // Relations
    public function createur()
    {
        return $this->belongsTo(User::class, 'createur_id');
    }

    public function cahierDesCharges()
    {
        return $this->belongsTo(CahierDesCharges::class, 'cahier_des_charges_id');
    }

    public function devis()
    {
        return $this->hasMany(Devis::class);
    }

    public function commande()
    {
        return $this->hasOne(Commande::class);
    }

    public function competencesRequises()
    {
        return $this->belongsToMany(Competence::class, 'projet_competences_requises')
            ->withPivot('est_obligatoire')
            ->withTimestamps();
    }

    public function materiaux()
    {
        return $this->belongsToMany(Materiau::class, 'projet_materiaux')
            ->withPivot('quantite', 'notes')
            ->withTimestamps();
    }

    public function conversations()
    {
        return $this->hasMany(Conversation::class, 'projet_associe_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'projet_associe_id');
    }

    public function rendezVous()
    {
        return $this->hasMany(RendezVous::class, 'projet_associe_id');
    }

    public function avis()
    {
        return $this->hasMany(Avis::class, 'projet_associe_id');
    }

    public function signalements()
    {
        return $this->hasMany(Signalement::class, 'projet_concerne_id');
    }

    // Scopes
    public function scopeParStatut($query, $statut)
    {
        return $query->where('statut', $statut);
    }

    public function scopeParComplexite($query, $complexite)
    {
        return $query->where('complexite', $complexite);
    }

    public function scopeParConfidentialite($query, $confidentialite)
    {
        return $query->where('confidentialite', $confidentialite);
    }

    public function scopeParCreateur($query, $createurId)
    {
        return $query->where('createur_id', $createurId);
    }

    public function scopeParBudgetMax($query, $budgetMax)
    {
        return $query->where('budget_estime', '<=', $budgetMax);
    }

    public function scopeParBudgetMin($query, $budgetMin)
    {
        return $query->where('budget_estime', '>=', $budgetMin);
    }

    public function scopePublics($query)
    {
        return $query->where('confidentialite', 'PUBLIC');
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('titre', 'like', "%{$terme}%")
            ->orWhere('description', 'like', "%{$terme}%");
    }

    // Accessors
    public function getStatutLabelAttribute()
    {
        return match ($this->statut) {
            'BROUILLON' => 'Brouillon',
            'PUBLIE' => 'Publié',
            'EN_NEGOCIATION' => 'En négociation',
            'EN_COURS' => 'En cours',
            'TERMINE' => 'Terminé',
            'ANNULE' => 'Annulé',
            default => $this->statut,
        };
    }

    public function getComplexiteLabelAttribute()
    {
        return match ($this->complexite) {
            'SIMPLE' => 'Simple',
            'MOYEN' => 'Moyen',
            'COMPLEXE' => 'Complexe',
            default => $this->complexite,
        };
    }

    public function getConfidentialiteLabelAttribute()
    {
        return match ($this->confidentialite) {
            'PUBLIC' => 'Public',
            'PRIVE' => 'Privé',
            'CONFIDENTIEL' => 'Confidentiel',
            default => $this->confidentialite,
        };
    }

    // Méthodes
    public function accepterDevis($devisId)
    {
        $devis = $this->devis()->findOrFail($devisId);
        $devis->update(['statut' => 'ACCEPTE']);

        // Créer la commande
        $this->commande()->create([
            'reference' => 'CMD-'.strtoupper(uniqid()),
            'montant_final' => $devis->montant,
            'atelier_id' => $devis->atelier_id,
            'date_livraison_prevue' => now()->addDays($devis->delai_jours),
        ]);

        $this->update(['statut' => 'EN_COURS']);
    }

    public function estTermine()
    {
        return $this->statut === 'TERMINE';
    }

    public function peutEtreModifie()
    {
        return in_array($this->statut, ['BROUILLON', 'PUBLIE']);
    }
}
