import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Eye, FileText, Calendar, TrendingUp, Users, DollarSign, BarChart3, Filter } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Report {
    id: number;
    nom: string;
    description: string;
    type: string;
    statut: string;
    date_generation: string;
    created_by: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    reports: {
        data: Report[];
        links: any[];
        meta: any;
    };
}

export default function ReportIndex({ reports }: Props) {
    // Protection contre les données manquantes
    const reportsList = reports?.data || [];
    
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
            <Head title="Gestion des Rapports" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Rapports</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les rapports du système
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtrer
                        </Button>
                        <Link href="/admin/reports/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Nouveau Rapport
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Types de rapports disponibles */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <Users className="mr-2 h-4 w-4 text-blue-600" />
                                Rapports Utilisateurs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">
                                Rapports disponibles
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                                Rapports Ventes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">
                                Rapports disponibles
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4 text-purple-600" />
                                Rapports Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6</div>
                            <p className="text-xs text-muted-foreground">
                                Rapports disponibles
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <BarChart3 className="mr-2 h-4 w-4 text-yellow-600" />
                                Rapports Financiers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">
                                Rapports disponibles
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Liste des rapports */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reportsList.map((report) => (
                        <Card key={report.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        {getTypeIcon(report.type)}
                                        <span className="ml-2">{report.nom}</span>
                                    </CardTitle>
                                    <Badge className={getStatutColor(report.statut)}>
                                        {getStatutText(report.statut)}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {report.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Type:</span>
                                        <Badge className={getTypeColor(report.type)}>
                                            {getTypeText(report.type)}
                                        </Badge>
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
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créé le {new Date(report.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/reports/${report.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Actions rapides */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Actions Rapides
                        </CardTitle>
                        <CardDescription>
                            Générez des rapports rapidement
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Users className="h-6 w-6 mb-2" />
                                <span className="text-sm">Rapport Utilisateurs</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <DollarSign className="h-6 w-6 mb-2" />
                                <span className="text-sm">Rapport Ventes</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <TrendingUp className="h-6 w-6 mb-2" />
                                <span className="text-sm">Rapport Performance</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <BarChart3 className="h-6 w-6 mb-2" />
                                <span className="text-sm">Rapport Financier</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
