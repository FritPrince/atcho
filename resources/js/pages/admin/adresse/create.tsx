import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function AdresseCreate() {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        ligne1: '',
        ligne2: '',
        ville: '',
        code_postal: '',
        pays: '',
        region: '',
        latitude: '',
        longitude: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/adresses');
    };

    return (
        <AdminLayout>
            <Head title="Créer une Adresse" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/adresses">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer une Adresse</h1>
                        <p className="text-muted-foreground">
                            Ajoutez une nouvelle adresse à la plateforme
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MapPin className="mr-2 h-5 w-5" />
                            Informations de l'adresse
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer une nouvelle adresse
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="user_id">Utilisateur</Label>
                                    <Input
                                        id="user_id"
                                        type="number"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        placeholder="ID de l'utilisateur"
                                        required
                                    />
                                    {errors.user_id && (
                                        <p className="text-sm text-red-600">{errors.user_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pays">Pays</Label>
                                    <Input
                                        id="pays"
                                        value={data.pays}
                                        onChange={(e) => setData('pays', e.target.value)}
                                        placeholder="Pays"
                                        required
                                    />
                                    {errors.pays && (
                                        <p className="text-sm text-red-600">{errors.pays}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ligne1">Adresse ligne 1</Label>
                                <Input
                                    id="ligne1"
                                    value={data.ligne1}
                                    onChange={(e) => setData('ligne1', e.target.value)}
                                    placeholder="Numéro et nom de rue"
                                    required
                                />
                                {errors.ligne1 && (
                                    <p className="text-sm text-red-600">{errors.ligne1}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ligne2">Adresse ligne 2 (optionnel)</Label>
                                <Input
                                    id="ligne2"
                                    value={data.ligne2}
                                    onChange={(e) => setData('ligne2', e.target.value)}
                                    placeholder="Complément d'adresse"
                                />
                                {errors.ligne2 && (
                                    <p className="text-sm text-red-600">{errors.ligne2}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="ville">Ville</Label>
                                    <Input
                                        id="ville"
                                        value={data.ville}
                                        onChange={(e) => setData('ville', e.target.value)}
                                        placeholder="Ville"
                                        required
                                    />
                                    {errors.ville && (
                                        <p className="text-sm text-red-600">{errors.ville}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code_postal">Code postal</Label>
                                    <Input
                                        id="code_postal"
                                        value={data.code_postal}
                                        onChange={(e) => setData('code_postal', e.target.value)}
                                        placeholder="Code postal"
                                        required
                                    />
                                    {errors.code_postal && (
                                        <p className="text-sm text-red-600">{errors.code_postal}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="region">Région (optionnel)</Label>
                                    <Input
                                        id="region"
                                        value={data.region}
                                        onChange={(e) => setData('region', e.target.value)}
                                        placeholder="Région"
                                    />
                                    {errors.region && (
                                        <p className="text-sm text-red-600">{errors.region}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude (optionnel)</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        placeholder="Latitude"
                                    />
                                    {errors.latitude && (
                                        <p className="text-sm text-red-600">{errors.latitude}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude (optionnel)</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        placeholder="Longitude"
                                    />
                                    {errors.longitude && (
                                        <p className="text-sm text-red-600">{errors.longitude}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/adresses">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer l\'adresse'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
