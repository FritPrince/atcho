<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_fichier',
        'type',
        'url',
        'taille',
        'description',
        'date_upload',
        'proprietaire_id',
        'projet_associe_id',
        'est_public',
    ];

    protected function casts(): array
    {
        return [
            'date_upload' => 'datetime',
            'est_public' => 'boolean',
        ];
    }

    // Relations
    public function proprietaire()
    {
        return $this->belongsTo(User::class, 'proprietaire_id');
    }

    public function projetAssocie()
    {
        return $this->belongsTo(Projet::class, 'projet_associe_id');
    }
}
