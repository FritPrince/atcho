import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Flag } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function SignalementCreate() {
    const { data, setData, post, processing, errors } = useForm({
        type: '',
        description: '',
        priorite: 'moyenne',
        signalant_id: '',
        signale_id: '',
        date_signalement: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/signalements');
    };

    const typesSignalement = [
        { value: 'contenu_inapproprié', label: 'Contenu inapproprié', description: 'Signalement de contenu inapproprié' },
        { value: 'comportement_abusif', label: 'Comportement abusif', description: 'Signalement de comportement abusif' },
        { value: 'spam', label: 'Spam', description: 'Signalement de spam' },
        { value: 'faux_profil', label: 'Faux profil', description: 'Signalement de faux profil' },
        { value: 'autre', label: 'Autre', description: 'Autre type de signalement' }
    ];

    const priorites = [
        { value: 'faible', label: 'Faible', description: 'Priorité faible' },
        { value: 'moyenne', label: 'Moyenne', description: 'Priorité moyenne' },
        { value: 'haute', label: 'Haute', description: 'Priorité haute' },
        { value: 'critique', label: 'Critique', description: 'Priorité critique' }
    ];

    return (
        <AdminLayout>
            <Head title="Créer un Signalement" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/signalements">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Signalement</h1>
                        <p className="text-muted-foreground">
                            Ajoutez un nouveau signalement
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Flag className="mr-2 h-5 w-5" />
                            Informations du signalement
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau signalement
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type de signalement</Label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Sélectionner un type</option>
                                        {typesSignalement.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label} - {type.description}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priorite">Priorité</Label>
                                    <select
                                        id="priorite"
                                        value={data.priorite}
                                        onChange={(e) => setData('priorite', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {priorites.map((priorite) => (
                                            <option key={priorite.value} value={priorite.value}>
                                                {priorite.label} - {priorite.description}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.priorite && (
                                        <p className="text-sm text-red-600">{errors.priorite}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description détaillée du signalement"
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="signalant_id">ID du signalant</Label>
                                    <Input
                                        id="signalant_id"
                                        type="number"
                                        value={data.signalant_id}
                                        onChange={(e) => setData('signalant_id', e.target.value)}
                                        placeholder="ID de l'utilisateur qui signale"
                                        required
                                    />
                                    {errors.signalant_id && (
                                        <p className="text-sm text-red-600">{errors.signalant_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signale_id">ID de la personne signalée</Label>
                                    <Input
                                        id="signale_id"
                                        type="number"
                                        value={data.signale_id}
                                        onChange={(e) => setData('signale_id', e.target.value)}
                                        placeholder="ID de la personne signalée"
                                        required
                                    />
                                    {errors.signale_id && (
                                        <p className="text-sm text-red-600">{errors.signale_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_signalement">Date du signalement (optionnel)</Label>
                                <Input
                                    id="date_signalement"
                                    type="datetime-local"
                                    value={data.date_signalement}
                                    onChange={(e) => setData('date_signalement', e.target.value)}
                                />
                                {errors.date_signalement && (
                                    <p className="text-sm text-red-600">{errors.date_signalement}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/signalements">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le signalement'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


