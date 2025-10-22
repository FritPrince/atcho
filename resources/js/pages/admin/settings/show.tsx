import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Settings, Globe, Mail, Shield, Bell, HardDrive, Zap, Calendar, User } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Setting {
    id: number;
    category: string;
    key: string;
    value: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    setting: Setting;
}

export default function SettingsShow({ setting }: Props) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'general':
                return <Globe className="h-5 w-5 text-blue-600" />;
            case 'email':
                return <Mail className="h-5 w-5 text-green-600" />;
            case 'security':
                return <Shield className="h-5 w-5 text-red-600" />;
            case 'notifications':
                return <Bell className="h-5 w-5 text-yellow-600" />;
            case 'storage':
                return <HardDrive className="h-5 w-5 text-purple-600" />;
            case 'api':
                return <Zap className="h-5 w-5 text-orange-600" />;
            default:
                return <Settings className="h-5 w-5 text-gray-600" />;
        }
    };

    const getCategoryTitle = (category: string) => {
        switch (category) {
            case 'general':
                return 'Paramètres Généraux';
            case 'email':
                return 'Configuration Email';
            case 'security':
                return 'Sécurité';
            case 'notifications':
                return 'Notifications';
            case 'storage':
                return 'Stockage';
            case 'api':
                return 'API';
            default:
                return category;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'general':
                return 'bg-blue-100 text-blue-800';
            case 'email':
                return 'bg-green-100 text-green-800';
            case 'security':
                return 'bg-red-100 text-red-800';
            case 'notifications':
                return 'bg-yellow-100 text-yellow-800';
            case 'storage':
                return 'bg-purple-100 text-purple-800';
            case 'api':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
            <Head title={`Paramètre: ${setting.key}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/settings">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{setting.key}</h1>
                            <p className="text-muted-foreground">
                                Détails du paramètre système
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/settings/${setting.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                {getCategoryIcon(setting.category)}
                                <span className="ml-2">Informations Générales</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Catégorie:</span>
                                <Badge className={getCategoryColor(setting.category)}>
                                    {getCategoryTitle(setting.category)}
                                </Badge>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Clé:</span>
                                <p className="text-sm text-muted-foreground font-mono bg-gray-100 p-2 rounded">
                                    {setting.key}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Valeur:</span>
                                <p className="text-sm text-muted-foreground font-mono bg-gray-100 p-2 rounded">
                                    {setting.value}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Description:</span>
                                <p className="text-sm text-muted-foreground">
                                    {setting.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Historique
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <span className="font-medium">Créé le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(setting.created_at)}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">Modifié le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(setting.updated_at)}
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="font-medium">ID du paramètre:</span>
                                <p className="text-sm text-muted-foreground font-mono">
                                    #{setting.id}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Actions
                        </CardTitle>
                        <CardDescription>
                            Gérez ce paramètre
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2">
                            <Link href={`/admin/settings/${setting.id}/edit`}>
                                <Button variant="outline">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifier
                                </Button>
                            </Link>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
