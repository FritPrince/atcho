<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    use HasFactory;

    protected $table = 'competences';

    protected $fillable = [
        'nom',
        'categorie',
        'description',
        'icone',
        'est_active',
    ];

    protected function casts(): array
    {
        return [
            'est_active' => 'boolean',
        ];
    }

    // Relations
    public function utilisateurs()
    {
        return $this->belongsToMany(User::class, 'user_competences')
            ->withPivot('niveau', 'annees_experience')
            ->withTimestamps();
    }

    public function projets()
    {
        return $this->belongsToMany(Projet::class, 'projet_competences_requises')
            ->withPivot('est_obligatoire')
            ->withTimestamps();
    }

    public function itemPortfolios()
    {
        return $this->hasMany(ItemPortfolio::class, 'competences_demonstrees');
    }

    // Scopes
    public function scopeActives($query)
    {
        return $query->where('est_active', true);
    }

    public function scopeParCategorie($query, $categorie)
    {
        return $query->where('categorie', $categorie);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('nom', 'like', "%{$terme}%")
            ->orWhere('description', 'like', "%{$terme}%");
    }
}
