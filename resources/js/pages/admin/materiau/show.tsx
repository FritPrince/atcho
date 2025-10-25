import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Package, Calendar, DollarSign, Hash, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
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
    materiau: Materiau;
}

export default function MateriauShow({ materiau }: Props) {
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (isActive: boolean) => {
        return isActive ? 'Actif' : 'Inactif';
    };

    const getStatusIcon = (isActive: boolean) => {
        return isActive ? 
            <CheckCircle className="h-5 w-5 text-green-600" /> : 
            <XCircle className="h-5 w-5 text-gray-600" />;
    };

    const getStockColor = (stock: number, stockMin: number) => {
        if (stock <= 0) return 'bg-red-100 text-red-800';
        if (stock <= stockMin) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getStockText = (stock: number, stockMin: number) => {
        if (stock <= 0) return 'Rupture de stock';
        if (stock <= stockMin) return 'Stock faible';
        return 'En stock';
    };

    const getStockIcon = (stock: number, stockMin: number) => {
        if (stock <= 0) return <AlertTriangle className="h-5 w-5 text-red-600" />;
        if (stock <= stockMin) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const getStockPercentage = (stock: number, stockMin: number) => {
        if (stockMin === 0) return 100;
        return Math.min((stock / (stockMin * 2)) * 100, 100);
    };

    return (
        <AdminLayout>
            <Head title={`Matériau - ${materiau.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/materiaux">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{materiau.nom}</h1>
                            <p className="text-muted-foreground">Détails du matériau</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/materiaux/${materiau.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </Link>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Package className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(materiau.est_actif)}
                                    <Badge className={getStatusColor(materiau.est_actif)}>
                                        {getStatusText(materiau.est_actif)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Prix unitaire:</span>
                                <span className="font-semibold text-green-600 text-lg">
                                    {formatPrice(materiau.prix_unitaire)}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Unité de mesure:</span>
                                <span className="text-sm text-muted-foreground">{materiau.unite_mesure}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Hash className="mr-2 h-5 w-5" />
                                Gestion du stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Stock disponible:</span>
                                <span className="font-semibold">
                                    {materiau.stock_disponible} {materiau.unite_mesure}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Stock minimum:</span>
                                <span className="text-sm text-muted-foreground">
                                    {materiau.stock_minimum} {materiau.unite_mesure}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">État du stock:</span>
                                <div className="flex items-center space-x-2">
                                    {getStockIcon(materiau.stock_disponible, materiau.stock_minimum)}
                                    <Badge className={getStockColor(materiau.stock_disponible, materiau.stock_minimum)}>
                                        {getStockText(materiau.stock_disponible, materiau.stock_minimum)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Niveau de stock</span>
                                    <span>{Math.round(getStockPercentage(materiau.stock_disponible, materiau.stock_minimum))}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            materiau.stock_disponible <= 0 ? 'bg-red-500' :
                                            materiau.stock_disponible <= materiau.stock_minimum ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${getStockPercentage(materiau.stock_disponible, materiau.stock_minimum)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Package className="mr-2 h-5 w-5" />
                            Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{materiau.description}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Dates importantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-medium">Créé le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(materiau.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        
                        <div>
                            <span className="font-medium">Dernière modification:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(materiau.updated_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


