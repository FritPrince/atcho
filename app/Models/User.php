<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'password',
        'telephone',
        'photo_profil',
        'photo_couverture',
        'galerie_images',
        'bio',
        'adresse_id',
        'role',
        'est_verifie',
        'est_actif',
        'preferences_notifications',
        'date_inscription',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'preferences_notifications' => 'array',
            'galerie_images' => 'array',
            'date_inscription' => 'datetime',
            'est_verifie' => 'boolean',
            'est_actif' => 'boolean',
        ];
    }

    // Relations
    public function adresse()
    {
        return $this->belongsTo(Adresse::class);
    }

    public function profilCreateur()
    {
        return $this->hasOne(ProfilCreateur::class, 'utilisateur_id');
    }

    public function profilAtelier()
    {
        return $this->hasOne(ProfilAtelier::class, 'utilisateur_id');
    }

    public function projets()
    {
        return $this->hasMany(Projet::class, 'createur_id');
    }

    public function competences()
    {
        return $this->belongsToMany(Competence::class, 'user_competences')
            ->withPivot('niveau', 'annees_experience')
            ->withTimestamps();
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversation_participants')
            ->withPivot('derniere_lecture')
            ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'expediteur_id');
    }

    public function avisDonnes()
    {
        return $this->hasMany(Avis::class, 'auteur_id');
    }

    public function avisRecus()
    {
        return $this->hasMany(Avis::class, 'destinataire_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'destinataire_id');
    }

    public function statistiques()
    {
        return $this->hasOne(StatistiqueUtilisateur::class, 'utilisateur_id');
    }

    // Scopes
    public function scopeCreateurs($query)
    {
        return $query->where('role', 'CREATEUR');
    }

    public function scopeAteliers($query)
    {
        return $query->where('role', 'ATELIER');
    }

    public function scopePrestataires($query)
    {
        return $query->where('role', 'PRESTATAIRE');
    }

    public function scopeAdmins($query)
    {
        return $query->where('role', 'ADMIN');
    }

    public function scopeActifs($query)
    {
        return $query->where('est_actif', true);
    }

    public function scopeVerifies($query)
    {
        return $query->where('est_verifie', true);
    }

    // Accessors
    public function getNameAttribute()
    {
        return trim($this->prenom . ' ' . $this->nom);
    }
}
