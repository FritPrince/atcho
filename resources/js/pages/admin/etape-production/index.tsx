import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Settings, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
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
    commande: {
        id: number;
        numero: string;
    };
    created_at: string;
}

interface Props {
    etapesProduction: {
        data: EtapeProduction[];
        links: any[];
        meta: any;
    };
}

export default function EtapeProductionIndex({ etapesProduction }: Props) {
    // Protection contre les données manquantes
    const etapesList = etapesProduction?.data || [];
    
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
        if (etape.est_terminee) return <CheckCircle className="h-4 w-4 text-green-600" />;
        if (etape.date_debut) return <Settings className="h-4 w-4 text-blue-600" />;
        return <Clock className="h-4 w-4 text-yellow-600" />;
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
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Étapes de Production" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Étapes de Production</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les étapes de production
                        </p>
                    </div>
                    <Link href="/admin/etapes-production/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Étape
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {etapesList.map((etape) => (
                        <Card key={etape.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Settings className="mr-2 h-5 w-5" />
                                        {etape.nom}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(etape)}
                                        <Badge className={getStatusColor(etape)}>
                                            {getStatusText(etape)}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {etape.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Ordre:</span>
                                        <Badge variant="outline">#{etape.ordre}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Durée estimée:</span> {formatDuration(etape.duree_estimee_heures)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Commande:</span> #{etape.commande?.numero || 'Non définie'}
                                        </span>
                                    </div>
                                    
                                    {etape.date_debut && (
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="font-medium">Début:</span> {formatDateTime(etape.date_debut)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {etape.date_completion && (
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">
                                                <span className="font-medium">Fin:</span> {formatDateTime(etape.date_completion)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créée le {new Date(etape.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/etapes-production/${etape.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/etapes-production/${etape.id}/edit`}>
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


