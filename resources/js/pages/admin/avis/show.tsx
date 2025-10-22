import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Star, User, Calendar, FileText } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Avis {
    id: number;
    note: number;
    commentaire: string;
    statut: string;
    auteur: {
        id: number;
        name: string;
    };
    projet: {
        id: number;
        titre: string;
        description: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    avis: Avis;
}

export default function AvisShow({ avis }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLIE': return 'bg-green-100 text-green-800';
            case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
            case 'REJETE': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getNoteColor = (note: number) => {
        if (note >= 4) return 'text-green-600';
        if (note >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const renderStars = (note: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 ${
                    i < note ? 'fill-current text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <AdminLayout>
            <Head title={`Avis #${avis.id}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/avis">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Avis #{avis.id}</h1>
                            <p className="text-muted-foreground">Détails de l'avis</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/avis/${avis.id}/edit`}>
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
                                <Star className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Note:</span>
                                <div className="flex items-center">
                                    {renderStars(avis.note)}
                                </div>
                                <span className={`font-bold ${getNoteColor(avis.note)}`}>
                                    {avis.note}/5
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatusColor(avis.statut)}>
                                    {avis.statut}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Auteur:</span>
                                <span>{avis.auteur?.name || 'Non défini'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Projet:</span>
                                <span>{avis.projet?.titre || 'Non défini'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                Commentaire
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{avis.commentaire}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Informations du projet
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-medium">Titre du projet:</span>
                            <p className="text-sm text-muted-foreground">{avis.projet?.titre || 'Non défini'}</p>
                        </div>
                        <div>
                            <span className="font-medium">Description:</span>
                            <p className="text-sm text-muted-foreground">{avis.projet?.description || 'Non définie'}</p>
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
                            <span className="font-medium">Créé le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(avis.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(avis.updated_at).toLocaleDateString('fr-FR', {
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
