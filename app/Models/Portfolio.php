<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'image_principale',
        'image_couverture',
        'galerie_images',
        'logo_atelier',
        'est_public',
        'date_creation',
        'atelier_id',
    ];

    protected function casts(): array
    {
        return [
            'galerie_images' => 'array',
            'est_public' => 'boolean',
            'date_creation' => 'datetime',
        ];
    }

    // Relations
    public function atelier()
    {
        return $this->belongsTo(User::class, 'atelier_id');
    }

    public function items()
    {
        return $this->hasMany(ItemPortfolio::class);
    }
}
