import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Euro } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function PaiementCreate() {
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
        methode: 'CARTE',
        statut: 'EN_ATTENTE',
        reference: '',
        date_paiement: '',
        commande_id: '',
        utilisateur_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/paiements');
    };

    return (
        <AdminLayout>
            <Head title="Créer un Paiement" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/paiements">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Paiement</h1>
                        <p className="text-muted-foreground">
                            Enregistrez un nouveau paiement
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Informations du paiement
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau paiement
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="montant">Montant</Label>
                                    <div className="relative">
                                        <Euro className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="montant"
                                            type="number"
                                            step="0.01"
                                            value={data.montant}
                                            onChange={(e) => setData('montant', e.target.value)}
                                            placeholder="0.00"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                    {errors.montant && (
                                        <p className="text-sm text-red-600">{errors.montant}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="methode">Méthode de paiement</Label>
                                    <Select value={data.methode} onValueChange={(value) => setData('methode', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une méthode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CARTE">Carte bancaire</SelectItem>
                                            <SelectItem value="VIREMENT">Virement</SelectItem>
                                            <SelectItem value="PAYPAL">PayPal</SelectItem>
                                            <SelectItem value="ESPECES">Espèces</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.methode && (
                                        <p className="text-sm text-red-600">{errors.methode}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="reference">Référence</Label>
                                    <Input
                                        id="reference"
                                        value={data.reference}
                                        onChange={(e) => setData('reference', e.target.value)}
                                        placeholder="Référence du paiement"
                                        required
                                    />
                                    {errors.reference && (
                                        <p className="text-sm text-red-600">{errors.reference}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                                            <SelectItem value="PAYE">Payé</SelectItem>
                                            <SelectItem value="ECHEC">Échec</SelectItem>
                                            <SelectItem value="REMBOURSE">Remboursé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date_paiement">Date de paiement</Label>
                                    <Input
                                        id="date_paiement"
                                        type="datetime-local"
                                        value={data.date_paiement}
                                        onChange={(e) => setData('date_paiement', e.target.value)}
                                    />
                                    {errors.date_paiement && (
                                        <p className="text-sm text-red-600">{errors.date_paiement}</p>
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

                            <div className="space-y-2">
                                <Label htmlFor="utilisateur_id">Utilisateur</Label>
                                <Input
                                    id="utilisateur_id"
                                    type="number"
                                    value={data.utilisateur_id}
                                    onChange={(e) => setData('utilisateur_id', e.target.value)}
                                    placeholder="ID de l'utilisateur"
                                    required
                                />
                                {errors.utilisateur_id && (
                                    <p className="text-sm text-red-600">{errors.utilisateur_id}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/paiements">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le paiement'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
