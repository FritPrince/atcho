import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    // Protection robuste contre les breadcrumbs undefined ou invalides
    let safeBreadcrumbs: BreadcrumbItemType[] = [];
    
    try {
        if (Array.isArray(breadcrumbs)) {
            safeBreadcrumbs = breadcrumbs.filter(item => {
                try {
                    return item && 
                        typeof item === 'object' && 
                        typeof item.title === 'string' && 
                        typeof item.href === 'string' &&
                        item.title.trim() !== '' &&
                        item.href.trim() !== '';
                } catch (error) {
                    console.warn('Invalid breadcrumb item:', item, error);
                    return false;
                }
            });
        }
    } catch (error) {
        console.warn('Error processing breadcrumbs:', error);
        safeBreadcrumbs = [];
    }

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4 shadow-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 rounded-md p-1" />
                {safeBreadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={safeBreadcrumbs} />}
            </div>
        </header>
    );
}
