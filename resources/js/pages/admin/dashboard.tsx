import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    Package, 
    ShoppingCart, 
    TrendingUp,
    Briefcase,
    Layers,
    UserCheck,
    AlertCircle,
    Bell,
    BarChart3,
    Activity,
    Clock,
    CheckCircle,
    Crown,
    Sparkles,
    Target
} from 'lucide-react';
import { RevenueChart } from '@/components/ui/chart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administration',
        href: '/admin',
    },
].filter(item => item && item.title && item.href);

interface Props {
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
    recentCreateurs: Array<{
        id: number;
        nom_marque: string;
        style: string;
        experience: string;
        createur: string;
        photo_profil: string;
        created_at: string;
    }>;
    recentProjets: Array<{
        id: number;
        titre: string;
        description: string;
        image_principale: string;
        createur: string;
        created_at: string;
    }>;
    monthlyRevenue: Array<{month: string; revenue: number}>;
}

export default function AdminDashboard({ stats, recentCreateurs, recentProjets, monthlyRevenue }: Props) {
    // Données formatées pour l'affichage
    const formattedStats = {
        totalUsers: stats.total_users,
        totalCreateurs: stats.total_createurs,
        totalAteliers: stats.total_ateliers,
        totalProjects: stats.total_projects,
        totalPortfolios: stats.total_portfolios,
        totalOrders: stats.total_orders,
        totalRevenue: 125430,
        userGrowth: 12.5,
        projectGrowth: 8.3,
        orderGrowth: 15.2,
        revenueGrowth: 22.1
    };

    const recentActivities = [
        {
            id: 1,
            type: 'user',
            message: 'Nouveau créateur mode inscrit',
            user: 'Marie Dubois',
            time: '2 min',
            status: 'success'
        },
        {
            id: 2,
            type: 'project',
            message: 'Collection automne publiée',
            user: 'Atelier Chantal',
            time: '15 min',
            status: 'info'
        },
        {
            id: 3,
            type: 'order',
            message: 'Commande haute couture confirmée',
            user: 'Client VIP',
            time: '1h',
            status: 'success'
        },
        {
            id: 4,
            type: 'alert',
            message: 'Signalement de contenu',
            user: 'Modération',
            time: '2h',
            status: 'warning'
        }
    ];

    const quickActions = [
        {
            title: 'Valider Comptes',
            description: 'Approuver les nouveaux créateurs',
            icon: UserCheck,
            href: '/admin/validation',
            color: 'bg-sky-500',
            count: 12
        },
        {
            title: 'Gérer Collections',
            description: 'Superviser les projets mode',
            icon: Layers,
            href: '/admin/projects',
            color: 'bg-blue-500',
            count: 8
        },
        {
            title: 'Analytics Avancées',
            description: 'Tableaux de bord détaillés',
            icon: BarChart3,
            href: '/admin/analytics',
            color: 'bg-indigo-500',
            count: null
        },
        {
            title: 'Paramètres Système',
            description: 'Configuration plateforme',
            icon: Activity,
            href: '/admin/settings',
            color: 'bg-cyan-500',
            count: null
        }
    ];

    const fashionMetrics = [
        {
            title: 'Créateurs Actifs',
            value: formattedStats.totalCreateurs,
            growth: 8.2,
            icon: Crown,
            color: 'text-sky-600',
            bgColor: 'bg-sky-50',
            borderColor: 'border-sky-200'
        },
        {
            title: 'Ateliers Partenaires',
            value: formattedStats.totalAteliers,
            growth: 15.3,
            icon: Briefcase,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        {
            title: 'Projets Mode',
            value: formattedStats.totalProjects,
            growth: 22.1,
            icon: Layers,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-200'
        },
        {
            title: 'Portfolios Premium',
            value: formattedStats.totalPortfolios,
            growth: 18.7,
            icon: Sparkles,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            borderColor: 'border-cyan-200'
        }
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Administration - Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-sidebar-foreground tracking-tight">
                                Dashboard Mode
                    </h1>
                            <p className="text-muted-foreground text-lg mt-2">
                                Gestion de la plateforme haute couture Atcho
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-sidebar-accent rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-sidebar-accent-foreground">
                                    Système Opérationnel
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Graphique des Revenus - En Grand */}
                <div className="mb-8">
                    <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-50"></div>
                        <div className="relative p-8">
                            <RevenueChart 
                                data={monthlyRevenue} 
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Mode - Créateurs et Projets Récents */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Créateurs Mode</h2>
                        <p className="text-muted-foreground">Découvrez nos créateurs talentueux</p>
                    </div>
                    
                    {recentCreateurs.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {recentCreateurs.map((createur) => (
                                <div key={createur.id} className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="relative">
                                        {/* Image du créateur */}
                                        <div className="h-48 w-full overflow-hidden">
                                            <img 
                                                src={createur.photo_profil || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'} 
                                                alt={createur.nom_marque}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        
                                        {/* Contenu de la carte */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-bold text-sidebar-foreground">{createur.nom_marque}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <Crown className="h-4 w-4 text-pink-600" />
                                                    <span className="text-xs font-semibold text-pink-600 uppercase">{createur.style}</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Créateur: {createur.createur}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    {createur.experience}
                                                </span>
                                                <div className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">
                                                    Mode
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Aucun créateur trouvé</p>
                        </div>
                    )}
                </div>

                {/* Section Projets Mode */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-sidebar-foreground mb-2">Projets Mode</h2>
                        <p className="text-muted-foreground">Découvrez les dernières créations</p>
                    </div>
                    
                    {recentProjets.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {recentProjets.map((projet) => (
                                <div key={projet.id} className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="relative">
                                        {/* Image du projet */}
                                        <div className="h-48 w-full overflow-hidden">
                                            <img 
                                                src={projet.image_principale || 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop'} 
                                                alt={projet.titre}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        
                                        {/* Contenu de la carte */}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-bold text-sidebar-foreground">{projet.titre}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <Layers className="h-4 w-4 text-purple-600" />
                                                    <span className="text-xs font-semibold text-purple-600 uppercase">Projet</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                {projet.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">
                                                    Par: {projet.createur}
                                                </span>
                                                <div className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                                                    Création
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Layers className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Aucun projet trouvé</p>
                        </div>
                    )}
                </div>

                {/* Métriques Principales */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 pr-4 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Utilisateurs Totaux</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-sidebar-foreground mb-3 truncate">{formattedStats.totalUsers.toLocaleString()}</p>
                                    <div className="flex items-center">
                                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                        <span className="text-sm text-green-600 font-medium">+{formattedStats.userGrowth}%</span>
                                    </div>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Users className="h-7 w-7 text-sidebar-primary-foreground" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-5">
                                <Users className="w-full h-full text-sidebar-foreground" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 pr-4 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Projets Mode</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-sidebar-foreground mb-3 truncate">{formattedStats.totalProjects.toLocaleString()}</p>
                                    <div className="flex items-center">
                                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                        <span className="text-sm text-green-600 font-medium">+{formattedStats.projectGrowth}%</span>
                                    </div>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Package className="h-7 w-7 text-sidebar-primary-foreground" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-5">
                                <Package className="w-full h-full text-sidebar-foreground" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 pr-4 min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Commandes</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-sidebar-foreground mb-3 truncate">{formattedStats.totalOrders.toLocaleString()}</p>
                                    <div className="flex items-center">
                                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                        <span className="text-sm text-green-600 font-medium">+{formattedStats.orderGrowth}%</span>
                                    </div>
                                </div>
                                <div className="h-14 w-14 rounded-xl bg-sidebar-primary flex items-center justify-center shadow-lg flex-shrink-0">
                                    <ShoppingCart className="h-7 w-7 text-sidebar-primary-foreground" />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-5">
                                <ShoppingCart className="w-full h-full text-sidebar-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Métriques Mode Spécialisées */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {fashionMetrics.map((metric, index) => {
                        return (
                            <div key={index} className={`group relative overflow-hidden rounded-2xl border ${metric.borderColor} ${metric.bgColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 pr-4 min-w-0">
                                            <p className="text-sm font-medium text-muted-foreground mb-2">{metric.title}</p>
                                            <p className="text-2xl sm:text-3xl font-bold text-sidebar-foreground mb-3 truncate">{metric.value.toLocaleString()}</p>
                                            <div className="flex items-center">
                                                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                                                <span className="text-sm text-green-600 font-medium">+{metric.growth}%</span>
                                            </div>
                                        </div>
                                        <div className={`h-14 w-14 rounded-xl ${metric.bgColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                            <metric.icon className={`h-7 w-7 ${metric.color}`} />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-5">
                                        <metric.icon className="w-full h-full text-sidebar-foreground" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions Rapides et Activité */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Actions Rapides */}
                    <div className="group relative overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-sidebar to-sidebar-accent shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop')] bg-cover bg-center opacity-20"></div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-sidebar-foreground">Actions Rapides</h3>
                                <Target className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="grid gap-4">
                                {quickActions.map((action, index) => (
                                    <Link key={index} href={action.href} className="group">
                                        <div className="flex items-center space-x-4 p-4 rounded-xl bg-sidebar-accent hover:bg-sidebar-accent/80 transition-all duration-300 hover:shadow-md">
                                            <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <action.icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sidebar-accent-foreground group-hover:text-sidebar-foreground transition-colors">
                                                    {action.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">{action.description}</p>
                                            </div>
                                            {action.count && (
                                                <div className="px-2 py-1 bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold rounded-full">
                                                    {action.count}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activité Récente */}
                    <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-sidebar-foreground">Activité Récente</h3>
                                <Activity className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-sidebar-accent hover:bg-sidebar-accent/80 transition-all duration-300">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                            activity.status === 'success' ? 'bg-green-100' :
                                            activity.status === 'warning' ? 'bg-yellow-100' :
                                            activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                                        }`}>
                                            {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                                            {activity.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                                            {activity.status === 'info' && <Bell className="h-5 w-5 text-blue-600" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sidebar-accent-foreground">{activity.message}</p>
                                            <p className="text-sm text-muted-foreground">{activity.user}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graphiques et Analytics */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-sidebar-foreground">Performance Mode</h3>
                                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Graphiques de performance en cours de développement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar shadow-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-sidebar-foreground">Tendances Mode</h3>
                                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                                </div>
                            <div className="h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Analyse des tendances en cours de développement</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}