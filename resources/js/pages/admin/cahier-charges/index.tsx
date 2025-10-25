import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';

interface CahierCharges {
    id: number;
    titre: string;
    description: string;
    fichier: string | null;
    projet: {
        id: number;
        titre: string;
    };
    createur: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    cahiersCharges: {
        data: CahierCharges[];
        links: any[];
        meta: any;
    };
}

export default function CahierChargesIndex({ cahiersCharges }: Props) {
    return (
        <>
            <Head title="Gestion des Cahiers des Charges" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Cahiers des Charges</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les cahiers des charges des projets
                        </p>
                    </div>
                    <Link href="/admin/cahiers-charges/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Cahier
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cahiersCharges.data.map((cahier) => (
                        <Card key={cahier.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        {cahier.titre}
                                    </CardTitle>
                                    {cahier.fichier && (
                                        <Badge variant="secondary">Fichier</Badge>
                                    )}
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {cahier.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Projet:</span> {cahier.projet.titre}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Créateur:</span> {cahier.createur.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(cahier.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/cahiers-charges/${cahier.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/cahiers-charges/${cahier.id}/edit`}>
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
        </>
    );
}


