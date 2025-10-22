<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'montant_final',
        'image_commande',
        'images_produits',
        'images_avant_apres',
        'images_livraison',
        'date_creation',
        'date_livraison_prevue',
        'date_livraison_reelle',
        'conditions_livraison',
        'statut',
        'projet_id',
        'atelier_id',
    ];

    protected function casts(): array
    {
        return [
            'montant_final' => 'decimal:2',
            'images_produits' => 'array',
            'images_avant_apres' => 'array',
            'images_livraison' => 'array',
            'date_creation' => 'datetime',
            'date_livraison_prevue' => 'datetime',
            'date_livraison_reelle' => 'datetime',
        ];
    }

    // Relations
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function atelier()
    {
        return $this->belongsTo(ProfilAtelier::class, 'atelier_id');
    }

    public function etapes()
    {
        return $this->hasMany(EtapeProduction::class);
    }

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

    // Scopes
    public function scopeParStatut($query, $statut)
    {
        return $query->where('statut', $statut);
    }

    public function scopeParAtelier($query, $atelierId)
    {
        return $query->where('atelier_id', $atelierId);
    }

    public function scopeEnRetard($query)
    {
        return $query->where('date_livraison_prevue', '<', now())
            ->where('statut', '!=', 'LIVREE');
    }

    public function scopeEnCours($query)
    {
        return $query->whereIn('statut', ['EN_PREPARATION', 'EN_COUPAGE', 'EN_ASSEMBLAGE']);
    }

    // Accessors
    public function getStatutLabelAttribute()
    {
        return match ($this->statut) {
            'EN_PREPARATION' => 'En préparation',
            'EN_COUPAGE' => 'En coupage',
            'EN_ASSEMBLAGE' => 'En assemblage',
            'TERMINEE' => 'Terminée',
            'LIVREE' => 'Livrée',
            default => $this->statut,
        };
    }

    public function getMontantFormateAttribute()
    {
        return number_format((float) $this->montant_final, 2).' €';
    }

    public function getProgressionAttribute()
    {
        $etapesTotal = $this->etapes()->count();
        $etapesTerminees = $this->etapes()->where('est_terminee', true)->count();

        return $etapesTotal > 0 ? round(($etapesTerminees / $etapesTotal) * 100) : 0;
    }

    // Méthodes
    public function estEnRetard()
    {
        return $this->date_livraison_prevue < now() && $this->statut !== 'LIVREE';
    }

    public function estTerminee()
    {
        return $this->statut === 'TERMINEE';
    }

    public function estLivree()
    {
        return $this->statut === 'LIVREE';
    }

    public function passerEtapeSuivante()
    {
        $etapeActuelle = $this->etapes()->where('est_terminee', false)->orderBy('ordre')->first();

        if ($etapeActuelle) {
            $etapeActuelle->update([
                'est_terminee' => true,
                'date_completion' => now(),
            ]);
        }

        // Vérifier si toutes les étapes sont terminées
        $etapesRestantes = $this->etapes()->where('est_terminee', false)->count();
        if ($etapesRestantes === 0) {
            $this->update(['statut' => 'TERMINEE']);
        }
    }

    public function livrer()
    {
        $this->update([
            'statut' => 'LIVREE',
            'date_livraison_reelle' => now(),
        ]);
    }
}
