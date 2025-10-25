import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, FileText, Calendar, Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';

export default function ReportCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        type: '',
        parametres: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/reports');
    };

    const getTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'utilisateurs':
                return <Users className="h-4 w-4 text-blue-600" />;
            case 'ventes':
                return <DollarSign className="h-4 w-4 text-green-600" />;
            case 'performance':
                return <TrendingUp className="h-4 w-4 text-purple-600" />;
            case 'financier':
                return <BarChart3 className="h-4 w-4 text-yellow-600" />;
            default:
                return <FileText className="h-4 w-4 text-gray-600" />;
        }
    };

    return (
        <AdminLayout>
            <Head title="Créer un Rapport" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Rapport</h1>
                        <p className="text-muted-foreground">
                            Générez un nouveau rapport personnalisé
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Informations Générales
                                </CardTitle>
                                <CardDescription>
                                    Définissez les paramètres de base du rapport
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom du Rapport</Label>
                                    <Input
                                        id="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        placeholder="Ex: Rapport Utilisateurs Q1 2024"
                                        className={errors.nom ? 'border-red-500' : ''}
                                    />
                                    {errors.nom && (
                                        <p className="text-sm text-red-500">{errors.nom}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Décrivez le contenu et l'objectif de ce rapport..."
                                        rows={3}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Type de Rapport</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Sélectionnez un type de rapport" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utilisateurs">
                                                <div className="flex items-center">
                                                    {getTypeIcon('utilisateurs')}
                                                    <span className="ml-2">Utilisateurs</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="ventes">
                                                <div className="flex items-center">
                                                    {getTypeIcon('ventes')}
                                                    <span className="ml-2">Ventes</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="performance">
                                                <div className="flex items-center">
                                                    {getTypeIcon('performance')}
                                                    <span className="ml-2">Performance</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="financier">
                                                <div className="flex items-center">
                                                    {getTypeIcon('financier')}
                                                    <span className="ml-2">Financier</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-500">{errors.type}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Paramètres Avancés
                                </CardTitle>
                                <CardDescription>
                                    Configurez les options de génération
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="parametres">Paramètres JSON</Label>
                                    <Textarea
                                        id="parametres"
                                        value={data.parametres}
                                        onChange={(e) => setData('parametres', e.target.value)}
                                        placeholder='{"date_debut": "2024-01-01", "date_fin": "2024-12-31", "format": "pdf"}'
                                        rows={6}
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Format JSON pour les paramètres avancés
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Link href="/admin/reports">
                            <Button variant="outline" type="button">
                                Annuler
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Création...' : 'Créer le Rapport'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}


