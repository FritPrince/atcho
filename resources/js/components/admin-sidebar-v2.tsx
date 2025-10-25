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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
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
    Cog,
    FileSpreadsheet,
    FileText,
    LayoutGrid,
    MessageSquare,
    Settings,
    ShoppingBag,
    Users2,
    UserCog,
    Bell,
    Wallet,
    Star,
    AlertCircle,
    Growth,
    FileBarChart,
    DocumentText,
    Config,
    Award,
    Briefcase,
    Target,
    ChevronDown,
    Zap,
    Layers,
    Grid3X3,
    Activity,
    PieChart,
    ShoppingCart,
    MapPin,
    Location,
    ClipboardCheck,
    Schedule,
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
                <SidebarMenuButton asChild isActive={active}>
                    <Link href={item.href}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
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
                        <SidebarMenuButton className="group w-full" isActive={hasActiveItem}>
                            <group.icon />
                            <span>{group.title}</span>
                            <ChevronDown className={`ml-auto transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                            }`} />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {group.items.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuSubButton asChild isActive={isActive(item.href)}>
                                        <Link href={item.href}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    };

    return (
        <SidebarContent>
            <SidebarMenu className="space-y-1">
                {navigationGroups.map((group) => (
                    <NavGroupComponent key={group.title} group={group} />
                ))}
            </SidebarMenu>
        </SidebarContent>
    );
}

export function AdminSidebarV2() {
    return (
        <Sidebar className="border-sidebar-border bg-sidebar">
            <SidebarHeader className="border-b border-sidebar-border bg-sidebar">
                <div className="flex items-center justify-center p-6">
                    <Link href="/admin" className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                            <Award className="h-7 w-7 text-sidebar-primary-foreground" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-sidebar-foreground group-hover:text-sidebar-primary transition-colors duration-300">
                                Atcho
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                                Fashion Platform
                            </span>
                        </div>
                    </Link>
                </div>
            </SidebarHeader>
            
            <SidebarContentComponent />
            
            <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    );
}

