import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Tag, Calendar, Settings, CheckCircle, XCircle } from 'lucide-react';
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
    categorieService: CategorieService;
}

export default function CategorieServiceShow({ categorieService }: Props) {
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (isActive: boolean) => {
        return isActive ? 'Active' : 'Inactive';
    };

    const getStatusIcon = (isActive: boolean) => {
        return isActive ? 
            <CheckCircle className="h-5 w-5 text-green-600" /> : 
            <XCircle className="h-5 w-5 text-gray-600" />;
    };

    return (
        <AdminLayout>
            <Head title={`Catégorie - ${categorieService.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/categories-services">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{categorieService.nom}</h1>
                            <p className="text-muted-foreground">Détails de la catégorie de service</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/categories-services/${categorieService.id}/edit`}>
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
                                <Tag className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(categorieService.est_active)}
                                    <Badge className={getStatusColor(categorieService.est_active)}>
                                        {getStatusText(categorieService.est_active)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Ordre d'affichage:</span>
                                <Badge variant="outline">#{categorieService.ordre_affichage}</Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Icône:</span>
                                <span className="text-2xl">{categorieService.icone}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Couleur:</span>
                                <div 
                                    className="w-6 h-6 rounded border"
                                    style={{ backgroundColor: categorieService.couleur }}
                                ></div>
                                <span className="text-sm text-muted-foreground">{categorieService.couleur}</span>
                            </div>
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
                                <span className="font-medium">Créée le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(categorieService.created_at).toLocaleDateString('fr-FR', {
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
                                    {new Date(categorieService.updated_at).toLocaleDateString('fr-FR', {
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

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Tag className="mr-2 h-5 w-5" />
                            Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{categorieService.description}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Aperçu de la catégorie
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: categorieService.couleur + '20' }}>
                            <span className="text-2xl">{categorieService.icone}</span>
                            <div>
                                <h3 className="font-semibold text-lg" style={{ color: categorieService.couleur }}>
                                    {categorieService.nom}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {categorieService.description}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
