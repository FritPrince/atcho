import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Bell, Calendar, User, Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Notification {
    id: number;
    titre: string;
    message: string;
    type: string;
    est_lue: boolean;
    date_envoi: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    notification: Notification;
}

export default function NotificationShow({ notification }: Props) {
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
                return <Bell className="h-5 w-5 text-blue-600" />;
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'error':
                return <AlertCircle className="h-5 w-5 text-red-600" />;
            default:
                return <Bell className="h-5 w-5 text-gray-600" />;
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
            <CheckCircle className="h-5 w-5 text-gray-600" /> : 
            <Clock className="h-5 w-5 text-blue-600" />;
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <Head title={`Notification - ${notification.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/notifications">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{notification.titre}</h1>
                            <p className="text-muted-foreground">Détails de la notification</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/notifications/${notification.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </Link>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Bell className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Statut:</span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(notification.est_lue)}
                                    <Badge className={getStatusColor(notification.est_lue)}>
                                        {getStatusText(notification.est_lue)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Type:</span>
                                <div className="flex items-center space-x-2">
                                    {getTypeIcon(notification.type)}
                                    <Badge className={getTypeColor(notification.type)}>
                                        {getTypeText(notification.type)}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Date d'envoi:</span>
                                <span className="text-sm text-muted-foreground">
                                    {formatDateTime(notification.date_envoi)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Destinataire
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Nom:</span>
                                <span className="text-sm text-muted-foreground">
                                    {notification.user?.name || 'Non défini'}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Email:</span>
                                <span className="text-sm text-muted-foreground">
                                    {notification.user?.email || 'Non défini'}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">ID:</span>
                                <span className="text-sm text-muted-foreground">
                                    #{notification.user?.id || 'Non défini'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Bell className="mr-2 h-5 w-5" />
                            Contenu de la notification
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <span className="font-medium">Titre:</span>
                                <p className="text-sm text-muted-foreground mt-1">{notification.titre}</p>
                            </div>
                            
                            <div>
                                <span className="font-medium">Message:</span>
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Dates importantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-medium">Créée le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(notification.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        
                        <div>
                            <span className="font-medium">Dernière modification:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(notification.updated_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


