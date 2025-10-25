import { AdminSidebar07, AdminSidebarProvider } from '@/components/admin-sidebar-07';
import { AdminHeader07 } from '@/components/admin-header-07';
import { SidebarInset } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AdminLayout07Props {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    description?: string;
}

export default function AdminLayout07({
    children,
    breadcrumbs = [],
    title = "Dashboard",
    description = "Gérez votre plateforme de mode"
}: AdminLayout07Props) {
    return (
        <AdminSidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <AdminSidebar07 />
                <div className="flex-1 flex flex-col">
                    <AdminHeader07 
                        breadcrumbs={breadcrumbs}
                        title={title}
                        description={description}
                    />
                    <SidebarInset className="flex-1 overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            <div className="container mx-auto p-6 space-y-6">
                                {/* Page Header */}
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                                    <p className="text-muted-foreground">{description}</p>
                                </div>
                                
                                {/* Page Content */}
                                <div className="space-y-6">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </SidebarInset>
                </div>
            </div>
        </AdminSidebarProvider>
    );
}

