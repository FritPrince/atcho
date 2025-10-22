<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieService extends Model
{
    use HasFactory;

    protected $table = 'categorie_services';

    protected $fillable = [
        'nom',
        'description',
        'icone',
        'ordre_affichage',
        'est_active',
    ];

    protected function casts(): array
    {
        return [
            'est_active' => 'boolean',
        ];
    }

    // Relations
    public function ateliers()
    {
        return $this->belongsToMany(ProfilAtelier::class, 'atelier_specialites')
            ->withPivot('niveau_expertise', 'tarif_horaire')
            ->withTimestamps();
    }

    // Scopes
    public function scopeActives($query)
    {
        return $query->where('est_active', true);
    }

    public function scopeParOrdre($query)
    {
        return $query->orderBy('ordre_affichage');
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('nom', 'like', "%{$terme}%")
            ->orWhere('description', 'like', "%{$terme}%");
    }
}
