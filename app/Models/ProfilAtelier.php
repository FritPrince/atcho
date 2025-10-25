<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilAtelier extends Model
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
        'nom_atelier',
        'photo_profil',
        'photo_couverture',
        'galerie_images',
        'logo_atelier',
        'images_equipements',
        'description',
        'specialites',
        'equipements',
        'capacite_production',
        'delai_moyen_jours',
        'tarif_horaire',
        'est_certifie',
        'certifications',
        'description_entreprise',
        'annee_creation',
        'type_entreprise',
        'numero_siret',
        'taille_equipe',
        'tarif_horaire_moyen',
        'delai_livraison_moyen_jours',
        'capacite_production_mensuelle',
        'note_moyenne',
        'nombre_projets_realises',
        'accepte_urgences',
        'rayon_intervention_km',
        'specialites_textiles',
    ];

    protected function casts(): array
    {
        return [
            'galerie_images' => 'array',
            'images_equipements' => 'array',
            'specialites' => 'array',
            'specialites_textiles' => 'array',
            'equipements' => 'array',
            'certifications' => 'array',
            'accepte_urgences' => 'boolean',
            'est_certifie' => 'boolean',
            'tarif_horaire' => 'decimal:2',
            'tarif_horaire_moyen' => 'decimal:2',
            'note_moyenne' => 'decimal:2',
        ];
    }

    // Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }

    public function devis()
    {
        return $this->hasMany(Devis::class, 'atelier_id', 'utilisateur_id');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'atelier_id', 'utilisateur_id');
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class, 'atelier_id', 'utilisateur_id');
    }

    public function specialites()
    {
        return $this->belongsToMany(CategorieService::class, 'atelier_specialites')
            ->withPivot('niveau_expertise', 'tarif_horaire')
            ->withTimestamps();
    }

    public function avis()
    {
        return $this->hasManyThrough(Avis::class, User::class, 'id', 'destinataire_id', 'utilisateur_id');
    }

    // Scopes
    public function scopeParTypeEntreprise($query, $type)
    {
        return $query->where('type_entreprise', $type);
    }

    public function scopeDansRayon($query, $latitude, $longitude, $rayonKm)
    {
        return $query->whereHas('utilisateur.adresse', function ($q) use ($latitude, $longitude, $rayonKm) {
            $q->whereRaw(
                'ST_Distance_Sphere(POINT(longitude, latitude), POINT(?, ?)) <= ?',
                [$longitude, $latitude, $rayonKm * 1000]
            );
        });
    }

    public function scopeParTarifMax($query, $tarifMax)
    {
        return $query->where('tarif_horaire_moyen', '<=', $tarifMax);
    }

    public function scopeParDelaiMax($query, $delaiMax)
    {
        return $query->where('delai_livraison_moyen_jours', '<=', $delaiMax);
    }

    public function scopeAccepteUrgences($query)
    {
        return $query->where('accepte_urgences', true);
    }

    public function scopeParNoteMin($query, $noteMin)
    {
        return $query->where('note_moyenne', '>=', $noteMin);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('nom_atelier', 'like', "%{$terme}%")
            ->orWhere('description_entreprise', 'like', "%{$terme}%")
            ->orWhereHas('utilisateur', function ($q) use ($terme) {
                $q->where('prenom', 'like', "%{$terme}%")
                    ->orWhere('nom', 'like', "%{$terme}%");
            });
    }

    // Accessors
    public function getTypeEntrepriseLabelAttribute()
    {
        return match ($this->type_entreprise) {
            'INDIVIDUEL' => 'Individuel',
            'SARL' => 'SARL',
            'SA' => 'SA',
            'AUTO_ENTREPRENEUR' => 'Auto-entrepreneur',
            default => $this->type_entreprise,
        };
    }

    public function getNoteMoyenneFormateeAttribute()
    {
        return number_format((float) $this->note_moyenne, 1);
    }

    public function getTarifHoraireFormateAttribute()
    {
        return $this->tarif_horaire_moyen ? number_format((float) $this->tarif_horaire_moyen, 2).' €/h' : 'Non renseigné';
    }

    // Méthodes
    public function calculerNoteMoyenne()
    {
        $noteMoyenne = $this->avis()->avg('note');
        $this->update(['note_moyenne' => $noteMoyenne ?? 0]);

        return $noteMoyenne;
    }

    public function incrementerProjetsRealises()
    {
        $this->increment('nombre_projets_realises');
    }
}
