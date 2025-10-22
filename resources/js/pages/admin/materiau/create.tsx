import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function MateriauCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        prix_unitaire: 0,
        unite_mesure: 'kg',
        stock_disponible: 0,
        stock_minimum: 0,
        est_actif: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/materiaux');
    };

    const unitesMesure = [
        { value: 'kg', label: 'Kilogramme (kg)' },
        { value: 'g', label: 'Gramme (g)' },
        { value: 'm', label: 'Mètre (m)' },
        { value: 'cm', label: 'Centimètre (cm)' },
        { value: 'mm', label: 'Millimètre (mm)' },
        { value: 'L', label: 'Litre (L)' },
        { value: 'mL', label: 'Millilitre (mL)' },
        { value: 'm²', label: 'Mètre carré (m²)' },
        { value: 'm³', label: 'Mètre cube (m³)' },
        { value: 'unité', label: 'Unité' },
        { value: 'pièce', label: 'Pièce' },
        { value: 'rouleau', label: 'Rouleau' },
        { value: 'feuille', label: 'Feuille' },
        { value: 'bobine', label: 'Bobine' }
    ];

    return (
        <AdminLayout>
            <Head title="Créer un Matériau" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/materiaux">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Matériau</h1>
                        <p className="text-muted-foreground">
                            Ajoutez un nouveau matériau
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Package className="mr-2 h-5 w-5" />
                            Informations du matériau
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau matériau
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom du matériau</Label>
                                    <Input
                                        id="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        placeholder="Nom du matériau"
                                        required
                                    />
                                    {errors.nom && (
                                        <p className="text-sm text-red-600">{errors.nom}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prix_unitaire">Prix unitaire (€)</Label>
                                    <Input
                                        id="prix_unitaire"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.prix_unitaire}
                                        onChange={(e) => setData('prix_unitaire', parseFloat(e.target.value))}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.prix_unitaire && (
                                        <p className="text-sm text-red-600">{errors.prix_unitaire}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description du matériau"
                                    rows={3}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="unite_mesure">Unité de mesure</Label>
                                    <select
                                        id="unite_mesure"
                                        value={data.unite_mesure}
                                        onChange={(e) => setData('unite_mesure', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {unitesMesure.map((unite) => (
                                            <option key={unite.value} value={unite.value}>
                                                {unite.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.unite_mesure && (
                                        <p className="text-sm text-red-600">{errors.unite_mesure}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock_disponible">Stock disponible</Label>
                                    <Input
                                        id="stock_disponible"
                                        type="number"
                                        min="0"
                                        value={data.stock_disponible}
                                        onChange={(e) => setData('stock_disponible', parseInt(e.target.value))}
                                        placeholder="0"
                                        required
                                    />
                                    {errors.stock_disponible && (
                                        <p className="text-sm text-red-600">{errors.stock_disponible}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="stock_minimum">Stock minimum</Label>
                                    <Input
                                        id="stock_minimum"
                                        type="number"
                                        min="0"
                                        value={data.stock_minimum}
                                        onChange={(e) => setData('stock_minimum', parseInt(e.target.value))}
                                        placeholder="0"
                                        required
                                    />
                                    {errors.stock_minimum && (
                                        <p className="text-sm text-red-600">{errors.stock_minimum}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="est_actif"
                                            checked={data.est_actif}
                                            onChange={(e) => setData('est_actif', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <Label htmlFor="est_actif">Matériau actif</Label>
                                    </div>
                                    {errors.est_actif && (
                                        <p className="text-sm text-red-600">{errors.est_actif}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/materiaux">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le matériau'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
