import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, FolderOpen, Calendar, User, Euro } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Project {
    id: number;
    titre: string;
    description: string;
    budget: number;
    statut: string;
    createur: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    project: Project;
}

export default function ProjectShow({ project }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'BROUILLON': return 'bg-gray-100 text-gray-800';
            case 'PUBLIE': return 'bg-blue-100 text-blue-800';
            case 'EN_NEGOCIATION': return 'bg-yellow-100 text-yellow-800';
            case 'EN_COURS': return 'bg-green-100 text-green-800';
            case 'TERMINE': return 'bg-green-600 text-white';
            case 'ANNULE': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Projet - ${project.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/projects">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{project.titre}</h1>
                            <p className="text-muted-foreground">Détails du projet</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/projects/${project.id}/edit`}>
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
                                <FolderOpen className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Titre:</span>
                                <p className="text-sm text-muted-foreground">{project.titre}</p>
                            </div>
                            <div>
                                <span className="font-medium">Description:</span>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Euro className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Budget:</span>
                                <span>{project.budget}€</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatusColor(project.statut)}>
                                    {project.statut}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Créateur
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Créateur:</span>
                                <span>{project.createur?.name || 'Non défini'}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

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
                                {new Date(project.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(project.updated_at).toLocaleDateString('fr-FR', {
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
