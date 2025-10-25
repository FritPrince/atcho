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
    TrendingUp,
    Award,
    Briefcase,
    ChevronDown,
    Layers,
    Grid3X3,
    MapPin,
    ClipboardCheck,
} from 'lucide-react';
import AppLogo from './app-logo';

// Design élégant et professionnel pour la mode
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
                icon: MapPin,
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
                icon: Calendar,
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
                icon: TrendingUp,
            },
            {
                title: 'Rapports',
                href: '/admin/reports',
                icon: BarChart3,
            },
            {
                title: 'Documents',
                href: '/admin/documents',
                icon: FileText,
            },
            {
                title: 'Paramètres',
                href: '/admin/settings',
                icon: Settings,
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

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {navigationGroups.map((group) => {
                            const isOpen = openGroups.includes(group.title);
                            const hasActiveItem = group.items.some(item => isActive(item.href));
                            
                            return (
                                <Collapsible
                                    key={group.title}
                                    asChild
                                    open={isOpen}
                                    onOpenChange={() => toggleGroup(group.title)}
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={group.title} isActive={hasActiveItem}>
                                                <group.icon />
                                                <span>{group.title}</span>
                                                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}

export function AdminSidebar07() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <Award className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Atcho</span>
                        <span className="truncate text-xs">Fashion Platform</span>
                    </div>
                </div>
            </SidebarHeader>
            
            <SidebarContentComponent />
            
            <SidebarFooter>
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
