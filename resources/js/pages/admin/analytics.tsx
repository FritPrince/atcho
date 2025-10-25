import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Activity, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface AnalyticsData {
    overview: {
        total_users: number;
        total_projects: number;
        total_revenue: number;
        conversion_rate: number;
        growth_rate: number;
        active_users: number;
    };
    charts: {
    monthly_revenue: Array<{
        month: string;
        revenue: number;
    }>;
    user_growth: Array<{
        month: string;
        users: number;
    }>;
    project_status: Array<{
        status: string;
        count: number;
    }>;
    };
    top_performers: Array<{
        id: number;
        name: string;
        value: number;
        type: string;
    }>;
}

interface Props {
    analytics?: AnalyticsData;
}

export default function Analytics({ analytics }: Props) {
    // Données par défaut si analytics n'est pas fourni
    const defaultAnalytics: AnalyticsData = {
        overview: {
            total_users: 1250,
            total_projects: 340,
            total_revenue: 125000,
            conversion_rate: 12.5,
            growth_rate: 8.3,
            active_users: 890
        },
        charts: {
            monthly_revenue: [
                { month: 'Jan', revenue: 15000 },
                { month: 'Fév', revenue: 18000 },
                { month: 'Mar', revenue: 22000 },
                { month: 'Avr', revenue: 19000 },
                { month: 'Mai', revenue: 25000 },
                { month: 'Juin', revenue: 28000 }
            ],
            user_growth: [
                { month: 'Jan', users: 800 },
                { month: 'Fév', users: 920 },
                { month: 'Mar', users: 1050 },
                { month: 'Avr', users: 1100 },
                { month: 'Mai', users: 1200 },
                { month: 'Juin', users: 1250 }
            ],
            project_status: [
                { status: 'En cours', count: 45 },
                { status: 'Terminé', count: 120 },
                { status: 'En attente', count: 25 },
                { status: 'Annulé', count: 8 }
            ]
        },
        top_performers: [
            { id: 1, name: 'Projet Alpha', value: 15000, type: 'Revenus' },
            { id: 2, name: 'Projet Beta', value: 12000, type: 'Revenus' },
            { id: 3, name: 'Projet Gamma', value: 9800, type: 'Revenus' },
            { id: 4, name: 'Utilisateur A', value: 25, type: 'Projets' },
            { id: 5, name: 'Utilisateur B', value: 18, type: 'Projets' }
        ]
    };

    const data = analytics || defaultAnalytics;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`;
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'en cours':
                return 'bg-blue-100 text-blue-800';
            case 'terminé':
                return 'bg-green-100 text-green-800';
            case 'en attente':
                return 'bg-yellow-100 text-yellow-800';
            case 'annulé':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'revenus':
                return 'bg-green-100 text-green-800';
            case 'projets':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title="Analytics" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-muted-foreground">
                            Analyse des performances et métriques de la plateforme
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtrer
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exporter
                        </Button>
                        <Button>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Actualiser
                        </Button>
                    </div>
                </div>

                {/* Métriques principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.overview.total_users.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">
                                +{data.overview.growth_rate}% ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Projets Actifs</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.overview.total_projects}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.overview.active_users} utilisateurs actifs
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(data.overview.total_revenue)}</div>
                            <p className="text-xs text-muted-foreground">
                                +{data.overview.growth_rate}% ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatPercentage(data.overview.conversion_rate)}</div>
                            <p className="text-xs text-muted-foreground">
                                Visiteurs → Clients
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Croissance</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{formatPercentage(data.overview.growth_rate)}</div>
                            <p className="text-xs text-muted-foreground">
                                Utilisateurs ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.overview.active_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Actuellement en ligne
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Graphiques */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Revenus Mensuels
                            </CardTitle>
                            <CardDescription>
                                Évolution des revenus sur les 6 derniers mois
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                                    <p>Graphique des revenus</p>
                                    <p className="text-sm">Données en cours de collecte</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="mr-2 h-5 w-5" />
                                Croissance des Utilisateurs
                            </CardTitle>
                            <CardDescription>
                                Évolution du nombre d'utilisateurs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <Users className="h-12 w-12 mx-auto mb-2" />
                                    <p>Graphique de croissance</p>
                                    <p className="text-sm">Données en cours de collecte</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Statuts des projets */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Activity className="mr-2 h-5 w-5" />
                            Statuts des Projets
                        </CardTitle>
                        <CardDescription>
                            Répartition des projets par statut
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {data.charts.project_status.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getStatusColor(item.status)}>
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <div className="text-2xl font-bold">{item.count}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Performers */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Top Performers
                        </CardTitle>
                        <CardDescription>
                            Meilleurs projets et utilisateurs
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.top_performers.map((performer) => (
                                <div key={performer.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                                            {performer.id}
                                        </div>
                                        <div>
                                            <p className="font-medium">{performer.name}</p>
                                            <Badge className={getTypeColor(performer.type)}>
                                                {performer.type}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">
                                            {performer.type === 'Revenus' ? formatCurrency(performer.value) : performer.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {performer.type === 'Revenus' ? 'Revenus générés' : 'Projets créés'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Actions rapides */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Actions Rapides
                        </CardTitle>
                        <CardDescription>
                            Outils d'analyse et de reporting
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <BarChart3 className="h-6 w-6 mb-2" />
                                <span className="text-sm">Rapport Complet</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Users className="h-6 w-6 mb-2" />
                                <span className="text-sm">Analyse Utilisateurs</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <DollarSign className="h-6 w-6 mb-2" />
                                <span className="text-sm">Analyse Financière</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Activity className="h-6 w-6 mb-2" />
                                <span className="text-sm">Performance</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


