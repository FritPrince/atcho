import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FileText, Euro } from 'lucide-react';

interface Devis {
    id: number;
    montant: number;
    statut: string;
    createur: {
        id: number;
        name: string;
    };
    atelier: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    devis: {
        data: Devis[];
        links: any[];
        meta: any;
    };
}

export default function DevisIndex({ devis }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'ACCEPTED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Gestion des Devis" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Devis</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les devis de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/devis/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Devis
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {devis.data.map((devi) => (
                        <Card key={devi.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Devis #{devi.id}
                                    </CardTitle>
                                    <Badge className={getStatusColor(devi.statut)}>
                                        {devi.statut}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Euro className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Montant:</span>
                                        <span>{devi.montant}€</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Créateur:</span> {devi.createur.name}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Atelier:</span> {devi.atelier.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(devi.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/devis/${devi.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/devis/${devi.id}/edit`}>
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
