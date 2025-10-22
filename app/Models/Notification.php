<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'message',
        'type',
        'est_lue',
        'date_creation',
        'lien_action',
        'destinataire_id',
        'emetteur_id',
    ];

    protected function casts(): array
    {
        return [
            'est_lue' => 'boolean',
            'date_creation' => 'datetime',
        ];
    }

    // Relations
    public function destinataire()
    {
        return $this->belongsTo(User::class, 'destinataire_id');
    }

    public function emetteur()
    {
        return $this->belongsTo(User::class, 'emetteur_id');
    }

    // Scopes
    public function scopeNonLues($query)
    {
        return $query->where('est_lue', false);
    }

    public function scopeLues($query)
    {
        return $query->where('est_lue', true);
    }

    public function scopeParType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeParDestinataire($query, $destinataireId)
    {
        return $query->where('destinataire_id', $destinataireId);
    }

    public function scopeRecentes($query, $jours = 7)
    {
        return $query->where('date_creation', '>=', now()->subDays($jours));
    }

    // Accessors
    public function getTypeLabelAttribute()
    {
        return match ($this->type) {
            'MESSAGE' => 'Message',
            'DEVIS' => 'Devis',
            'PROJET' => 'Projet',
            'SYSTEME' => 'Système',
            'AVIS' => 'Avis',
            default => $this->type,
        };
    }

    public function getTempsEcouleAttribute()
    {
        $now = now();
        $diff = $now->diffInMinutes($this->date_creation);

        if ($diff < 1) {
            return 'À l\'instant';
        }
        if ($diff < 60) {
            return $diff.' min';
        }
        if ($diff < 1440) {
            return floor($diff / 60).'h';
        }
        if ($diff < 10080) {
            return floor($diff / 1440).'j';
        }

        return $this->date_creation->format('d/m/Y');
    }

    // Méthodes
    public function marquerCommeLue()
    {
        $this->update(['est_lue' => true]);
    }

    public function marquerCommeNonLue()
    {
        $this->update(['est_lue' => false]);
    }

    public static function creer($destinataireId, $titre, $message, $type = 'SYSTEME', $lienAction = null, $emetteurId = null)
    {
        return static::create([
            'destinataire_id' => $destinataireId,
            'titre' => $titre,
            'message' => $message,
            'type' => $type,
            'lien_action' => $lienAction,
            'emetteur_id' => $emetteurId,
            'date_creation' => now(),
        ]);
    }

    public static function notifierNouveauDevis($projet, $devis)
    {
        return static::creer(
            $projet->createur_id,
            'Nouveau devis reçu',
            "Vous avez reçu un nouveau devis de {$devis->atelier->nom_atelier} pour le projet \"{$projet->titre}\"",
            'DEVIS',
            "/projets/{$projet->id}/devis",
            $devis->atelier->utilisateur_id
        );
    }

    public static function notifierDevisAccepte($devis)
    {
        return static::creer(
            $devis->atelier->utilisateur_id,
            'Devis accepté',
            "Votre devis pour le projet \"{$devis->projet->titre}\" a été accepté",
            'DEVIS',
            "/projets/{$devis->projet->id}",
            $devis->projet->createur_id
        );
    }

    public static function notifierNouveauMessage($conversation, $message)
    {
        $participants = $conversation->participants()->where('user_id', '!=', $message->expediteur_id)->get();

        foreach ($participants as $participant) {
            static::creer(
                $participant->id,
                'Nouveau message',
                "Nouveau message dans la conversation \"{$conversation->sujet}\"",
                'MESSAGE',
                "/conversations/{$conversation->id}",
                $message->expediteur_id
            );
        }
    }

    public static function notifierMiseAJourProjet($projet, $nouveauStatut)
    {
        $participants = $projet->conversations()->with('participants')->get()
            ->pluck('participants')->flatten()->unique('id');

        foreach ($participants as $participant) {
            static::creer(
                $participant->id,
                'Mise à jour du projet',
                "Le projet \"{$projet->titre}\" est maintenant {$projet->statut_label}",
                'PROJET',
                "/projets/{$projet->id}",
                $projet->createur_id
            );
        }
    }
}
