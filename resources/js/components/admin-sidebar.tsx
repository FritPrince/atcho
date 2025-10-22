import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarProvider,
    useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    BarChart3,
    Building2,
    Calendar,
    ClipboardList,
    Database,
    FileText,
    Hammer,
    LayoutGrid,
    MapPin,
    MessageSquare,
    Package,
    Settings,
    ShoppingCart,
    Star,
    TrendingUp,
    Users,
    UserCheck,
    Wallet,
    AlertTriangle,
    Bell,
    File as Document,
    Image,
    Mail,
    Shield,
    Tag,
    Wrench,
    // Icônes professionnelles haute couture
    Award,
    Briefcase,
    Target,
    ChevronDown,
    Zap,
    Layers,
    Grid3X3,
    Activity,
    PieChart,
    LineChart,
    BarChart,
    Users2,
    UserCog,
    MapPin as Location,
    ShoppingBag,
    FileSpreadsheet,
    MessageCircle,
    Star as Rating,
    CreditCard,
    Calendar as Schedule,
    ClipboardCheck,
    Cog,
    Compass,
    Database as Data,
    Wrench as Tools,
    AlertCircle,
    TrendingUp as Growth,
    FileBarChart,
    FileText as DocumentText,
    Settings as Config,
} from 'lucide-react';
import AppLogo from './app-logo';

// 🎨 DESIGN HAUTE COUTURE - Professionnel & Sophistiqué avec OKLCH
interface NavGroup {
    title: string;
    icon: any;
    items: NavItem[];
}

const navigationGroups: NavGroup[] = [
    {
        title: 'Overview',
        icon: LayoutGrid,
        items: [
            {
                title: 'Dashboard',
                href: '/admin',
                icon: LayoutGrid,
            },
            {
                title: 'Analytics',
                href: '/admin/analytics',
                icon: BarChart3,
            },
        ]
    },
    {
        title: 'Fashion Management',
        icon: Award,
        items: [
            {
                title: 'Créateurs',
                href: '/admin/profils-createurs',
                icon: Award,
            },
            {
                title: 'Ateliers',
                href: '/admin/profils-ateliers',
                icon: Briefcase,
            },
            {
                title: 'Collections',
                href: '/admin/projects',
                icon: Layers,
            },
            {
                title: 'Portfolios',
                href: '/admin/portfolios',
                icon: Grid3X3,
            },
        ]
    },
    {
        title: 'User Management',
        icon: Users2,
        items: [
            {
                title: 'Utilisateurs',
                href: '/admin/users',
                icon: Users2,
            },
            {
                title: 'Validation',
                href: '/admin/validation',
                icon: UserCog,
            },
            {
                title: 'Adresses',
                href: '/admin/adresses',
                icon: Location,
            },
        ]
    },
    {
        title: 'Production',
        icon: ClipboardCheck,
        items: [
            {
                title: 'Commandes',
                href: '/admin/orders',
                icon: ShoppingBag,
            },
            {
                title: 'Devis',
                href: '/admin/devis',
                icon: FileSpreadsheet,
            },
            {
                title: 'Cahiers des Charges',
                href: '/admin/cahiers-charges',
                icon: ClipboardCheck,
            },
            {
                title: 'Étapes de Production',
                href: '/admin/etapes-production',
                icon: Cog,
            },
            {
                title: 'Rendez-vous',
                href: '/admin/rendez-vous',
                icon: Schedule,
            },
        ]
    },
    {
        title: 'Communication',
        icon: MessageSquare,
        items: [
            {
                title: 'Messages',
                href: '/admin/messages',
                icon: MessageSquare,
            },
            {
                title: 'Conversations',
                href: '/admin/conversations',
                icon: MessageSquare,
            },
            {
                title: 'Notifications',
                href: '/admin/notifications',
                icon: Bell,
            },
        ]
    },
    {
        title: 'Business',
        icon: ShoppingBag,
        items: [
            {
                title: 'Paiements',
                href: '/admin/paiements',
                icon: Wallet,
            },
            {
                title: 'Avis',
                href: '/admin/avis',
                icon: Star,
            },
        ]
    },
    {
        title: 'System',
        icon: Settings,
        items: [
            {
                title: 'Signalements',
                href: '/admin/signalements',
                icon: AlertCircle,
            },
            {
                title: 'Statistiques',
                href: '/admin/statistiques',
                icon: Growth,
            },
            {
                title: 'Rapports',
                href: '/admin/reports',
                icon: FileBarChart,
            },
            {
                title: 'Documents',
                href: '/admin/documents',
                icon: DocumentText,
            },
            {
                title: 'Paramètres',
                href: '/admin/settings',
                icon: Config,
            },
        ]
    },
];

const userManagementItems: NavItem[] = [
    {
        title: 'Utilisateurs',
        href: '/admin/users',
        icon: Users2,
    },
    {
        title: 'Validation',
        href: '/admin/validation',
        icon: UserCog,
    },
    {
        title: 'Adresses',
        href: '/admin/adresses',
        icon: Location,
    },
];

const productionItems: NavItem[] = [
    {
        title: 'Commandes',
        href: '/admin/orders',
        icon: ShoppingBag,
    },
    {
        title: 'Devis',
        href: '/admin/devis',
        icon: FileSpreadsheet,
    },
    {
        title: 'Cahiers des Charges',
        href: '/admin/cahiers-charges',
        icon: ClipboardCheck,
    },
    {
        title: 'Étapes de Production',
        href: '/admin/etapes-production',
        icon: Cog,
    },
    {
        title: 'Rendez-vous',
        href: '/admin/rendez-vous',
        icon: Schedule,
    },
];

const communicationItems: NavItem[] = [
    {
        title: 'Conversations',
        href: '/admin/conversations',
        icon: MessageCircle,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: Mail,
    },
    {
        title: 'Avis',
        href: '/admin/avis',
        icon: Rating,
    },
    {
        title: 'Notifications',
        href: '/admin/notifications',
        icon: Bell,
    },
];

const businessItems: NavItem[] = [
    {
        title: 'Paiements',
        href: '/admin/paiements',
        icon: CreditCard,
    },
    {
        title: 'Catégories de Services',
        href: '/admin/categories-services',
        icon: Tag,
    },
    {
        title: 'Compétences',
        href: '/admin/competences',
        icon: Tools,
    },
    {
        title: 'Matériaux',
        href: '/admin/materiaux',
        icon: Data,
    },
];

const systemItems: NavItem[] = [
    {
        title: 'Signalements',
        href: '/admin/signalements',
        icon: AlertCircle,
    },
    {
        title: 'Statistiques',
        href: '/admin/statistiques',
        icon: Growth,
    },
    {
        title: 'Rapports',
        href: '/admin/reports',
        icon: FileBarChart,
    },
    {
        title: 'Documents',
        href: '/admin/documents',
        icon: DocumentText,
    },
    {
        title: 'Paramètres',
        href: '/admin/settings',
        icon: Config,
    },
];

function SidebarContentComponent() {
    const { state } = useSidebar();
    const { url } = usePage();
    const [openGroups, setOpenGroups] = useState<string[]>([]);

    // Fonction pour détecter si un item est actif
    const isActive = (href: string | { url: string }) => {
        const currentUrl = String(url);
        const itemUrl = typeof href === 'string' ? href : href.url;
        if (itemUrl === '/admin') {
            return currentUrl === '/admin';
        }
        return currentUrl.startsWith(itemUrl);
    };

    // Fonction pour gérer l'ouverture/fermeture des groupes
    const toggleGroup = (groupTitle: string) => {
        setOpenGroups(prev => 
            prev.includes(groupTitle) 
                ? prev.filter(title => title !== groupTitle)
                : [...prev, groupTitle]
        );
    };

    // Composant pour un item de menu avec indicateur actif
    const MenuItem = ({ item }: { item: NavItem }) => {
        const active = isActive(item.href);
        return (
            <SidebarMenuItem>
                <SidebarMenuButton asChild className="group">
                    <Link 
                        href={item.href} 
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-sm relative ml-4 ${
                            active 
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' 
                                : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                    >
                        {active && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary-foreground rounded-r-full" />
                        )}
                        {item.icon && (
                            <item.icon className={`h-4 w-4 transition-colors duration-300 ${
                                active 
                                    ? 'text-sidebar-primary-foreground' 
                                    : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                            }`} />
                        )}
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                            active 
                                ? 'text-sidebar-primary-foreground' 
                                : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                        }`}>
                            {item.title}
                        </span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    // Composant pour un groupe avec dropdown
    const NavGroupComponent = ({ group }: { group: NavGroup }) => {
        const isOpen = openGroups.includes(group.title);
        const hasActiveItem = group.items.some(item => isActive(item.href));
        
        return (
            <Collapsible open={isOpen} onOpenChange={() => toggleGroup(group.title)}>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="group w-full">
                            <div className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-300 hover:shadow-sm ${
                                hasActiveItem 
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            }`}>
                                <div className="flex items-center space-x-3">
                                    <group.icon className={`h-5 w-5 transition-colors duration-300 ${
                                        hasActiveItem 
                                            ? 'text-sidebar-accent-foreground' 
                                            : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                                    }`} />
                                    <span className={`font-medium transition-colors duration-300 ${
                                        hasActiveItem 
                                            ? 'text-sidebar-accent-foreground' 
                                            : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                                    }`}>
                                        {group.title}
                                    </span>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                                    isOpen ? 'rotate-180' : ''
                                } ${
                                    hasActiveItem 
                                        ? 'text-sidebar-accent-foreground' 
                                        : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                                }`} />
                            </div>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenu className="space-y-1 mt-1">
                            {group.items.map((item) => (
                                <MenuItem key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    };

    return (
        <SidebarContent className="px-3 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
            <SidebarMenu className="space-y-2">
                {navigationGroups.map((group) => (
                    <NavGroupComponent key={group.title} group={group} />
                ))}
            </SidebarMenu>
        </SidebarContent>
    );
}

export function AdminSidebar() {
    return (
        <Sidebar className="border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out">
            <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
                <div className="flex items-center justify-center p-6">
                    <Link href="/admin" className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                            <Award className="h-7 w-7 text-sidebar-primary-foreground" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-sidebar-foreground group-hover:text-sidebar-primary transition-colors duration-300 tracking-tight">
                                Atcho
                            </span>
                            <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                                Fashion Platform
                            </span>
                        </div>
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContentComponent />

            <SidebarFooter className="border-t border-sidebar-border bg-sidebar p-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center shadow-lg">
                        <Award className="h-5 w-5 text-sidebar-primary-foreground" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-sidebar-foreground">Atcho Platform</p>
                        <p className="text-xs text-muted-foreground font-medium">Fashion Management System</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}