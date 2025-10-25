import AdminLayout07 from './admin-layout-07';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AdminLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AdminLayout07 breadcrumbs={breadcrumbs}>
            {children}
        </AdminLayout07>
    );
}


