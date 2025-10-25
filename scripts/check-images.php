<?php

/**
 * Script de vérification des images Unsplash
 * Vérifie que toutes les URLs d'images sont accessibles
 */

require_once __DIR__ . '/../vendor/autoload.php';

class ImageChecker
{
    private $baseUrl = 'https://images.unsplash.com/';
    private $testImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0c29c8a32c6?w=400&h=400&fit=crop',
    ];

    public function checkImages()
    {
        echo "🔍 Vérification des images Unsplash...\n\n";
        
        $accessible = 0;
        $total = count($this->testImages);
        
        foreach ($this->testImages as $index => $url) {
            $status = $this->checkImageUrl($url);
            $accessible += $status ? 1 : 0;
            
            echo sprintf(
                "[%d/%d] %s - %s\n",
                $index + 1,
                $total,
                $status ? '✅' : '❌',
                $url
            );
        }
        
        echo "\n📊 Résultats :\n";
        echo "✅ Images accessibles : $accessible/$total\n";
        echo "❌ Images inaccessibles : " . ($total - $accessible) . "/$total\n";
        
        if ($accessible === $total) {
            echo "\n🎉 Toutes les images sont accessibles !\n";
        } else {
            echo "\n⚠️  Certaines images ne sont pas accessibles.\n";
        }
        
        return $accessible === $total;
    }
    
    private function checkImageUrl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return $httpCode >= 200 && $httpCode < 400;
    }
    
    public function showImageInfo()
    {
        echo "📸 Informations sur les images utilisées :\n\n";
        
        echo "🎨 Types d'images :\n";
        echo "  • Portraits de créateurs\n";
        echo "  • Images de mode et couture\n";
        echo "  • Ateliers et équipements\n";
        echo "  • Tissus et matériaux\n";
        echo "  • Projets de couture\n";
        echo "  • Logos et marques\n\n";
        
        echo "🔗 Format des URLs :\n";
        echo "  • Base : https://images.unsplash.com/\n";
        echo "  • ID : photo-[ID_UNIQUE]\n";
        echo "  • Paramètres : ?w=[WIDTH]&h=[HEIGHT]&fit=crop\n\n";
        
        echo "⚖️  Licence :\n";
        echo "  • Plateforme : Unsplash.com\n";
        echo "  • Licence : Unsplash License (gratuite)\n";
        echo "  • Usage commercial : ✅ Autorisé\n";
        echo "  • Modification : ✅ Autorisée\n";
        echo "  • Attribution : ✅ Recommandée\n\n";
        
        echo "🎯 Avantages :\n";
        echo "  • ✅ 100% légal et gratuit\n";
        echo "  • ✅ Images haute qualité\n";
        echo "  • ✅ Pas de watermark\n";
        echo "  • ✅ API disponible\n";
        echo "  • ✅ Utilisation commerciale autorisée\n";
    }
}

// Exécution du script
$checker = new ImageChecker();

echo "🌹 Atcho - Vérificateur d'Images\n";
echo "================================\n\n";

$checker->showImageInfo();
echo "\n" . str_repeat("=", 50) . "\n\n";

$success = $checker->checkImages();

if ($success) {
    echo "\n🚀 Toutes les images sont prêtes pour la production !\n";
    exit(0);
} else {
    echo "\n⚠️  Vérifiez les images inaccessibles.\n";
    exit(1);
}


