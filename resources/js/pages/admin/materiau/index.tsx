import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Package, Calendar, DollarSign, Hash } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Materiau {
    id: number;
    nom: string;
    description: string;
    prix_unitaire: number;
    unite_mesure: string;
    stock_disponible: number;
    stock_minimum: number;
    est_actif: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    materiaux: {
        data: Materiau[];
        links: any[];
        meta: any;
    };
}

export default function MateriauIndex({ materiaux }: Props) {
    // Protection contre les données manquantes
    const materiauxList = materiaux?.data || [];
    
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (isActive: boolean) => {
        return isActive ? 'Actif' : 'Inactif';
    };

    const getStockColor = (stock: number, stockMin: number) => {
        if (stock <= 0) return 'bg-red-100 text-red-800';
        if (stock <= stockMin) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getStockText = (stock: number, stockMin: number) => {
        if (stock <= 0) return 'Rupture';
        if (stock <= stockMin) return 'Stock faible';
        return 'En stock';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Matériaux" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Matériaux</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les matériaux disponibles
                        </p>
                    </div>
                    <Link href="/admin/materiaux/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Matériau
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {materiauxList.map((materiau) => (
                        <Card key={materiau.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Package className="mr-2 h-5 w-5" />
                                        {materiau.nom}
                                    </CardTitle>
                                    <Badge className={getStatusColor(materiau.est_actif)}>
                                        {getStatusText(materiau.est_actif)}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {materiau.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Prix:</span>
                                        <span className="font-semibold text-green-600">
                                            {formatPrice(materiau.prix_unitaire)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Hash className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Stock:</span> {materiau.stock_disponible} {materiau.unite_mesure}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">État du stock:</span>
                                        <Badge className={getStockColor(materiau.stock_disponible, materiau.stock_minimum)}>
                                            {getStockText(materiau.stock_disponible, materiau.stock_minimum)}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">Stock minimum:</span>
                                        <span className="text-sm text-muted-foreground">
                                            {materiau.stock_minimum} {materiau.unite_mesure}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créé le {new Date(materiau.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/materiaux/${materiau.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/materiaux/${materiau.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
