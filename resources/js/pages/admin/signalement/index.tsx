import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, AlertTriangle, Calendar, User, Flag, CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Signalement {
    id: number;
    type: string;
    description: string;
    statut: string;
    priorite: string;
    date_signalement: string;
    signalant: {
        id: number;
        name: string;
    };
    signale: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    signalements: {
        data: Signalement[];
        links: any[];
        meta: any;
    };
}

export default function SignalementIndex({ signalements }: Props) {
    // Protection contre les données manquantes
    const signalementsList = signalements?.data || [];
    
    const getStatutColor = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'en_cours':
                return 'bg-blue-100 text-blue-800';
            case 'resolu':
                return 'bg-green-100 text-green-800';
            case 'rejete':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatutText = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_attente':
                return 'En attente';
            case 'en_cours':
                return 'En cours';
            case 'resolu':
                return 'Résolu';
            case 'rejete':
                return 'Rejeté';
            default:
                return statut;
        }
    };

    const getStatutIcon = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_attente':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'en_cours':
                return <AlertTriangle className="h-4 w-4 text-blue-600" />;
            case 'resolu':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'rejete':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Flag className="h-4 w-4 text-gray-600" />;
        }
    };

    const getPrioriteColor = (priorite: string) => {
        switch (priorite.toLowerCase()) {
            case 'faible':
                return 'bg-green-100 text-green-800';
            case 'moyenne':
                return 'bg-yellow-100 text-yellow-800';
            case 'haute':
                return 'bg-orange-100 text-orange-800';
            case 'critique':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPrioriteText = (priorite: string) => {
        switch (priorite.toLowerCase()) {
            case 'faible':
                return 'Faible';
            case 'moyenne':
                return 'Moyenne';
            case 'haute':
                return 'Haute';
            case 'critique':
                return 'Critique';
            default:
                return priorite;
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

    return (
        <AdminLayout>
            <Head title="Gestion des Signalements" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Signalements</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les signalements du système
                        </p>
                    </div>
                    <Link href="/admin/signalements/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Signalement
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {signalementsList.map((signalement) => (
                        <Card key={signalement.id} className={signalement.priorite === 'critique' ? 'border-red-200' : ''}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Flag className="mr-2 h-5 w-5" />
                                        {signalement.type}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {getStatutIcon(signalement.statut)}
                                        <Badge className={getStatutColor(signalement.statut)}>
                                            {getStatutText(signalement.statut)}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {signalement.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Priorité:</span>
                                        <Badge className={getPrioriteColor(signalement.priorite)}>
                                            {getPrioriteText(signalement.priorite)}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Signalant:</span> {signalement.signalant?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Signalé:</span> {signalement.signale?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Signalé le:</span> {formatDateTime(signalement.date_signalement)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créé le {new Date(signalement.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/signalements/${signalement.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/signalements/${signalement.id}/edit`}>
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


