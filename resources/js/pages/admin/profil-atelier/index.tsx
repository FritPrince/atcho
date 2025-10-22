import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Building2, CheckCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface ProfilAtelier {
    id: number;
    nom_atelier: string;
    description_entreprise: string;
    type_entreprise: string;
    annee_creation: number;
    utilisateur?: {
        id: number;
        prenom: string;
        nom: string;
    };
    created_at: string;
}

interface Props {
    profilsAteliers: {
        data: ProfilAtelier[];
        links: any[];
        meta: any;
    };
}

export default function ProfilAtelierIndex({ profilsAteliers }: Props) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'INDIVIDUEL': return 'bg-blue-100 text-blue-800';
            case 'ENTREPRISE': return 'bg-green-100 text-green-800';
            case 'COOPERATIVE': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Profils Ateliers" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Profils Ateliers</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les profils ateliers de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/profils-ateliers/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Profil
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {profilsAteliers.data.map((profil) => (
                        <Card key={profil.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Building2 className="mr-2 h-5 w-5" />
                                        {profil.nom_atelier}
                                    </CardTitle>
                                    <Badge className={getTypeColor(profil.type_entreprise)}>
                                        {profil.type_entreprise}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {profil.description_entreprise}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Propriétaire:</span> {profil.utilisateur ? `${profil.utilisateur.prenom} ${profil.utilisateur.nom}` : 'Non défini'}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Année:</span> {profil.annee_creation}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(profil.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/profils-ateliers/${profil.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/profils-ateliers/${profil.id}/edit`}>
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
