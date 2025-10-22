<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CahierDesCharges extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description_detaille',
        'specifications_techniques',
        'materiaux_requis',
        'contraintes',
        'notes_supplementaires',
        'createur_id',
    ];

    protected function casts(): array
    {
        return [
            'specifications_techniques' => 'array',
            'materiaux_requis' => 'array',
            'contraintes' => 'array',
        ];
    }

    // Relations
    public function createur()
    {
        return $this->belongsTo(User::class, 'createur_id');
    }

    public function projets()
    {
        return $this->hasMany(Projet::class, 'cahier_des_charges_id');
    }

    // Scopes
    public function scopeParCreateur($query, $createurId)
    {
        return $query->where('createur_id', $createurId);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('titre', 'like', "%{$terme}%")
            ->orWhere('description_detaille', 'like', "%{$terme}%");
    }
}
