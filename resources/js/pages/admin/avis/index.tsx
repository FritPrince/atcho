import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Star, User, Calendar } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Avis {
    id: number;
    note: number;
    commentaire: string;
    statut: string;
    auteur: {
        id: number;
        name: string;
    };
    projet: {
        id: number;
        titre: string;
    };
    created_at: string;
}

interface Props {
    avis: {
        data: Avis[];
        links: any[];
        meta: any;
    };
}

export default function AvisIndex({ avis }: Props) {
    // Protection contre les données manquantes
    const avisList = avis?.data || [];
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLIE': return 'bg-green-100 text-green-800';
            case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
            case 'REJETE': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getNoteColor = (note: number) => {
        if (note >= 4) return 'text-green-600';
        if (note >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const renderStars = (note: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < note ? 'fill-current text-yellow-400' : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Avis" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Avis</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les avis de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/avis/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvel Avis
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {avisList.map((avis) => (
                        <Card key={avis.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <Star className="mr-2 h-5 w-5" />
                                        Avis #{avis.id}
                                    </CardTitle>
                                    <Badge className={getStatusColor(avis.statut)}>
                                        {avis.statut}
                                    </Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {avis.commentaire}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            {renderStars(avis.note)}
                                        </div>
                                        <span className={`font-bold ${getNoteColor(avis.note)}`}>
                                            {avis.note}/5
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Auteur:</span> {avis.auteur?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <span className="font-medium">Projet:</span> {avis.projet?.titre || 'Non défini'}
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        {new Date(avis.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/avis/${avis.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/avis/${avis.id}/edit`}>
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
