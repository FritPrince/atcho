<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemPortfolio extends Model
{
    use HasFactory;

    protected $table = 'item_portfolios';

    protected $fillable = [
        'titre',
        'description',
        'images_urls',
        'competences_demonstrees',
        'date_realisation',
        'type_projet',
        'budget_realise',
        'delai_realisation_jours',
        'portfolio_id',
    ];

    protected function casts(): array
    {
        return [
            'images_urls' => 'array',
            'competences_demonstrees' => 'array',
            'date_realisation' => 'datetime',
            'budget_realise' => 'decimal:2',
        ];
    }

    // Relations
    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }
}
