<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageSupport extends Model
{
    use HasFactory;

    protected $table = 'message_supports';

    protected $fillable = [
        'contenu',
        'est_interne',
        'date_envoi',
        'auteur_id',
        'ticket_id',
    ];

    protected function casts(): array
    {
        return [
            'est_interne' => 'boolean',
            'date_envoi' => 'datetime',
        ];
    }

    // Relations
    public function auteur()
    {
        return $this->belongsTo(User::class, 'auteur_id');
    }

    public function ticket()
    {
        return $this->belongsTo(TicketSupport::class, 'ticket_id');
    }

    // Scopes
    public function scopeInternes($query)
    {
        return $query->where('est_interne', true);
    }

    public function scopePublics($query)
    {
        return $query->where('est_interne', false);
    }

    public function scopeParTicket($query, $ticketId)
    {
        return $query->where('ticket_id', $ticketId);
    }

    public function scopeParAuteur($query, $auteurId)
    {
        return $query->where('auteur_id', $auteurId);
    }

    public function scopeRecents($query, $jours = 7)
    {
        return $query->where('date_envoi', '>=', now()->subDays($jours));
    }

    // Accessors
    public function getTypeMessageAttribute()
    {
        return $this->est_interne ? 'Interne' : 'Public';
    }

    public function getContenuTronqueAttribute()
    {
        return strlen($this->contenu) > 100
            ? substr($this->contenu, 0, 100).'...'
            : $this->contenu;
    }

    // Méthodes
    public function estInterne()
    {
        return $this->est_interne;
    }

    public function estPublic()
    {
        return !$this->est_interne;
    }

    public function getTempsEcouleAttribute()
    {
        $now = now();
        $diff = $now->diffInMinutes($this->date_envoi);

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

        return $this->date_envoi->format('d/m/Y');
    }

    public function marquerCommeLu()
    {
        // Logique pour marquer le message comme lu si nécessaire
        return true;
    }
}
