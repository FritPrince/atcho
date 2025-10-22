import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface Competence {
    id: number;
    nom: string;
    description: string;
    niveau_requis: string;
    est_active: boolean;
}

interface Props {
    competence: Competence;
}

export default function CompetenceEdit({ competence }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: competence.nom,
        description: competence.description,
        niveau_requis: competence.niveau_requis,
        est_active: competence.est_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/competences/${competence.id}`);
    };

    const niveauxCompetence = [
        { value: 'Débutant', label: 'Débutant', description: 'Niveau d\'introduction' },
        { value: 'Intermédiaire', label: 'Intermédiaire', description: 'Niveau de base solide' },
        { value: 'Avancé', label: 'Avancé', description: 'Niveau professionnel' },
        { value: 'Expert', label: 'Expert', description: 'Niveau de spécialisation' }
    ];

    return (
        <AdminLayout>
            <Head title={`Modifier - ${competence.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/competences/${competence.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier la compétence</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de la compétence "{competence.nom}"
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Award className="mr-2 h-5 w-5" />
                            Informations de la compétence
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations de la compétence
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nom">Nom de la compétence</Label>
                                <Input
                                    id="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    placeholder="Nom de la compétence"
                                    required
                                />
                                {errors.nom && (
                                    <p className="text-sm text-red-600">{errors.nom}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description de la compétence"
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="niveau_requis">Niveau requis</Label>
                                <select
                                    id="niveau_requis"
                                    value={data.niveau_requis}
                                    onChange={(e) => setData('niveau_requis', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {niveauxCompetence.map((niveau) => (
                                        <option key={niveau.value} value={niveau.value}>
                                            {niveau.label} - {niveau.description}
                                        </option>
                                    ))}
                                </select>
                                {errors.niveau_requis && (
                                    <p className="text-sm text-red-600">{errors.niveau_requis}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="est_active"
                                    checked={data.est_active}
                                    onChange={(e) => setData('est_active', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="est_active">Compétence active</Label>
                            </div>
                            {errors.est_active && (
                                <p className="text-sm text-red-600">{errors.est_active}</p>
                            )}

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/competences/${competence.id}`}>
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
