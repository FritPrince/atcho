<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'contenu',
        'type',
        'fichier_url',
        'date_envoi',
        'est_lu',
        'expediteur_id',
        'conversation_id',
    ];

    protected function casts(): array
    {
        return [
            'est_lu' => 'boolean',
            'date_envoi' => 'datetime',
        ];
    }

    // Relations
    public function expediteur()
    {
        return $this->belongsTo(User::class, 'expediteur_id');
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function signalements()
    {
        return $this->hasMany(Signalement::class, 'message_concerne_id');
    }

    // Scopes
    public function scopeParType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeNonLus($query)
    {
        return $query->where('est_lu', false);
    }

    public function scopeLus($query)
    {
        return $query->where('est_lu', true);
    }

    public function scopeParConversation($query, $conversationId)
    {
        return $query->where('conversation_id', $conversationId);
    }

    public function scopeParExpediteur($query, $expediteurId)
    {
        return $query->where('expediteur_id', $expediteurId);
    }

    public function scopeRecherche($query, $terme)
    {
        return $query->where('contenu', 'like', "%{$terme}%");
    }

    // Accessors
    public function getTypeLabelAttribute()
    {
        return match ($this->type) {
            'TEXTE' => 'Texte',
            'IMAGE' => 'Image',
            'FICHIER' => 'Fichier',
            default => $this->type,
        };
    }

    public function getContenuTronqueAttribute()
    {
        return strlen($this->contenu) > 100
            ? substr($this->contenu, 0, 100).'...'
            : $this->contenu;
    }

    // Méthodes
    public function marquerCommeLu()
    {
        $this->update(['est_lu' => true]);
    }

    public function estImage()
    {
        return $this->type === 'IMAGE';
    }

    public function estFichier()
    {
        return $this->type === 'FICHIER';
    }

    public function estTexte()
    {
        return $this->type === 'TEXTE';
    }

    public function getExtensionFichier()
    {
        if ($this->fichier_url) {
            return pathinfo($this->fichier_url, PATHINFO_EXTENSION);
        }

        return null;
    }

    public function getTailleFichier()
    {
        if ($this->fichier_url && file_exists(public_path($this->fichier_url))) {
            return filesize(public_path($this->fichier_url));
        }

        return null;
    }

    public function getTailleFichierFormatee()
    {
        $taille = $this->getTailleFichier();
        if (! $taille) {
            return null;
        }

        $units = ['B', 'KB', 'MB', 'GB'];
        $unitIndex = 0;

        while ($taille >= 1024 && $unitIndex < count($units) - 1) {
            $taille /= 1024;
            $unitIndex++;
        }

        return round($taille, 2).' '.$units[$unitIndex];
    }
}
