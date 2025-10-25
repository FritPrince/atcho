import { SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb07 } from '@/components/breadcrumb-07';
import { type BreadcrumbItem } from '@/types';
import { 
    Bell, 
    Search, 
    Settings, 
    User,
    Moon,
    Sun,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    description?: string;
}

export function AdminHeader07({ 
    breadcrumbs = [], 
    title = "Dashboard",
    description = "Gérez votre plateforme de mode"
}: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Left side - Sidebar trigger and breadcrumb */}
                <div className="flex items-center space-x-4">
                    <SidebarTrigger className="h-9 w-9" />
                    <div className="hidden md:block">
                        <Breadcrumb07 items={breadcrumbs} />
                    </div>
                </div>

                {/* Center - Title and description (mobile) */}
                <div className="flex-1 md:hidden text-center">
                    <h1 className="text-lg font-semibold truncate">{title}</h1>
                </div>

                {/* Right side - Search, notifications, user menu */}
                <div className="flex items-center space-x-2">
                    {/* Search */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                                placeholder="Rechercher..." 
                                className="pl-10 w-64"
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    {/* Theme toggle */}
                    <Button variant="ghost" size="icon">
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* User menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatars/01.png" alt="Admin" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        admin@atcho.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Paramètres</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Déconnexion</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Mobile breadcrumb */}
            {breadcrumbs.length > 0 && (
                <div className="md:hidden border-t bg-muted/50 px-4 py-2">
                    <Breadcrumb07 items={breadcrumbs} />
                </div>
            )}
        </header>
    );
}

