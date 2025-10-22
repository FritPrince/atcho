<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtapeProduction extends Model
{
    use HasFactory;

    protected $table = 'etapes_production';

    protected $fillable = [
        'nom',
        'description',
        'ordre',
        'duree_estimee_heures',
        'est_terminee',
        'date_debut',
        'date_completion',
        'photos',
        'commande_id',
    ];

    protected function casts(): array
    {
        return [
            'est_terminee' => 'boolean',
            'date_debut' => 'datetime',
            'date_completion' => 'datetime',
        ];
    }

    // Relations
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    // Scopes
    public function scopeTerminees($query)
    {
        return $query->where('est_terminee', true);
    }

    public function scopeEnCours($query)
    {
        return $query->where('est_terminee', false)
            ->whereNotNull('date_debut');
    }

    public function scopeEnAttente($query)
    {
        return $query->where('est_terminee', false)
            ->whereNull('date_debut');
    }

    public function scopeParOrdre($query)
    {
        return $query->orderBy('ordre');
    }

    // Méthodes
    public function demarrer()
    {
        $this->update([
            'date_debut' => now(),
        ]);
    }

    public function terminer()
    {
        $this->update([
            'est_terminee' => true,
            'date_completion' => now(),
        ]);

        // Passer à l'étape suivante
        $this->commande->passerEtapeSuivante();
    }

    public function getDureeReelleAttribute()
    {
        if ($this->date_debut && $this->date_completion) {
            return $this->date_debut->diffInHours($this->date_completion);
        }

        return null;
    }

    public function getPhotosArrayAttribute()
    {
        return $this->photos ? explode(',', $this->photos) : [];
    }

    public function setPhotosArrayAttribute($photos)
    {
        $this->photos = is_array($photos) ? implode(',', $photos) : $photos;
    }
}
