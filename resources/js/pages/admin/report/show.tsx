import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Edit, Trash2, FileText, Calendar, Users, DollarSign, TrendingUp, BarChart3, Clock, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Report {
    id: number;
    nom: string;
    description: string;
    type: string;
    statut: string;
    date_generation: string;
    parametres: any;
    created_by: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    report: Report;
}

export default function ReportShow({ report }: Props) {
    const getStatutColor = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_cours':
                return 'bg-blue-100 text-blue-800';
            case 'termine':
                return 'bg-green-100 text-green-800';
            case 'erreur':
                return 'bg-red-100 text-red-800';
            case 'en_attente':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatutText = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_cours':
                return 'En cours';
            case 'termine':
                return 'Terminé';
            case 'erreur':
                return 'Erreur';
            case 'en_attente':
                return 'En attente';
            default:
                return statut;
        }
    };

    const getStatutIcon = (statut: string) => {
        switch (statut.toLowerCase()) {
            case 'en_cours':
                return <Clock className="h-4 w-4 text-blue-600" />;
            case 'termine':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'erreur':
                return <XCircle className="h-4 w-4 text-red-600" />;
            case 'en_attente':
                return <Clock className="h-4 w-4 text-yellow-600" />;
            default:
                return <Clock className="h-4 w-4 text-gray-600" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return 'bg-blue-100 text-blue-800';
            case 'ventes':
                return 'bg-green-100 text-green-800';
            case 'performance':
                return 'bg-purple-100 text-purple-800';
            case 'financier':
                return 'bg-yellow-100 text-yellow-800';
            case 'systeme':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeText = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return 'Utilisateurs';
            case 'ventes':
                return 'Ventes';
            case 'performance':
                return 'Performance';
            case 'financier':
                return 'Financier';
            case 'systeme':
                return 'Système';
            default:
                return type;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return <Users className="h-4 w-4 text-blue-600" />;
            case 'ventes':
                return <DollarSign className="h-4 w-4 text-green-600" />;
            case 'performance':
                return <TrendingUp className="h-4 w-4 text-purple-600" />;
            case 'financier':
                return <BarChart3 className="h-4 w-4 text-yellow-600" />;
            case 'systeme':
                return <FileText className="h-4 w-4 text-gray-600" />;
            default:
                return <FileText className="h-4 w-4 text-gray-600" />;
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
            <Head title={`Rapport: ${report.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/reports">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{report.nom}</h1>
                            <p className="text-muted-foreground">
                                Détails du rapport
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                        </Button>
                        <Link href={`/admin/reports/${report.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                Informations Générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatutColor(report.statut)}>
                                    {getStatutIcon(report.statut)}
                                    <span className="ml-1">{getStatutText(report.statut)}</span>
                                </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Type:</span>
                                <Badge className={getTypeColor(report.type)}>
                                    {getTypeIcon(report.type)}
                                    <span className="ml-1">{getTypeText(report.type)}</span>
                                </Badge>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Description:</span>
                                <p className="text-sm text-muted-foreground">
                                    {report.description}
                                </p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    <span className="font-medium">Créé par:</span> {report.created_by?.name || 'Non défini'}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    <span className="font-medium">Généré le:</span> {formatDateTime(report.date_generation)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Historique
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <span className="font-medium">Créé le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(report.created_at)}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Modifié le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(report.updated_at)}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Dernière génération:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(report.date_generation)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {report.parametres && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                Paramètres de Configuration
                            </CardTitle>
                            <CardDescription>
                                Configuration utilisée pour générer ce rapport
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                {JSON.stringify(report.parametres, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5" />
                            Actions
                        </CardTitle>
                        <CardDescription>
                            Gérez ce rapport
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger PDF
                            </Button>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger Excel
                            </Button>
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                Prévisualiser
                            </Button>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


