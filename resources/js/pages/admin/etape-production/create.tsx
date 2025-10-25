import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function EtapeProductionCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        ordre: 1,
        duree_estimee_heures: 1,
        est_terminee: false,
        date_debut: '',
        date_completion: '',
        photos: '',
        commande_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/etapes-production');
    };

    return (
        <AdminLayout>
            <Head title="Créer une Étape de Production" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/etapes-production">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer une Étape de Production</h1>
                        <p className="text-muted-foreground">
                            Ajoutez une nouvelle étape de production
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Settings className="mr-2 h-5 w-5" />
                            Informations de l'étape
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer une nouvelle étape de production
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom de l'étape</Label>
                                    <Input
                                        id="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        placeholder="Nom de l'étape"
                                        required
                                    />
                                    {errors.nom && (
                                        <p className="text-sm text-red-600">{errors.nom}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ordre">Ordre</Label>
                                    <Input
                                        id="ordre"
                                        type="number"
                                        min="1"
                                        value={data.ordre}
                                        onChange={(e) => setData('ordre', parseInt(e.target.value))}
                                        placeholder="Ordre d'exécution"
                                        required
                                    />
                                    {errors.ordre && (
                                        <p className="text-sm text-red-600">{errors.ordre}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description de l'étape"
                                    rows={3}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="duree_estimee_heures">Durée estimée (heures)</Label>
                                    <Input
                                        id="duree_estimee_heures"
                                        type="number"
                                        step="0.5"
                                        min="0.5"
                                        value={data.duree_estimee_heures}
                                        onChange={(e) => setData('duree_estimee_heures', parseFloat(e.target.value))}
                                        placeholder="Durée en heures"
                                        required
                                    />
                                    {errors.duree_estimee_heures && (
                                        <p className="text-sm text-red-600">{errors.duree_estimee_heures}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="commande_id">Commande</Label>
                                    <Input
                                        id="commande_id"
                                        type="number"
                                        value={data.commande_id}
                                        onChange={(e) => setData('commande_id', e.target.value)}
                                        placeholder="ID de la commande"
                                        required
                                    />
                                    {errors.commande_id && (
                                        <p className="text-sm text-red-600">{errors.commande_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date_debut">Date de début (optionnel)</Label>
                                    <Input
                                        id="date_debut"
                                        type="datetime-local"
                                        value={data.date_debut}
                                        onChange={(e) => setData('date_debut', e.target.value)}
                                    />
                                    {errors.date_debut && (
                                        <p className="text-sm text-red-600">{errors.date_debut}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_completion">Date de fin (optionnel)</Label>
                                    <Input
                                        id="date_completion"
                                        type="datetime-local"
                                        value={data.date_completion}
                                        onChange={(e) => setData('date_completion', e.target.value)}
                                    />
                                    {errors.date_completion && (
                                        <p className="text-sm text-red-600">{errors.date_completion}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photos">Photos (URLs séparées par des virgules)</Label>
                                <Textarea
                                    id="photos"
                                    value={data.photos}
                                    onChange={(e) => setData('photos', e.target.value)}
                                    placeholder="URL1, URL2, URL3..."
                                    rows={2}
                                />
                                {errors.photos && (
                                    <p className="text-sm text-red-600">{errors.photos}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/etapes-production">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer l\'étape'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


