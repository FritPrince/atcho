import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Award, Calendar, Star, Users } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Competence {
    id: number;
    nom: string;
    description: string;
    niveau_requis: string;
    est_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    competences: {
        data: Competence[];
        links: any[];
        meta: any;
    };
}

export default function CompetenceIndex({ competences }: Props) {
    // Protection contre les données manquantes
    const competencesList = competences?.data || [];
    
    const getStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (isActive: boolean) => {
        return isActive ? 'Active' : 'Inactive';
    };

    const getNiveauColor = (niveau: string) => {
        switch (niveau.toLowerCase()) {
            case 'débutant':
                return 'bg-blue-100 text-blue-800';
            case 'intermédiaire':
                return 'bg-yellow-100 text-yellow-800';
            case 'avancé':
                return 'bg-orange-100 text-orange-800';
            case 'expert':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getNiveauStars = (niveau: string) => {
        switch (niveau.toLowerCase()) {
            case 'débutant':
                return 1;
            case 'intermédiaire':
                return 2;
            case 'avancé':
                return 3;
            case 'expert':
                return 4;
            default:
                return 1;
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Compétences" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Compétences</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les compétences disponibles
                        </p>
                    </div>
                    <Link href="/admin/competences/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Compétence
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {competencesList.map((competence) => (
                        <Card key={competence.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Award className="mr-2 h-5 w-5" />
                                        {competence.nom}
                                    </CardTitle>
                                    <Badge className={getStatusColor(competence.est_active)}>
                                        {getStatusText(competence.est_active)}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {competence.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Niveau:</span>
                                        <div className="flex items-center space-x-1">
                                            <Badge className={getNiveauColor(competence.niveau_requis)}>
                                                {competence.niveau_requis}
                                            </Badge>
                                            <div className="flex">
                                                {[...Array(4)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`h-3 w-3 ${
                                                            i < getNiveauStars(competence.niveau_requis) 
                                                                ? 'text-yellow-400 fill-current' 
                                                                : 'text-gray-300'
                                                        }`} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créée le {new Date(competence.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/competences/${competence.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/competences/${competence.id}/edit`}>
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
