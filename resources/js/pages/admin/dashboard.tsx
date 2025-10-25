import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    ShoppingCart, 
    TrendingUp,
    Layers,
    Activity,
    Crown,
    Award,
    ArrowUpRight,
    UserPlus,
    Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Types pour les données réelles
interface DashboardProps {
    stats: {
        total_users: number;
        total_createurs: number;
        total_ateliers: number;
        total_projects: number;
        total_portfolios: number;
        total_orders: number;
        total_quotes: number;
        active_conversations: number;
    };
    usersByRole: Record<string, number>;
    projectsByStatus: Record<string, number>;
    ordersByStatus: Record<string, number>;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
    recentUsers: Array<{
        id: number;
        prenom: string;
        nom: string;
        email: string;
        created_at: string;
    }>;
    recentProjects: Array<{
        id: number;
        nom: string;
        createur: { name: string };
        statut: string;
        created_at: string;
    }>;
    recentCreateurs: Array<{
        id: number;
        nom_marque: string;
        style: string;
        createur: string;
        photo_profil: string;
        created_at: string;
    }>;
    recentProjets: Array<{
        id: number;
        titre: string;
        description: string;
        createur: string;
        created_at: string;
    }>;
}

export default function AdminDashboard({ 
    stats, 
    projectsByStatus, 
    recentUsers, 
    recentProjects, 
    recentCreateurs
}: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tableau de bord', href: '/admin' }
    ];

    // Calculer le taux de croissance (simulation basée sur les données)
    const growthRate = stats.total_users > 0 ? Math.round((stats.total_projects / stats.total_users) * 100) / 100 : 0;

    return (
        <>
            <Head title="Tableau de bord - Administration Atcho" />
            <AdminLayout breadcrumbs={breadcrumbs}>
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Crown className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-semibold text-slate-900">Tableau de bord</h1>
                    </div>
                    <p className="text-slate-600 text-lg">
                        Plateforme de collaboration mode - Créateurs et ateliers
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Utilisateurs</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.total_users.toLocaleString()}</div>
                            <div className="flex items-center text-xs text-slate-500">
                                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                {growthRate}% taux d'activité
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Créateurs</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Award className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.total_createurs}</div>
                            <div className="flex items-center text-xs text-slate-500">
                                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                Créateurs actifs
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Projets</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Layers className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.total_projects}</div>
                            <div className="flex items-center text-xs text-slate-500">
                                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                Projets créés
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Commandes</CardTitle>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ShoppingCart className="h-4 w-4 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.total_orders}</div>
                            <div className="flex items-center text-xs text-slate-500">
                                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                Commandes totales
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Projets par statut */}
                    <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-slate-900">
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                        Répartition des Projets
                                    </CardTitle>
                                    <CardDescription className="text-slate-600">
                                        Projets par statut
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                    {stats.total_projects} total
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-3xl font-bold text-slate-900">
                                    {stats.total_projects} projets
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(projectsByStatus).map(([status, count]) => (
                                        <div key={status} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-sm font-medium text-slate-700 capitalize">
                                                {status.replace('_', ' ')}
                                            </span>
                                            <span className="text-sm font-bold text-blue-600">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Créateurs récents */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-900">
                                <Award className="h-5 w-5 text-blue-600" />
                                Créateurs Récents
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                                Derniers créateurs inscrits
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentCreateurs.map((createur, index) => (
                                    <div key={createur.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate text-slate-900">{createur.nom_marque}</p>
                                            <p className="text-xs text-slate-500">
                                                {createur.createur} • {createur.style}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                                            Nouveau
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activités récentes */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900">
                            <Activity className="h-5 w-5 text-blue-600" />
                            Activités Récentes
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                            Dernières activités sur la plateforme
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentUsers.slice(0, 3).map((user) => (
                                <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                        <UserPlus className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900">
                                            Nouvel utilisateur: {user.prenom} {user.nom}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                        Utilisateur
                                    </Badge>
                                </div>
                            ))}
                            {recentProjects.slice(0, 2).map((project) => (
                                <div key={project.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                        <Briefcase className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900">
                                            Nouveau projet: {project.nom}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Par {project.createur.name} • {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                        Projet
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </AdminLayout>
        </>
    );
}