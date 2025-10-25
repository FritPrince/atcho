<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    use HasFactory;

    protected $table = 'addresses';

    protected $fillable = [
        'ligne1',
        'ligne2',
        'code_postal',
        'ville',
        'pays',
        'region',
        'latitude',
        'longitude',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
        ];
    }

    // Relations
    public function utilisateurs()
    {
        return $this->hasMany(User::class);
    }


    public function rendezVous()
    {
        return $this->hasMany(RendezVous::class);
    }

    // Scopes
    public function scopeDansRayon($query, $latitude, $longitude, $rayonKm)
    {
        return $query->whereRaw(
            'ST_Distance_Sphere(POINT(longitude, latitude), POINT(?, ?)) <= ?',
            [$longitude, $latitude, $rayonKm * 1000]
        );
    }

    public function scopeParVille($query, $ville)
    {
        return $query->where('ville', 'like', "%{$ville}%");
    }

    public function scopeParCodePostal($query, $codePostal)
    {
        return $query->where('code_postal', 'like', "%{$codePostal}%");
    }

    // Accessors
    public function getAdresseCompleteAttribute()
    {
        $adresse = $this->ligne1;
        if ($this->ligne2) {
            $adresse .= ', '.$this->ligne2;
        }
        $adresse .= ', '.$this->code_postal.' '.$this->ville;
        if ($this->region) {
            $adresse .= ', '.$this->region;
        }
        $adresse .= ', '.$this->pays;

        return $adresse;
    }
}
