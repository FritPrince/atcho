import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, MapPin, User } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Adresse {
    id: number;
    ligne1: string;
    ligne2?: string;
    ville: string;
    code_postal: string;
    pays: string;
    region?: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    adresses: {
        data: Adresse[];
        links: any[];
        meta: any;
    };
}

export default function AdresseIndex({ adresses }: Props) {
    // Protection contre les données manquantes
    const addresses = adresses?.data || [];
    
    return (
        <AdminLayout>
            <Head title="Gestion des Adresses" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Adresses</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les adresses de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/adresses/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Adresse
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {addresses.map((adresse) => (
                        <Card key={adresse.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <MapPin className="mr-2 h-5 w-5" />
                                        {adresse.ville}
                                    </CardTitle>
                                    <Badge variant="secondary">
                                        {adresse.pays}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {adresse.ligne1}
                                    {adresse.ligne2 && `, ${adresse.ligne2}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Code postal:</span> {adresse.code_postal}
                                    </div>
                                    {adresse.region && (
                                        <div className="text-sm">
                                            <span className="font-medium">Région:</span> {adresse.region}
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Propriétaire:</span> {adresse.user?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créée le {new Date(adresse.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/adresses/${adresse.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/adresses/${adresse.id}/edit`}>
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
