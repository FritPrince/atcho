import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import createurRoutes from '@/routes/createur';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Créateur',
        href: createurRoutes.dashboard().url,
    },
];

export default function CreateurDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Créateur" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard Créateur
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Gérez vos projets et collaborez avec des ateliers
                    </p>
                </div>
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Mes Projets</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Gérer mes projets</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Devis Reçus</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Consulter les devis</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Portfolio</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Mon portfolio</p>
                        </div>
                    </div>
                </div>
                
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="relative z-10 p-4">
                        <h3 className="font-semibold">Activité Récente</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Vos dernières activités</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


