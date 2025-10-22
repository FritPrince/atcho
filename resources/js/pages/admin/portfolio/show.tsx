import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Image, Calendar, User } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Portfolio {
    id: number;
    titre: string;
    description: string;
    images: string[];
    createur: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    portfolio: Portfolio;
}

export default function PortfolioShow({ portfolio }: Props) {
    return (
        <AdminLayout>
            <Head title={`Portfolio - ${portfolio.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/portfolios">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{portfolio.titre}</h1>
                            <p className="text-muted-foreground">Détails du portfolio</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/portfolios/${portfolio.id}/edit`}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                            </Button>
                        </Link>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Image className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Titre:</span>
                                <p className="text-sm text-muted-foreground">{portfolio.titre}</p>
                            </div>
                            <div>
                                <span className="font-medium">Description:</span>
                                <p className="text-sm text-muted-foreground">{portfolio.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Images:</span>
                                <Badge variant="secondary">{portfolio.images.length} images</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Créateur
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Créateur:</span>
                                <span>{portfolio.createur.name}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {portfolio.images.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Image className="mr-2 h-5 w-5" />
                                Images du portfolio
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {portfolio.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Dates importantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-medium">Créé le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(portfolio.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium">Dernière modification:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(portfolio.updated_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
