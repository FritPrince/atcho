import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Bell, Calendar, User, Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Notification {
    id: number;
    titre: string;
    message: string;
    type: string;
    est_lue: boolean;
    date_envoi: string;
    destinataire: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    notifications: {
        data: Notification[];
        links: any[];
        meta: any;
    };
}

export default function NotificationIndex({ notifications }: Props) {
    // Protection contre les données manquantes
    const notificationsList = notifications?.data || [];
    
    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'info':
                return 'bg-blue-100 text-blue-800';
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeText = (type: string) => {
        switch (type.toLowerCase()) {
            case 'info':
                return 'Information';
            case 'success':
                return 'Succès';
            case 'warning':
                return 'Avertissement';
            case 'error':
                return 'Erreur';
            default:
                return 'Général';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'info':
                return <Bell className="h-4 w-4 text-blue-600" />;
            case 'success':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'warning':
                return <AlertCircle className="h-4 w-4 text-yellow-600" />;
            case 'error':
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Bell className="h-4 w-4 text-gray-600" />;
        }
    };

    const getStatusColor = (isRead: boolean) => {
        return isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800';
    };

    const getStatusText = (isRead: boolean) => {
        return isRead ? 'Lue' : 'Non lue';
    };

    const getStatusIcon = (isRead: boolean) => {
        return isRead ? 
            <CheckCircle className="h-4 w-4 text-gray-600" /> : 
            <Clock className="h-4 w-4 text-blue-600" />;
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Notifications" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Notifications</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les notifications du système
                        </p>
                    </div>
                    <Link href="/admin/notifications/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Notification
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {notificationsList.map((notification) => (
                        <Card key={notification.id} className={notification.est_lue ? 'opacity-75' : 'border-blue-200'}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        {getTypeIcon(notification.type)}
                                        <span className="ml-2">{notification.titre}</span>
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(notification.est_lue)}
                                        <Badge className={getStatusColor(notification.est_lue)}>
                                            {getStatusText(notification.est_lue)}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {notification.message}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Type:</span>
                                        <Badge className={getTypeColor(notification.type)}>
                                            {getTypeText(notification.type)}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Destinataire:</span> {notification.destinataire?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Envoyée:</span> {formatDateTime(notification.date_envoi)}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        Créée le {new Date(notification.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/notifications/${notification.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/notifications/${notification.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
