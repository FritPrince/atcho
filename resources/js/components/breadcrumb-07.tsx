import { ChevronRight, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    title: string;
    href?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb07({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("flex items-center space-x-1 text-sm", className)} aria-label="Breadcrumb">
            <div className="flex items-center">
                <Link 
                    href="/admin" 
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                    <Home className="h-4 w-4 mr-1" />
                    <span className="font-medium">Dashboard</span>
                </Link>
            </div>
            
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-2" />
                    {item.href ? (
                        <Link 
                            href={item.href}
                            className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                            {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    ) : (
                        <div className="flex items-center text-foreground">
                            {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                            <span className="font-semibold">{item.title}</span>
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}

export function BreadcrumbSeparator() {
    return <ChevronRight className="h-4 w-4 text-muted-foreground/50" />;
}

