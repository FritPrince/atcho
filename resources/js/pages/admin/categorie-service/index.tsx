import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Tag, Calendar, Settings } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface CategorieService {
    id: number;
    nom: string;
    description: string;
    icone: string;
    couleur: string;
    est_active: boolean;
    ordre_affichage: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    categoriesServices: {
        data: CategorieService[];
        links: any[];
        meta: any;
    };
}

export default function CategorieServiceIndex({ categoriesServices }: Props) {
    // Protection contre les données manquantes
    const categoriesList = categoriesServices?.data || [];
    
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (isActive: boolean) => {
        return isActive ? 'Active' : 'Inactive';
    };

    const getCouleurStyle = (couleur: string) => {
        return {
            backgroundColor: couleur,
            color: '#ffffff'
        };
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Catégories de Services" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Catégories de Services</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les catégories de services
                        </p>
                    </div>
                    <Link href="/admin/categories-services/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Catégorie
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoriesList.map((categorie) => (
                        <Card key={categorie.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Tag className="mr-2 h-5 w-5" />
                                        {categorie.nom}
                                    </CardTitle>
                                    <Badge className={getStatusColor(categorie.est_active)}>
                                        {getStatusText(categorie.est_active)}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {categorie.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">Icône:</span>
                                        <span className="text-lg">{categorie.icone}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium">Couleur:</span>
                                        <div 
                                            className="w-4 h-4 rounded-full border"
                                            style={{ backgroundColor: categorie.couleur }}
                                        ></div>
                                        <span className="text-sm text-muted-foreground">{categorie.couleur}</span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Settings className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Ordre:</span> #{categorie.ordre_affichage}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créée le {new Date(categorie.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/categories-services/${categorie.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/categories-services/${categorie.id}/edit`}>
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
