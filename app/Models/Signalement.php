<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Signalement extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'raison',
        'description',
        'statut',
        'date_signalement',
        'signalant_id',
        'signale_id',
        'projet_concerne_id',
        'message_concerne_id',
    ];

    protected function casts(): array
    {
        return [
            'date_signalement' => 'datetime',
        ];
    }

    // Relations
    public function signalant()
    {
        return $this->belongsTo(User::class, 'signalant_id');
    }

    public function signale()
    {
        return $this->belongsTo(User::class, 'signale_id');
    }

    public function projetConcerne()
    {
        return $this->belongsTo(Projet::class, 'projet_concerne_id');
    }

    public function messageConcerne()
    {
        return $this->belongsTo(Message::class, 'message_concerne_id');
    }
}
