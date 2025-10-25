import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Settings, Clock, CheckCircle, Calendar, User, Image } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface EtapeProduction {
    id: number;
    nom: string;
    description: string;
    ordre: number;
    duree_estimee_heures: number;
    est_terminee: boolean;
    date_debut: string | null;
    date_completion: string | null;
    photos: string | null;
    commande: {
        id: number;
        numero: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    etapeProduction: EtapeProduction;
}

export default function EtapeProductionShow({ etapeProduction }: Props) {
    const getStatusColor = (etape: EtapeProduction) => {
        if (etape.est_terminee) return 'bg-green-100 text-green-800';
        if (etape.date_debut) return 'bg-blue-100 text-blue-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    const getStatusText = (etape: EtapeProduction) => {
        if (etape.est_terminee) return 'Terminée';
        if (etape.date_debut) return 'En cours';
        return 'En attente';
    };

    const getStatusIcon = (etape: EtapeProduction) => {
        if (etape.est_terminee) return <CheckCircle className="h-5 w-5 text-green-600" />;
        if (etape.date_debut) return <Settings className="h-5 w-5 text-blue-600" />;
        return <Clock className="h-5 w-5 text-yellow-600" />;
    };

    const formatDuration = (hours: number) => {
        if (hours < 1) {
            return `${Math.round(hours * 60)}min`;
        }
        if (hours < 24) {
            return `${hours}h`;
        }
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        return `${days}j ${remainingHours}h`;
    };

    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return 'Non défini';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPhotosArray = (photos: string | null) => {
        if (!photos) return [];
        return photos.split(',').map(url => url.trim()).filter(url => url.length > 0);
    };

    const getDurationReelle = () => {
        if (etapeProduction.date_debut && etapeProduction.date_completion) {
            const start = new Date(etapeProduction.date_debut);
            const end = new Date(etapeProduction.date_completion);
            const diffMs = end.getTime() - start.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);
            return formatDuration(diffHours);
        }
        return null;
    };

    return (
        <AdminLayout>
            <Head title={`Étape - ${etapeProduction.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/etapes-production">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{etapeProduction.nom}</h1>
                            <p className="text-muted-foreground">Détails de l'étape de production</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/etapes-production/${etapeProduction.id}/edit`}>
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
                                <Settings className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(etapeProduction)}
                                    <Badge className={getStatusColor(etapeProduction)}>
                                        {getStatusText(etapeProduction)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Ordre:</span>
                                <Badge variant="outline">#{etapeProduction.ordre}</Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Durée estimée:</span>
                                <span>{formatDuration(etapeProduction.duree_estimee_heures)}</span>
                            </div>
                            
                            {getDurationReelle() && (
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Durée réelle:</span>
                                    <span>{getDurationReelle()}</span>
                                </div>
                            )}
                            
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Commande:</span>
                                <span>#{etapeProduction.commande?.numero || 'Non définie'}</span>
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
                                <span className="font-medium">Date de début:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(etapeProduction.date_debut)}
                                </p>
                            </div>
                            
                            <div>
                                <span className="font-medium">Date de fin:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(etapeProduction.date_completion)}
                                </p>
                            </div>
                            
                            <div>
                                <span className="font-medium">Créée le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(etapeProduction.created_at).toLocaleDateString('fr-FR', {
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
                                    {new Date(etapeProduction.updated_at).toLocaleDateString('fr-FR', {
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
                            <Settings className="mr-2 h-5 w-5" />
                            Description
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{etapeProduction.description}</p>
                    </CardContent>
                </Card>

                {getPhotosArray(etapeProduction.photos).length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Image className="mr-2 h-5 w-5" />
                                Photos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {getPhotosArray(etapeProduction.photos).map((photo, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={photo}
                                            alt={`Photo ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}


