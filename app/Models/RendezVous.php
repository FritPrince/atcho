<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
{
    use HasFactory;

    protected $table = 'rendez_vous';

    protected $fillable = [
        'titre',
        'description',
        'date_debut',
        'date_fin',
        'type',
        'statut',
        'lieu',
        'adresse_id',
        'createur_id',
        'participant_id',
        'projet_associe_id',
    ];

    protected function casts(): array
    {
        return [
            'date_debut' => 'datetime',
            'date_fin' => 'datetime',
        ];
    }

    // Relations
    public function adresse()
    {
        return $this->belongsTo(Adresse::class);
    }

    public function createur()
    {
        return $this->belongsTo(User::class, 'createur_id');
    }

    public function participant()
    {
        return $this->belongsTo(User::class, 'participant_id');
    }

    public function projetAssocie()
    {
        return $this->belongsTo(Projet::class, 'projet_associe_id');
    }
}
