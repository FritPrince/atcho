import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, User, CheckCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface ProfilCreateur {
    id: number;
    nom_marque: string;
    style: string;
    experience: string;
    secteur: string;
    utilisateur?: {
        id: number;
        prenom: string;
        nom: string;
    };
    created_at: string;
}

interface Props {
    profilsCreateurs: {
        data: ProfilCreateur[];
        links: any[];
        meta: any;
    };
}

export default function ProfilCreateurIndex({ profilsCreateurs }: Props) {
    const getStyleColor = (style: string) => {
        switch (style) {
            case 'LUXE': return 'bg-purple-100 text-purple-800';
            case 'STREETWEAR': return 'bg-blue-100 text-blue-800';
            case 'ECO_RESPONSABLE': return 'bg-green-100 text-green-800';
            case 'CLASSIQUE': return 'bg-gray-100 text-gray-800';
            case 'MODERNE': return 'bg-pink-100 text-pink-800';
            case 'VINTAGE': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Profils Créateurs" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Profils Créateurs</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les profils créateurs de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/profils-createurs/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Profil
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {profilsCreateurs.data.map((profil) => (
                        <Card key={profil.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <User className="mr-2 h-5 w-5" />
                                        {profil.nom_marque}
                                    </CardTitle>
                                    <Badge className={getStyleColor(profil.style)}>
                                        {profil.style}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {profil.utilisateur ? `${profil.utilisateur.prenom} ${profil.utilisateur.nom}` : 'Utilisateur non défini'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Expérience:</span> {profil.experience}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Secteur:</span> {profil.secteur}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créé le {new Date(profil.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/profils-createurs/${profil.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/profils-createurs/${profil.id}/edit`}>
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
