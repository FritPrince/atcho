import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Settings, Globe, Mail, Shield, Bell, HardDrive, Zap } from 'lucide-react';
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

export default function SettingsEdit({ setting }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        category: setting.category || '',
        key: setting.key || '',
        value: setting.value || '',
        description: setting.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/settings/${setting.id}`);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'general':
                return <Globe className="h-4 w-4 text-blue-600" />;
            case 'email':
                return <Mail className="h-4 w-4 text-green-600" />;
            case 'security':
                return <Shield className="h-4 w-4 text-red-600" />;
            case 'notifications':
                return <Bell className="h-4 w-4 text-yellow-600" />;
            case 'storage':
                return <HardDrive className="h-4 w-4 text-purple-600" />;
            case 'api':
                return <Zap className="h-4 w-4 text-orange-600" />;
            default:
                return <Settings className="h-4 w-4 text-gray-600" />;
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

    return (
        <AdminLayout>
            <Head title={`Modifier: ${setting.key}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/settings/${setting.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier le Paramètre</h1>
                        <p className="text-muted-foreground">
                            Modifiez les paramètres du système
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Informations Générales
                                </CardTitle>
                                <CardDescription>
                                    Modifiez les paramètres de base
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Catégorie</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('general')}
                                                    <span className="ml-2">Paramètres Généraux</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="email">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('email')}
                                                    <span className="ml-2">Configuration Email</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="security">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('security')}
                                                    <span className="ml-2">Sécurité</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="notifications">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('notifications')}
                                                    <span className="ml-2">Notifications</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="storage">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('storage')}
                                                    <span className="ml-2">Stockage</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="api">
                                                <div className="flex items-center">
                                                    {getCategoryIcon('api')}
                                                    <span className="ml-2">API</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-red-500">{errors.category}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="key">Clé du Paramètre</Label>
                                    <Input
                                        id="key"
                                        value={data.key}
                                        onChange={(e) => setData('key', e.target.value)}
                                        placeholder="Ex: site_name, smtp_host, max_file_size"
                                        className={errors.key ? 'border-red-500' : ''}
                                    />
                                    {errors.key && (
                                        <p className="text-sm text-red-500">{errors.key}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="value">Valeur</Label>
                                    <Input
                                        id="value"
                                        value={data.value}
                                        onChange={(e) => setData('value', e.target.value)}
                                        placeholder="Valeur du paramètre"
                                        className={errors.value ? 'border-red-500' : ''}
                                    />
                                    {errors.value && (
                                        <p className="text-sm text-red-500">{errors.value}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" />
                                    Description
                                </CardTitle>
                                <CardDescription>
                                    Décrivez le paramètre
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Décrivez l'utilité de ce paramètre..."
                                        rows={6}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Link href={`/admin/settings/${setting.id}`}>
                            <Button variant="outline" type="button">
                                Annuler
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Mise à jour...' : 'Mettre à jour'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
