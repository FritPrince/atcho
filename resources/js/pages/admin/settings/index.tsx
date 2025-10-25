import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Globe, Mail, Shield, Bell, HardDrive, Zap, Edit, Eye, Trash2 } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Settings {
    general: {
        site_name: string;
        site_description: string;
        site_url: string;
        admin_email: string;
        timezone: string;
        language: string;
    };
    email: {
        smtp_host: string;
        smtp_port: number;
        smtp_username: string;
        smtp_encryption: string;
        from_name: string;
        from_email: string;
    };
    security: {
        password_min_length: number;
        password_require_special: boolean;
        session_timeout: number;
        max_login_attempts: number;
        two_factor_enabled: boolean;
    };
    notifications: {
        email_notifications: boolean;
        push_notifications: boolean;
        sms_notifications: boolean;
        notification_frequency: string;
    };
    storage: {
        max_file_size: number;
        allowed_file_types: string[];
        storage_driver: string;
        backup_enabled: boolean;
    };
    api: {
        rate_limit: number;
        api_key_expiry: number;
        webhook_enabled: boolean;
        cors_enabled: boolean;
    };
}

interface Props {
    settings: Settings;
}

export default function SettingsIndex({ settings }: Props) {
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

    const getCategoryDescription = (category: string) => {
        switch (category) {
            case 'general':
                return 'Configuration générale de la plateforme';
            case 'email':
                return 'Paramètres SMTP et envoi d\'emails';
            case 'security':
                return 'Politiques de sécurité et authentification';
            case 'notifications':
                return 'Préférences de notification';
            case 'storage':
                return 'Gestion des fichiers et sauvegarde';
            case 'api':
                return 'Configuration de l\'API et intégrations';
            default:
                return '';
        }
    };

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatBoolean = (value: boolean) => {
        return value ? 'Activé' : 'Désactivé';
    };

    const getBooleanColor = (value: boolean) => {
        return value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <AdminLayout>
            <Head title="Paramètres du Système" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Paramètres du Système</h1>
                        <p className="text-muted-foreground">
                            Gérez la configuration de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/settings/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Paramètre
                        </Button>
                    </Link>
                </div>

                {/* Catégories de paramètres */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(settings).map(([category, config]) => (
                        <Card key={category} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {getCategoryIcon(category)}
                                    <span className="ml-2">{getCategoryTitle(category)}</span>
                                </CardTitle>
                                <CardDescription>
                                    {getCategoryDescription(category)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(config).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <span className="text-sm font-medium capitalize">
                                                {key.replace(/_/g, ' ')}:
                                            </span>
                                            <div className="text-right">
                                                {typeof value === 'boolean' ? (
                                                    <Badge className={getBooleanColor(value)}>
                                                        {formatBoolean(value)}
                                                    </Badge>
                                                ) : Array.isArray(value) ? (
                                                    <span className="text-sm text-muted-foreground">
                                                        {value.length} éléments
                                                    </span>
                                                ) : key === 'max_file_size' ? (
                                                    <span className="text-sm text-muted-foreground">
                                                        {formatFileSize(value)}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">
                                                        {String(value)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/settings/${category}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/settings/${category}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Actions rapides */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Actions Rapides
                        </CardTitle>
                        <CardDescription>
                            Gestion rapide des paramètres système
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Globe className="h-6 w-6 mb-2" />
                                <span className="text-sm">Paramètres Généraux</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Mail className="h-6 w-6 mb-2" />
                                <span className="text-sm">Configuration Email</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Shield className="h-6 w-6 mb-2" />
                                <span className="text-sm">Sécurité</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                                <Bell className="h-6 w-6 mb-2" />
                                <span className="text-sm">Notifications</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


