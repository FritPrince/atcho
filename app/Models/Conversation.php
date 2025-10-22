<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'sujet',
        'dernier_message',
        'date_dernier_message',
        'est_archive',
        'projet_associe_id',
    ];

    protected function casts(): array
    {
        return [
            'est_archive' => 'boolean',
            'date_dernier_message' => 'datetime',
        ];
    }

    // Relations
    public function participants()
    {
        return $this->belongsToMany(User::class, 'conversation_participants')
            ->withPivot('derniere_lecture')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function projetAssocie()
    {
        return $this->belongsTo(Projet::class, 'projet_associe_id');
    }

    // Scopes
    public function scopeArchives($query)
    {
        return $query->where('est_archive', true);
    }

    public function scopeActives($query)
    {
        return $query->where('est_archive', false);
    }

    public function scopeParParticipant($query, $userId)
    {
        return $query->whereHas('participants', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });
    }

    public function scopeParProjet($query, $projetId)
    {
        return $query->where('projet_associe_id', $projetId);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('sujet', 'like', "%{$terme}%")
            ->orWhere('dernier_message', 'like', "%{$terme}%");
    }

    // Méthodes
    public function ajouterParticipant($userId)
    {
        $this->participants()->syncWithoutDetaching([$userId]);
    }

    public function retirerParticipant($userId)
    {
        $this->participants()->detach($userId);
    }

    public function marquerCommeLue($userId)
    {
        $this->participants()->updateExistingPivot($userId, [
            'derniere_lecture' => now(),
        ]);
    }

    public function getNombreMessagesNonLus($userId)
    {
        $derniereLecture = $this->participants()
            ->where('user_id', $userId)
            ->first()
            ->pivot
            ->derniere_lecture ?? $this->created_at;

        return $this->messages()
            ->where('expediteur_id', '!=', $userId)
            ->where('date_envoi', '>', $derniereLecture)
            ->count();
    }

    public function mettreAJourDernierMessage($message)
    {
        $this->update([
            'dernier_message' => $message->contenu,
            'date_dernier_message' => $message->date_envoi,
        ]);
    }

    public function archiver()
    {
        $this->update(['est_archive' => true]);
    }

    public function desarchiver()
    {
        $this->update(['est_archive' => false]);
    }
}
