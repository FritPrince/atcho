import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Flag, Calendar, User, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
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
        email: string;
    };
    signale: {
        id: number;
        name: string;
        email: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    signalement: Signalement;
}

export default function SignalementShow({ signalement }: Props) {
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
                return <Clock className="h-5 w-5 text-yellow-600" />;
            case 'en_cours':
                return <AlertTriangle className="h-5 w-5 text-blue-600" />;
            case 'resolu':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'rejete':
                return <XCircle className="h-5 w-5 text-red-600" />;
            default:
                return <Flag className="h-5 w-5 text-gray-600" />;
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title={`Signalement - ${signalement.type}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/signalements">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{signalement.type}</h1>
                            <p className="text-muted-foreground">Détails du signalement</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/signalements/${signalement.id}/edit`}>
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
                                <Flag className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatutIcon(signalement.statut)}
                                    <Badge className={getStatutColor(signalement.statut)}>
                                        {getStatutText(signalement.statut)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Priorité:</span>
                                <Badge className={getPrioriteColor(signalement.priorite)}>
                                    {getPrioriteText(signalement.priorite)}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Date du signalement:</span>
                                <span className="text-sm text-muted-foreground">
                                    {formatDateTime(signalement.date_signalement)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Personnes impliquées
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Signalant:</span>
                                <div className="mt-1">
                                    <p className="text-sm text-muted-foreground">
                                        {signalement.signalant?.name || 'Non défini'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {signalement.signalant?.email || 'Email non disponible'}
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <span className="font-medium">Personne signalée:</span>
                                <div className="mt-1">
                                    <p className="text-sm text-muted-foreground">
                                        {signalement.signale?.name || 'Non défini'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {signalement.signale?.email || 'Email non disponible'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Flag className="mr-2 h-5 w-5" />
                            Description du signalement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{signalement.description}</p>
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
                                {new Date(signalement.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(signalement.updated_at).toLocaleDateString('fr-FR', {
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


