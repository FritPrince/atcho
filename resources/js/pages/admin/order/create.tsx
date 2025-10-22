import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function OrderCreate() {
    const { data, setData, post, processing, errors } = useForm({
        createur_id: '',
        atelier_id: '',
        montant_final: '',
        statut: 'PENDING',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/orders');
    };

    return (
        <>
            <Head title="Créer une Commande" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/orders">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer une Commande</h1>
                        <p className="text-muted-foreground">
                            Ajoutez une nouvelle commande à la plateforme
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Informations de la commande
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer une nouvelle commande
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="createur_id">Créateur</Label>
                                    <Input
                                        id="createur_id"
                                        type="number"
                                        value={data.createur_id}
                                        onChange={(e) => setData('createur_id', e.target.value)}
                                        placeholder="ID du créateur"
                                        required
                                    />
                                    {errors.createur_id && (
                                        <p className="text-sm text-red-600">{errors.createur_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="atelier_id">Atelier</Label>
                                    <Input
                                        id="atelier_id"
                                        type="number"
                                        value={data.atelier_id}
                                        onChange={(e) => setData('atelier_id', e.target.value)}
                                        placeholder="ID de l'atelier"
                                        required
                                    />
                                    {errors.atelier_id && (
                                        <p className="text-sm text-red-600">{errors.atelier_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="montant_final">Montant final (€)</Label>
                                    <Input
                                        id="montant_final"
                                        type="number"
                                        value={data.montant_final}
                                        onChange={(e) => setData('montant_final', e.target.value)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    {errors.montant_final && (
                                        <p className="text-sm text-red-600">{errors.montant_final}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">En attente</SelectItem>
                                            <SelectItem value="CONFIRMED">Confirmée</SelectItem>
                                            <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                                            <SelectItem value="COMPLETED">Terminée</SelectItem>
                                            <SelectItem value="CANCELLED">Annulée</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/orders">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer la commande'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
