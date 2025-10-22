import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, User, FolderOpen } from 'lucide-react';

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
    updated_at: string;
}

interface Props {
    cahierCharges: CahierCharges;
}

export default function CahierChargesShow({ cahierCharges }: Props) {
    return (
        <>
            <Head title={`Cahier des Charges - ${cahierCharges.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/cahiers-charges">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{cahierCharges.titre}</h1>
                            <p className="text-muted-foreground">Détails du cahier des charges</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/cahiers-charges/${cahierCharges.id}/edit`}>
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
                                <FileText className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Titre:</span>
                                <p className="text-sm text-muted-foreground">{cahierCharges.titre}</p>
                            </div>
                            <div>
                                <span className="font-medium">Description:</span>
                                <p className="text-sm text-muted-foreground">{cahierCharges.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Fichier:</span>
                                {cahierCharges.fichier ? (
                                    <Badge variant="default" className="bg-green-600">
                                        Disponible
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        Aucun fichier
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FolderOpen className="mr-2 h-5 w-5" />
                                Projet associé
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Projet:</span>
                                <span>{cahierCharges.projet.titre}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Créateur:</span>
                                <span>{cahierCharges.createur.name}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

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
                                {new Date(cahierCharges.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(cahierCharges.updated_at).toLocaleDateString('fr-FR', {
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
        </>
    );
}
