<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatistiqueUtilisateur extends Model
{
    use HasFactory;

    protected $table = 'statistique_utilisateurs';

    protected $fillable = [
        'utilisateur_id',
        'nombre_projets_postes',
        'nombre_devis_envoyes',
        'nombre_devis_recus',
        'nombre_transactions',
        'taux_reponse',
        'satisfaction_moyenne',
        'delai_moyen_reponse_heures',
        'date_mise_a_jour',
    ];

    protected function casts(): array
    {
        return [
            'taux_reponse' => 'decimal:2',
            'satisfaction_moyenne' => 'decimal:2',
            'date_mise_a_jour' => 'datetime',
        ];
    }

    // Relations
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'utilisateur_id');
    }
}
