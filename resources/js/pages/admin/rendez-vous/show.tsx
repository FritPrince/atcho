import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface RendezVous {
    id: number;
    titre: string;
    description: string;
    date_debut: string;
    date_fin: string;
    type: string;
    statut: string;
    lieu: string;
    createur: {
        id: number;
        name: string;
    };
    participant: {
        id: number;
        name: string;
    };
    adresse: {
        id: number;
        ligne1: string;
        ville: string;
    };
    projetAssocie: {
        id: number;
        titre: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    rendezVous: RendezVous;
}

export default function RendezVousShow({ rendezVous }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRME': return 'bg-green-100 text-green-800';
            case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
            case 'ANNULE': return 'bg-red-100 text-red-800';
            case 'TERMINE': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'CONSULTATION': return 'bg-blue-100 text-blue-800';
            case 'REUNION': return 'bg-purple-100 text-purple-800';
            case 'PRESENTATION': return 'bg-orange-100 text-orange-800';
            case 'FORMATION': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'CONFIRME': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'EN_ATTENTE': return <Clock className="h-5 w-5 text-yellow-600" />;
            case 'ANNULE': return <XCircle className="h-5 w-5 text-red-600" />;
            case 'TERMINE': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            default: return <Clock className="h-5 w-5 text-gray-600" />;
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDuration = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffMs = endDate.getTime() - startDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diffHours > 0) {
            return `${diffHours}h ${diffMinutes}min`;
        }
        return `${diffMinutes}min`;
    };

    return (
        <AdminLayout>
            <Head title={`Rendez-vous - ${rendezVous.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/rendez-vous">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{rendezVous.titre}</h1>
                            <p className="text-muted-foreground">Détails du rendez-vous</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/rendez-vous/${rendezVous.id}/edit`}>
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
                                <Calendar className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Type:</span>
                                <Badge className={getTypeColor(rendezVous.type)}>
                                    {rendezVous.type}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(rendezVous.statut)}
                                    <Badge className={getStatusColor(rendezVous.statut)}>
                                        {rendezVous.statut}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Organisateur:</span>
                                <span>{rendezVous.createur?.name || 'Non défini'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Participant:</span>
                                <span>{rendezVous.participant?.name || 'Non défini'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Clock className="mr-2 h-5 w-5" />
                                Horaires
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Début:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(rendezVous.date_debut)}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium">Fin:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(rendezVous.date_fin)}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium">Durée:</span>
                                <p className="text-sm text-muted-foreground">
                                    {getDuration(rendezVous.date_debut, rendezVous.date_fin)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{rendezVous.description}</p>
                    </CardContent>
                </Card>

                {(rendezVous.lieu || rendezVous.adresse) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5" />
                                Lieu
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {rendezVous.lieu && (
                                <div>
                                    <span className="font-medium">Lieu:</span>
                                    <p className="text-sm text-muted-foreground">{rendezVous.lieu}</p>
                                </div>
                            )}
                            {rendezVous.adresse && (
                                <div>
                                    <span className="font-medium">Adresse:</span>
                                    <p className="text-sm text-muted-foreground">
                                        {rendezVous.adresse.ligne1}, {rendezVous.adresse.ville}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {rendezVous.projetAssocie && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Projet associé
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{rendezVous.projetAssocie.titre}</p>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="mr-2 h-5 w-5" />
                            Dates importantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-medium">Créé le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(rendezVous.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(rendezVous.updated_at).toLocaleDateString('fr-FR', {
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
