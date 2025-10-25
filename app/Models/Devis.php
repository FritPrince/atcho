<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'description',
        'montant',
        'delai_jours',
        'image_devis',
        'images_produits',
        'images_maquettes',
        'images_materiaux',
        'date_creation',
        'date_expiration',
        'conditions_paiement',
        'garantie',
        'statut',
        'projet_id',
        'atelier_id',
    ];

    protected function casts(): array
    {
        return [
            'montant' => 'decimal:2',
            'images_produits' => 'array',
            'images_maquettes' => 'array',
            'images_materiaux' => 'array',
            'date_creation' => 'datetime',
            'date_expiration' => 'datetime',
        ];
    }

    // Relations
    public function projet()
    {
        return $this->belongsTo(Projet::class);
    }

    public function atelier()
    {
        return $this->belongsTo(User::class, 'atelier_id');
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

    public function scopeParProjet($query, $projetId)
    {
        return $query->where('projet_id', $projetId);
    }

    public function scopeEnAttente($query)
    {
        return $query->where('statut', 'EN_ATTENTE');
    }

    public function scopeAcceptes($query)
    {
        return $query->where('statut', 'ACCEPTE');
    }

    public function scopeExpires($query)
    {
        return $query->where('date_expiration', '<', now());
    }

    public function scopeParMontantMax($query, $montantMax)
    {
        return $query->where('montant', '<=', $montantMax);
    }

    public function scopeParDelaiMax($query, $delaiMax)
    {
        return $query->where('delai_jours', '<=', $delaiMax);
    }

    // Accessors
    public function getStatutLabelAttribute()
    {
        return match ($this->statut) {
            'EN_ATTENTE' => 'En attente',
            'ACCEPTE' => 'Accepté',
            'REFUSE' => 'Refusé',
            'EXPIRE' => 'Expiré',
            default => $this->statut,
        };
    }

    public function getMontantFormateAttribute()
    {
        return number_format((float) $this->montant, 2).' €';
    }

    public function getDelaiFormateAttribute()
    {
        return $this->delai_jours.' jour(s)';
    }

    // Méthodes
    public function estExpire()
    {
        return $this->date_expiration && $this->date_expiration < now();
    }

    public function peutEtreModifie()
    {
        return $this->statut === 'EN_ATTENTE';
    }

    public function accepter()
    {
        $this->update(['statut' => 'ACCEPTE']);

        // Refuser tous les autres devis du même projet
        $this->projet->devis()
            ->where('id', '!=', $this->id)
            ->update(['statut' => 'REFUSE']);
    }

    public function refuser()
    {
        $this->update(['statut' => 'REFUSE']);
    }

    public function expirer()
    {
        $this->update(['statut' => 'EXPIRE']);
    }
}
