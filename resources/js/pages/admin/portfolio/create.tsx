import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Image } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function PortfolioCreate() {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        createur_id: '',
        images: [] as File[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/portfolios');
    };

    return (
        <AdminLayout>
            <Head title="Créer un Portfolio" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/portfolios">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Portfolio</h1>
                        <p className="text-muted-foreground">
                            Ajoutez un nouveau portfolio à la plateforme
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Image className="mr-2 h-5 w-5" />
                            Informations du portfolio
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="titre">Titre du portfolio</Label>
                                    <Input
                                        id="titre"
                                        value={data.titre}
                                        onChange={(e) => setData('titre', e.target.value)}
                                        placeholder="Titre du portfolio"
                                        required
                                    />
                                    {errors.titre && (
                                        <p className="text-sm text-red-600">{errors.titre}</p>
                                    )}
                                </div>

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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description du portfolio"
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="images">Images (optionnel)</Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setData('images', Array.from(e.target.files || []))}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Formats acceptés: JPG, PNG, GIF
                                </p>
                                {errors.images && (
                                    <p className="text-sm text-red-600">{errors.images}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/portfolios">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le portfolio'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
