import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface Avis {
    id: number;
    note: number;
    commentaire: string;
    statut: string;
    auteur_id: number;
    projet_id: number;
}

interface Props {
    avis: Avis;
}

export default function AvisEdit({ avis }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        auteur_id: avis.auteur_id.toString(),
        projet_id: avis.projet_id.toString(),
        note: avis.note,
        commentaire: avis.commentaire,
        statut: avis.statut,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/avis/${avis.id}`);
    };

    const renderStars = (note: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <button
                key={i}
                type="button"
                onClick={() => setData('note', i + 1)}
                className={`h-8 w-8 ${
                    i < note ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 transition-colors`}
            >
                <Star className={`h-6 w-6 ${i < note ? 'fill-current' : ''}`} />
            </button>
        ));
    };

    return (
        <AdminLayout>
            <Head title={`Modifier - Avis #${avis.id}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/avis/${avis.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier l'avis</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de l'avis #{avis.id}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Star className="mr-2 h-5 w-5" />
                            Informations de l'avis
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations de l'avis
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="auteur_id">Auteur</Label>
                                    <Input
                                        id="auteur_id"
                                        type="number"
                                        value={data.auteur_id}
                                        onChange={(e) => setData('auteur_id', e.target.value)}
                                        placeholder="ID de l'auteur"
                                        required
                                    />
                                    {errors.auteur_id && (
                                        <p className="text-sm text-red-600">{errors.auteur_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="projet_id">Projet</Label>
                                    <Input
                                        id="projet_id"
                                        type="number"
                                        value={data.projet_id}
                                        onChange={(e) => setData('projet_id', e.target.value)}
                                        placeholder="ID du projet"
                                        required
                                    />
                                    {errors.projet_id && (
                                        <p className="text-sm text-red-600">{errors.projet_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Note</Label>
                                <div className="flex items-center space-x-2">
                                    {renderStars(data.note)}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {data.note}/5 étoiles
                                    </span>
                                </div>
                                {errors.note && (
                                    <p className="text-sm text-red-600">{errors.note}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="statut">Statut</Label>
                                <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PUBLIE">Publié</SelectItem>
                                        <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                                        <SelectItem value="REJETE">Rejeté</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.statut && (
                                    <p className="text-sm text-red-600">{errors.statut}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="commentaire">Commentaire</Label>
                                <Textarea
                                    id="commentaire"
                                    value={data.commentaire}
                                    onChange={(e) => setData('commentaire', e.target.value)}
                                    placeholder="Commentaire de l'avis"
                                    rows={4}
                                    required
                                />
                                {errors.commentaire && (
                                    <p className="text-sm text-red-600">{errors.commentaire}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/avis/${avis.id}`}>
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


