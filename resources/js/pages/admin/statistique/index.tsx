import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, TrendingUp, Activity, Calendar, DollarSign, Eye, MessageSquare, Flag, Package, Award } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Statistique {
    id: number;
    type: string;
    valeur: number;
    date_collecte: string;
    metadata: any;
    created_at: string;
}

interface Props {
    statistiques: {
        data: Statistique[];
        links: any[];
        meta: any;
    };
    resume: {
        total_utilisateurs: number;
        total_projets: number;
        total_commandes: number;
        revenus_mensuels: number;
        croissance_utilisateurs: number;
        taux_conversion: number;
    };
}

export default function StatistiqueIndex({ statistiques, resume }: Props) {
    // Protection contre les données manquantes
    const statistiquesList = statistiques?.data || [];
    
    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return 'bg-blue-100 text-blue-800';
            case 'projets':
                return 'bg-green-100 text-green-800';
            case 'commandes':
                return 'bg-purple-100 text-purple-800';
            case 'revenus':
                return 'bg-yellow-100 text-yellow-800';
            case 'performance':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeText = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return 'Utilisateurs';
            case 'projets':
                return 'Projets';
            case 'commandes':
                return 'Commandes';
            case 'revenus':
                return 'Revenus';
            case 'performance':
                return 'Performance';
            default:
                return type;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return <Users className="h-4 w-4 text-blue-600" />;
            case 'projets':
                return <Package className="h-4 w-4 text-green-600" />;
            case 'commandes':
                return <DollarSign className="h-4 w-4 text-purple-600" />;
            case 'revenus':
                return <TrendingUp className="h-4 w-4 text-yellow-600" />;
            case 'performance':
                return <Activity className="h-4 w-4 text-orange-600" />;
            default:
                return <BarChart3 className="h-4 w-4 text-gray-600" />;
        }
    };

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('fr-FR').format(number);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
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
            <Head title="Statistiques du Système" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Statistiques du Système</h1>
                    <p className="text-muted-foreground">
                        Vue d'ensemble des performances et métriques
                    </p>
                </div>

                {/* Résumé des métriques principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(resume?.total_utilisateurs || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                +{resume?.croissance_utilisateurs || 0}% ce mois
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projets</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(resume?.total_projets || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                Projets actifs
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatNumber(resume?.total_commandes || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                Commandes traitées
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(resume?.revenus_mensuels || 0)}</div>
                            <p className="text-xs text-muted-foreground">
                                Ce mois-ci
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(resume?.taux_conversion || 0).toFixed(1)}%</div>
                            <p className="text-xs text-muted-foreground">
                                Visiteurs → Clients
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Croissance</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{resume?.croissance_utilisateurs || 0}%</div>
                            <p className="text-xs text-muted-foreground">
                                Utilisateurs ce mois
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Détails des statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {statistiquesList.map((statistique) => (
                        <Card key={statistique.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        {getTypeIcon(statistique.type)}
                                        <span className="ml-2">{getTypeText(statistique.type)}</span>
                                    </CardTitle>
                                    <Badge className={getTypeColor(statistique.type)}>
                                        {getTypeText(statistique.type)}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Valeur: {statistique.type.toLowerCase() === 'revenus' ? 
                                        formatCurrency(statistique.valeur) : 
                                        formatNumber(statistique.valeur)
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Valeur:</span> {
                                                statistique.type.toLowerCase() === 'revenus' ? 
                                                    formatCurrency(statistique.valeur) : 
                                                    formatNumber(statistique.valeur)
                                            }
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Collectée le:</span> {formatDateTime(statistique.date_collecte)}
                                        </span>
                                    </div>
                                    
                                    {statistique.metadata && (
                                        <div className="text-sm text-muted-foreground">
                                            <span className="font-medium">Métadonnées:</span>
                                            <pre className="text-xs mt-1 bg-gray-100 p-2 rounded">
                                                {JSON.stringify(statistique.metadata, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créée le {new Date(statistique.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Graphiques et analyses */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                Évolution des Utilisateurs
                            </CardTitle>
                            <CardDescription>
                                Croissance du nombre d'utilisateurs au fil du temps
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                                    <p>Graphique d'évolution</p>
                                    <p className="text-sm">Données en cours de collecte</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Revenus par Mois
                            </CardTitle>
                            <CardDescription>
                                Analyse des revenus mensuels
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center text-muted-foreground">
                                <div className="text-center">
                                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                                    <p>Graphique des revenus</p>
                                    <p className="text-sm">Données en cours de collecte</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
