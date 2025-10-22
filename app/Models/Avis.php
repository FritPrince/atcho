<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'commentaire',
        'type_projet',
        'date',
        'est_verifie',
        'auteur_id',
        'destinataire_id',
        'projet_associe_id',
    ];

    protected function casts(): array
    {
        return [
            'est_verifie' => 'boolean',
            'date' => 'datetime',
        ];
    }

    // Relations
    public function auteur()
    {
        return $this->belongsTo(User::class, 'auteur_id');
    }

    public function destinataire()
    {
        return $this->belongsTo(User::class, 'destinataire_id');
    }

    public function projetAssocie()
    {
        return $this->belongsTo(Projet::class, 'projet_associe_id');
    }
}
