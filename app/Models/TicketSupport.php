<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketSupport extends Model
{
    use HasFactory;

    protected $table = 'ticket_supports';

    protected $fillable = [
        'sujet',
        'description',
        'priorite',
        'statut',
        'categorie',
        'date_creation',
        'date_resolution',
        'createur_id',
        'assigne_a_id',
    ];

    protected function casts(): array
    {
        return [
            'date_creation' => 'datetime',
            'date_resolution' => 'datetime',
        ];
    }

    // Relations
    public function createur()
    {
        return $this->belongsTo(User::class, 'createur_id');
    }

    public function assigneA()
    {
        return $this->belongsTo(User::class, 'assigne_a_id');
    }

    public function messages()
    {
        return $this->hasMany(MessageSupport::class, 'ticket_id');
    }

    // Scopes
    public function scopeParStatut($query, $statut)
    {
        return $query->where('statut', $statut);
    }

    public function scopeParPriorite($query, $priorite)
    {
        return $query->where('priorite', $priorite);
    }

    public function scopeParCategorie($query, $categorie)
    {
        return $query->where('categorie', $categorie);
    }

    public function scopeParCreateur($query, $createurId)
    {
        return $query->where('createur_id', $createurId);
    }

    public function scopeParAssignation($query, $assigneId)
    {
        return $query->where('assigne_a_id', $assigneId);
    }

    public function scopeOuverts($query)
    {
        return $query->whereIn('statut', ['OUVERT', 'EN_COURS']);
    }

    public function scopeResolus($query)
    {
        return $query->where('statut', 'RESOLU');
    }

    public function scopeUrgents($query)
    {
        return $query->where('priorite', 'URGENTE');
    }

    // Accessors
    public function getStatutLabelAttribute()
    {
        return match ($this->statut) {
            'OUVERT' => 'Ouvert',
            'EN_COURS' => 'En cours',
            'RESOLU' => 'Résolu',
            'FERME' => 'Fermé',
            default => $this->statut,
        };
    }

    public function getPrioriteLabelAttribute()
    {
        return match ($this->priorite) {
            'BASSE' => 'Basse',
            'MOYENNE' => 'Moyenne',
            'HAUTE' => 'Haute',
            'URGENTE' => 'Urgente',
            default => $this->priorite,
        };
    }

    public function getCategorieLabelAttribute()
    {
        return match ($this->categorie) {
            'TECHNIQUE' => 'Technique',
            'FACTURATION' => 'Facturation',
            'SIGNALEMENT' => 'Signalement',
            'AUTRE' => 'Autre',
            default => $this->categorie,
        };
    }

    // Méthodes
    public function estOuvert()
    {
        return in_array($this->statut, ['OUVERT', 'EN_COURS']);
    }

    public function estResolu()
    {
        return $this->statut === 'RESOLU';
    }

    public function estFerme()
    {
        return $this->statut === 'FERME';
    }

    public function assigner($userId)
    {
        $this->update([
            'assigne_a_id' => $userId,
            'statut' => 'EN_COURS'
        ]);
    }

    public function resoudre()
    {
        $this->update([
            'statut' => 'RESOLU',
            'date_resolution' => now()
        ]);
    }

    public function fermer()
    {
        $this->update(['statut' => 'FERME']);
    }

    public function getDureeResolution()
    {
        if ($this->date_creation && $this->date_resolution) {
            return $this->date_creation->diffInHours($this->date_resolution);
        }
        return null;
    }

    public function getDernierMessage()
    {
        return $this->messages()->latest()->first();
    }

    public function getNombreMessages()
    {
        return $this->messages()->count();
    }
}
