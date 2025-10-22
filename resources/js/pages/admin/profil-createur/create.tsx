import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function ProfilCreateurCreate() {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        biographie: '',
        specialites: '',
        statut: 'PENDING',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/profils-createurs');
    };

    return (
        <AdminLayout>
            <Head title="Créer un Profil Créateur" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/profils-createurs">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Profil Créateur</h1>
                        <p className="text-muted-foreground">
                            Ajoutez un nouveau profil créateur à la plateforme
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Informations du profil créateur
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau profil créateur
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
                                <Label htmlFor="biographie">Biographie</Label>
                                <Textarea
                                    id="biographie"
                                    value={data.biographie}
                                    onChange={(e) => setData('biographie', e.target.value)}
                                    placeholder="Biographie du créateur"
                                    rows={4}
                                    required
                                />
                                {errors.biographie && (
                                    <p className="text-sm text-red-600">{errors.biographie}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialites">Spécialités</Label>
                                <Textarea
                                    id="specialites"
                                    value={data.specialites}
                                    onChange={(e) => setData('specialites', e.target.value)}
                                    placeholder="Spécialités du créateur"
                                    rows={3}
                                    required
                                />
                                {errors.specialites && (
                                    <p className="text-sm text-red-600">{errors.specialites}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/profils-createurs">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le profil'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
