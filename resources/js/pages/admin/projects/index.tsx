import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FolderOpen } from 'lucide-react';
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
}

interface Props {
    projects: {
        data: Project[];
        links: any[];
        meta: any;
    };
}

export default function ProjectIndex({ projects }: Props) {
    // Protection contre les données manquantes
    const projectsList = projects?.data || [];
    
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
            <Head title="Gestion des Projets" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Projets</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les projets de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/projects/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Projet
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projectsList.map((project) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <FolderOpen className="mr-2 h-5 w-5" />
                                        {project.titre}
                                    </CardTitle>
                                    <Badge className={getStatusColor(project.statut)}>
                                        {project.statut}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Budget:</span> {project.budget}€
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Créateur:</span> {project.createur?.name || 'Non défini'}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/projects/${project.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/projects/${project.id}/edit`}>
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
