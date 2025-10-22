<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'montant',
        'methode',
        'statut',
        'date_paiement',
        'details_transaction',
        'commande_id',
        'payeur_id',
        'beneficiaire_id',
    ];

    protected function casts(): array
    {
        return [
            'montant' => 'decimal:2',
            'date_paiement' => 'datetime',
            'details_transaction' => 'array',
        ];
    }

    // Relations
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function payeur()
    {
        return $this->belongsTo(User::class, 'payeur_id');
    }

    public function beneficiaire()
    {
        return $this->belongsTo(User::class, 'beneficiaire_id');
    }
}
