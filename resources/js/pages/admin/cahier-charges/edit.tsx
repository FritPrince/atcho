import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface CahierCharges {
    id: number;
    titre: string;
    description: string;
    fichier: string | null;
    projet_id: number;
}

interface Props {
    cahierCharges: CahierCharges;
}

export default function CahierChargesEdit({ cahierCharges }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        projet_id: cahierCharges.projet_id.toString(),
        titre: cahierCharges.titre,
        description: cahierCharges.description,
        fichier: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/cahiers-charges/${cahierCharges.id}`);
    };

    return (
        <>
            <Head title={`Modifier - ${cahierCharges.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/cahiers-charges/${cahierCharges.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier le cahier des charges</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de {cahierCharges.titre}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Informations du cahier des charges
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations du cahier des charges
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
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

                                <div className="space-y-2">
                                    <Label htmlFor="titre">Titre</Label>
                                    <Input
                                        id="titre"
                                        value={data.titre}
                                        onChange={(e) => setData('titre', e.target.value)}
                                        placeholder="Titre du cahier des charges"
                                        required
                                    />
                                    {errors.titre && (
                                        <p className="text-sm text-red-600">{errors.titre}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description détaillée du cahier des charges"
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fichier">Nouveau fichier (optionnel)</Label>
                                <Input
                                    id="fichier"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setData('fichier', e.target.files?.[0] || null)}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Formats acceptés: PDF, DOC, DOCX. Laissez vide pour conserver le fichier actuel.
                                </p>
                                {errors.fichier && (
                                    <p className="text-sm text-red-600">{errors.fichier}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/cahiers-charges/${cahierCharges.id}`}>
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
        </>
    );
}


