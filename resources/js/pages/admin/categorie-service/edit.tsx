import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface CategorieService {
    id: number;
    nom: string;
    description: string;
    icone: string;
    couleur: string;
    est_active: boolean;
    ordre_affichage: number;
}

interface Props {
    categorieService: CategorieService;
}

export default function CategorieServiceEdit({ categorieService }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: categorieService.nom,
        description: categorieService.description,
        icone: categorieService.icone,
        couleur: categorieService.couleur,
        est_active: categorieService.est_active,
        ordre_affichage: categorieService.ordre_affichage,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/categories-services/${categorieService.id}`);
    };

    const couleursPredefinies = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
        '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];

    const iconesPredefinies = [
        '🏷️', '🔧', '🎨', '💻', '📱', '🏠', '🚗', '🍽️', '👕', '📚',
        '🎵', '🎬', '📸', '✈️', '🏥', '🎓', '💼', '🏋️', '🎮', '🌱'
    ];

    return (
        <AdminLayout>
            <Head title={`Modifier - ${categorieService.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/categories-services/${categorieService.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier la catégorie</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de la catégorie "{categorieService.nom}"
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Tag className="mr-2 h-5 w-5" />
                            Informations de la catégorie
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations de la catégorie de service
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom de la catégorie</Label>
                                    <Input
                                        id="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        placeholder="Nom de la catégorie"
                                        required
                                    />
                                    {errors.nom && (
                                        <p className="text-sm text-red-600">{errors.nom}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ordre_affichage">Ordre d'affichage</Label>
                                    <Input
                                        id="ordre_affichage"
                                        type="number"
                                        min="1"
                                        value={data.ordre_affichage}
                                        onChange={(e) => setData('ordre_affichage', parseInt(e.target.value))}
                                        placeholder="Ordre d'affichage"
                                        required
                                    />
                                    {errors.ordre_affichage && (
                                        <p className="text-sm text-red-600">{errors.ordre_affichage}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description de la catégorie"
                                    rows={3}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="icone">Icône</Label>
                                    <div className="space-y-2">
                                        <Input
                                            id="icone"
                                            value={data.icone}
                                            onChange={(e) => setData('icone', e.target.value)}
                                            placeholder="Icône (emoji)"
                                            maxLength={2}
                                            required
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {iconesPredefinies.map((icone) => (
                                                <button
                                                    key={icone}
                                                    type="button"
                                                    onClick={() => setData('icone', icone)}
                                                    className={`p-2 rounded border ${
                                                        data.icone === icone ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {icone}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {errors.icone && (
                                        <p className="text-sm text-red-600">{errors.icone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="couleur">Couleur</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                id="couleur"
                                                value={data.couleur}
                                                onChange={(e) => setData('couleur', e.target.value)}
                                                placeholder="#3B82F6"
                                                required
                                            />
                                            <div 
                                                className="w-8 h-8 rounded border"
                                                style={{ backgroundColor: data.couleur }}
                                            ></div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {couleursPredefinies.map((couleur) => (
                                                <button
                                                    key={couleur}
                                                    type="button"
                                                    onClick={() => setData('couleur', couleur)}
                                                    className={`w-6 h-6 rounded border ${
                                                        data.couleur === couleur ? 'ring-2 ring-blue-500' : ''
                                                    }`}
                                                    style={{ backgroundColor: couleur }}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                    {errors.couleur && (
                                        <p className="text-sm text-red-600">{errors.couleur}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/categories-services/${categorieService.id}`}>
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
