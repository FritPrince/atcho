import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Image } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Portfolio {
    id: number;
    nom: string;
    description: string;
    galerie_images: string[];
    atelier: {
        id: number;
        nom_atelier: string;
    };
    created_at: string;
}

interface Props {
    portfolios: {
        data: Portfolio[];
        links: any[];
        meta: any;
    };
}

export default function PortfolioIndex({ portfolios }: Props) {
    return (
        <AdminLayout>
            <Head title="Gestion des Portfolios" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Portfolios</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les portfolios de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/portfolios/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Portfolio
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {portfolios.data.map((portfolio) => (
                        <Card key={portfolio.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Image className="mr-2 h-5 w-5" />
                                        {portfolio.nom}
                                    </CardTitle>
                                    {portfolio.galerie_images && portfolio.galerie_images.length > 0 && (
                                        <Badge variant="secondary">{portfolio.galerie_images.length} images</Badge>
                                    )}
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {portfolio.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Atelier:</span> {portfolio.atelier ? portfolio.atelier.nom_atelier : 'Non défini'}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(portfolio.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/portfolios/${portfolio.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/portfolios/${portfolio.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
