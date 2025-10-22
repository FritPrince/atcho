<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materiau extends Model
{
    use HasFactory;

    protected $table = 'materiaux';

    protected $fillable = [
        'nom',
        'type',
        'description',
        'image_url',
        'difficulte',
        'est_active',
    ];

    protected function casts(): array
    {
        return [
            'est_active' => 'boolean',
        ];
    }

    // Relations
    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'projet_materiaux')
            ->withPivot('quantite', 'notes')
            ->withTimestamps();
    }

    // Scopes
    public function scopeActifs($query)
    {
        return $query->where('est_active', true);
    }

    public function scopeParType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeParDifficulte($query, $difficulte)
    {
        return $query->where('difficulte', $difficulte);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('nom', 'like', "%{$terme}%")
            ->orWhere('description', 'like', "%{$terme}%");
    }

    // Accessors
    public function getDifficulteLabelAttribute()
    {
        return match ($this->difficulte) {
            'FACILE' => 'Facile',
            'MOYEN' => 'Moyen',
            'DIFFICILE' => 'Difficile',
            default => $this->difficulte,
        };
    }
}
