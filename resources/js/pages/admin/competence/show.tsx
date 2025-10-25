import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Award, Calendar, Star, CheckCircle, XCircle } from 'lucide-react';
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
    competence: Competence;
}

export default function CompetenceShow({ competence }: Props) {
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
            <Head title={`Compétence - ${competence.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/competences">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{competence.nom}</h1>
                            <p className="text-muted-foreground">Détails de la compétence</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/competences/${competence.id}/edit`}>
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
                                <Award className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(competence.est_active)}
                                    <Badge className={getStatusColor(competence.est_active)}>
                                        {getStatusText(competence.est_active)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Niveau requis:</span>
                                <div className="flex items-center space-x-2">
                                    <Badge className={getNiveauColor(competence.niveau_requis)}>
                                        {competence.niveau_requis}
                                    </Badge>
                                    <div className="flex">
                                        {[...Array(4)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`h-4 w-4 ${
                                                    i < getNiveauStars(competence.niveau_requis) 
                                                        ? 'text-yellow-400 fill-current' 
                                                        : 'text-gray-300'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                </div>
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
                                    {new Date(competence.created_at).toLocaleDateString('fr-FR', {
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
                                    {new Date(competence.updated_at).toLocaleDateString('fr-FR', {
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
                            <Award className="mr-2 h-5 w-5" />
                            Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{competence.description}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5" />
                            Niveau de compétence
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Niveau:</span>
                                <Badge className={getNiveauColor(competence.niveau_requis)}>
                                    {competence.niveau_requis}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className="text-sm text-muted-foreground">Évaluation:</span>
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`h-5 w-5 ${
                                                i < getNiveauStars(competence.niveau_requis) 
                                                    ? 'text-yellow-400 fill-current' 
                                                    : 'text-gray-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


