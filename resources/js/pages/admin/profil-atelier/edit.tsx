import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface ProfilAtelier {
    id: number;
    nom_atelier: string;
    description: string;
    statut: string;
    user_id: number;
}

interface Props {
    profilAtelier: ProfilAtelier;
}

export default function ProfilAtelierEdit({ profilAtelier }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: profilAtelier.user_id.toString(),
        nom_atelier: profilAtelier.nom_atelier,
        description: profilAtelier.description,
        statut: profilAtelier.statut,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/profils-ateliers/${profilAtelier.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Modifier - ${profilAtelier.nom_atelier}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/profils-ateliers/${profilAtelier.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier le profil atelier</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de {profilAtelier.nom_atelier}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Building2 className="mr-2 h-5 w-5" />
                            Informations du profil atelier
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations du profil atelier
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
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">En attente</SelectItem>
                                            <SelectItem value="APPROVED">Approuvé</SelectItem>
                                            <SelectItem value="REJECTED">Rejeté</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nom_atelier">Nom de l'atelier</Label>
                                <Input
                                    id="nom_atelier"
                                    value={data.nom_atelier}
                                    onChange={(e) => setData('nom_atelier', e.target.value)}
                                    placeholder="Nom de l'atelier"
                                    required
                                />
                                {errors.nom_atelier && (
                                    <p className="text-sm text-red-600">{errors.nom_atelier}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description de l'atelier"
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/profils-ateliers/${profilAtelier.id}`}>
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


