import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface Adresse {
    id: number;
    ligne1: string;
    ligne2?: string;
    ville: string;
    code_postal: string;
    pays: string;
    region?: string;
    latitude?: number;
    longitude?: number;
    user_id: number;
}

interface Props {
    adresse: Adresse;
}

export default function AdresseEdit({ adresse }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: adresse.user_id.toString(),
        ligne1: adresse.ligne1,
        ligne2: adresse.ligne2 || '',
        ville: adresse.ville,
        code_postal: adresse.code_postal,
        pays: adresse.pays,
        region: adresse.region || '',
        latitude: adresse.latitude?.toString() || '',
        longitude: adresse.longitude?.toString() || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/adresses/${adresse.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Modifier - ${adresse.ville}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/adresses/${adresse.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier l'adresse</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de {adresse.ville}
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
                            Modifiez les informations de l'adresse
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
                                <Link href={`/admin/adresses/${adresse.id}`}>
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Mise à jour...' : 'Mettre à jour'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


