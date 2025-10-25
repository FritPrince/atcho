import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, MapPin, User, Calendar } from 'lucide-react';
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
    user: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    adresse: Adresse;
}

export default function AdresseShow({ adresse }: Props) {
    return (
        <AdminLayout>
            <Head title={`Adresse - ${adresse.ville}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/adresses">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{adresse.ville}</h1>
                            <p className="text-muted-foreground">Adresse</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/adresses/${adresse.id}/edit`}>
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
                                <MapPin className="mr-2 h-5 w-5" />
                                Informations de l'adresse
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Adresse complète:</span>
                                <p className="text-sm text-muted-foreground">
                                    {adresse.ligne1}
                                    {adresse.ligne2 && `, ${adresse.ligne2}`}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">Ville:</span>
                                    <p className="text-sm text-muted-foreground">{adresse.ville}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Code postal:</span>
                                    <p className="text-sm text-muted-foreground">{adresse.code_postal}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Pays:</span>
                                <Badge variant="secondary">{adresse.pays}</Badge>
                            </div>
                            {adresse.region && (
                                <div>
                                    <span className="font-medium">Région:</span>
                                    <p className="text-sm text-muted-foreground">{adresse.region}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Propriétaire
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Propriétaire:</span>
                                <span>{adresse.user.name}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {(adresse.latitude && adresse.longitude) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MapPin className="mr-2 h-5 w-5" />
                                Coordonnées GPS
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">Latitude:</span>
                                    <p className="text-sm text-muted-foreground">{adresse.latitude}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Longitude:</span>
                                    <p className="text-sm text-muted-foreground">{adresse.longitude}</p>
                                </div>
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
                            <span className="font-medium">Créée le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(adresse.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(adresse.updated_at).toLocaleDateString('fr-FR', {
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


