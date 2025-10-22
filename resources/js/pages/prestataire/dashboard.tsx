import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import prestataireRoutes from '@/routes/prestataire';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Prestataire',
        href: prestataireRoutes.dashboard().url,
    },
];

export default function PrestataireDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Prestataire" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Dashboard Prestataire
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Gérez vos services et collaborations
                    </p>
                </div>
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Services</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Mes services</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Collaborations</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Projets en cours</p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 p-4">
                            <h3 className="font-semibold">Revenus</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Suivi des revenus</p>
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


