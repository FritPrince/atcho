<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SouscriptionAbonnement extends Model
{
    use HasFactory;

    protected $table = 'souscription_abonnements';

    protected $fillable = [
        'utilisateur_id',
        'abonnement_id',
        'date_debut',
        'date_fin',
        'statut',
        'prix_paye',
        'reference_paiement',
    ];

    protected function casts(): array
    {
        return [
            'date_debut' => 'datetime',
            'date_fin' => 'datetime',
            'prix_paye' => 'decimal:2',
        ];
    }

    // Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class);
    }

    public function abonnement()
    {
        return $this->belongsTo(Abonnement::class);
    }

    // Scopes
    public function scopeActives($query)
    {
        return $query->where('statut', 'ACTIF');
    }

    public function scopeExpirees($query)
    {
        return $query->where('statut', 'EXPIRE');
    }

    public function scopeAnnulees($query)
    {
        return $query->where('statut', 'ANNULE');
    }

    public function scopeParUtilisateur($query, $utilisateurId)
    {
        return $query->where('utilisateur_id', $utilisateurId);
    }

    public function scopeParAbonnement($query, $abonnementId)
    {
        return $query->where('abonnement_id', $abonnementId);
    }

    public function scopeEnCours($query)
    {
        return $query->where('statut', 'ACTIF')
            ->where('date_debut', '<=', now())
            ->where('date_fin', '>=', now());
    }

    public function scopeExpirantBientot($query, $jours = 7)
    {
        return $query->where('statut', 'ACTIF')
            ->where('date_fin', '<=', now()->addDays($jours))
            ->where('date_fin', '>=', now());
    }

    // Accessors
    public function getStatutLabelAttribute()
    {
        return match ($this->statut) {
            'ACTIF' => 'Actif',
            'EXPIRE' => 'Expiré',
            'ANNULE' => 'Annulé',
            default => $this->statut,
        };
    }

    public function getPrixFormateAttribute()
    {
        return number_format((float) $this->prix_paye, 2).' €';
    }

    public function getDureeRestanteAttribute()
    {
        if ($this->date_fin && $this->statut === 'ACTIF') {
            $joursRestants = now()->diffInDays($this->date_fin, false);
            return $joursRestants > 0 ? $joursRestants : 0;
        }
        return 0;
    }

    // Méthodes
    public function estActive()
    {
        return $this->statut === 'ACTIF' 
            && $this->date_debut <= now() 
            && $this->date_fin >= now();
    }

    public function estExpiree()
    {
        return $this->statut === 'EXPIRE' || $this->date_fin < now();
    }

    public function expirer()
    {
        $this->update(['statut' => 'EXPIRE']);
    }

    public function annuler()
    {
        $this->update(['statut' => 'ANNULE']);
    }

    public function renouveler($nouvelleDateFin)
    {
        $this->update([
            'date_fin' => $nouvelleDateFin,
            'statut' => 'ACTIF'
        ]);
    }

    public function getJoursRestants()
    {
        if ($this->estActive()) {
            return max(0, now()->diffInDays($this->date_fin, false));
        }
        return 0;
    }
}
