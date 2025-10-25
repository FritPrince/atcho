<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilCreateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'nom_marque',
        'photo_profil',
        'photo_couverture',
        'galerie_images',
        'logo_marque',
        'style',
        'site_web',
        'instagram',
        'experience',
        'secteur',
        'specialites_textiles',
    ];

    protected function casts(): array
    {
        return [
            'galerie_images' => 'array',
            'specialites_textiles' => 'array',
        ];
    }

    // Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    public function projets()
    {
        return $this->hasMany(Projet::class, 'createur_id', 'utilisateur_id');
    }

    // Scopes
    public function scopeParStyle($query, $style)
    {
        return $query->where('style', $style);
    }

    public function scopeParExperience($query, $experience)
    {
        return $query->where('experience', $experience);
    }

    public function scopeParSecteur($query, $secteur)
    {
        return $query->where('secteur', $secteur);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('nom_marque', 'like', "%{$terme}%")
            ->orWhereHas('utilisateur', function ($q) use ($terme) {
                $q->where('prenom', 'like', "%{$terme}%")
                    ->orWhere('nom', 'like', "%{$terme}%");
            });
    }

    // Accessors
    public function getStyleLabelAttribute()
    {
        return match ($this->style) {
            'LUXE' => 'Luxe',
            'STREETWEAR' => 'Streetwear',
            'ECO_RESPONSABLE' => 'Éco-responsable',
            'CLASSIQUE' => 'Classique',
            'MODERNE' => 'Moderne',
            'VINTAGE' => 'Vintage',
            default => $this->style,
        };
    }

    public function getExperienceLabelAttribute()
    {
        return match ($this->experience) {
            'DEBUTANT' => 'Débutant',
            'INTERMEDIAIRE' => 'Intermédiaire',
            'EXPERT' => 'Expert',
            default => $this->experience,
        };
    }

    public function getSecteurLabelAttribute()
    {
        return match ($this->secteur) {
            'PRET_A_PORTER' => 'Prêt-à-porter',
            'ACCESSOIRES' => 'Accessoires',
            'MARIAGE' => 'Mariage',
            'HAUTE_COUTURE' => 'Haute couture',
            'SPORT' => 'Sport',
            default => $this->secteur,
        };
    }
}
