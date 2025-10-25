<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'prix_mensuel',
        'duree_jours',
        'avantages',
        'limite_projets',
        'limite_devis',
        'statistiques_avancees',
        'support_prioritaire',
        'est_actif',
    ];

    protected function casts(): array
    {
        return [
            'prix_mensuel' => 'decimal:2',
            'avantages' => 'array',
            'statistiques_avancees' => 'boolean',
            'support_prioritaire' => 'boolean',
            'est_actif' => 'boolean',
        ];
    }

    // Relations
    public function souscriptions()
    {
        return $this->hasMany(SouscriptionAbonnement::class);
    }

    // Scopes
    public function scopeActifs($query)
    {
        return $query->where('est_actif', true);
    }

    public function scopeParNom($query, $nom)
    {
        return $query->where('nom', $nom);
    }

    public function scopeParPrixMax($query, $prixMax)
    {
        return $query->where('prix_mensuel', '<=', $prixMax);
    }

    // Accessors
    public function getPrixFormateAttribute()
    {
        return number_format((float) $this->prix_mensuel, 2).' €/mois';
    }

    public function getDureeFormateeAttribute()
    {
        return $this->duree_jours.' jour(s)';
    }

    // Méthodes
    public function estPopulaire()
    {
        return $this->souscriptions()->count() > 10;
    }

    public function getNombreSouscriptions()
    {
        return $this->souscriptions()->count();
    }
}
