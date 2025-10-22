import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
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
    created_at: string;
}

interface Props {
    rendezVous: {
        data: RendezVous[];
        links: any[];
        meta: any;
    };
}

export default function RendezVousIndex({ rendezVous }: Props) {
    // Protection contre les données manquantes
    const rendezVousList = rendezVous?.data || [];
    
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
            case 'CONFIRME': return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'EN_ATTENTE': return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'ANNULE': return <XCircle className="h-4 w-4 text-red-600" />;
            case 'TERMINE': return <CheckCircle className="h-4 w-4 text-blue-600" />;
            default: return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) > new Date();
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Rendez-vous" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Rendez-vous</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les rendez-vous de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/rendez-vous/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Rendez-vous
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {rendezVousList.map((rendezVous) => (
                        <Card key={rendezVous.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Calendar className="mr-2 h-5 w-5" />
                                        {rendezVous.titre}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(rendezVous.statut)}
                                        <Badge className={getStatusColor(rendezVous.statut)}>
                                            {rendezVous.statut}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {rendezVous.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getTypeColor(rendezVous.type)}>
                                            {rendezVous.type}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Début:</span> {formatDateTime(rendezVous.date_debut)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Fin:</span> {formatDateTime(rendezVous.date_fin)}
                                        </span>
                                    </div>
                                    
                                    {rendezVous.lieu && (
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm truncate">
                                                {rendezVous.lieu}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Organisateur:</span> {rendezVous.createur?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Participant:</span> {rendezVous.participant?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créé le {new Date(rendezVous.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/rendez-vous/${rendezVous.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/rendez-vous/${rendezVous.id}/edit`}>
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
