import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    // Protection robuste contre les breadcrumbs invalides
    if (!Array.isArray(breadcrumbs)) {
        return null;
    }

    const validBreadcrumbs = breadcrumbs.filter(item => {
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

    return (
        <>
            {validBreadcrumbs.length > 0 && (
                <Breadcrumb className="ml-2">
                    <BreadcrumbList className="flex items-center space-x-1 text-sm">
                        {validBreadcrumbs.map((item, index) => {
                            const isLast = index === validBreadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="font-medium text-sidebar-foreground">
                                                {item.title}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link 
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-sidebar-foreground transition-colors duration-200"
                                                >
                                                    {item.title}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && (
                                        <BreadcrumbSeparator className="text-muted-foreground/50" />
                                    )}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
