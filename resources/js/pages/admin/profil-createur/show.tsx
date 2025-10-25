import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, User, Calendar, CheckCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface ProfilCreateur {
    id: number;
    biographie: string;
    specialites: string;
    statut: string;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    profilCreateur: ProfilCreateur;
}

export default function ProfilCreateurShow({ profilCreateur }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Profil Créateur - ${profilCreateur.user.name}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/profils-createurs">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{profilCreateur.user.name}</h1>
                            <p className="text-muted-foreground">Profil créateur</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/profils-createurs/${profilCreateur.id}/edit`}>
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
                                <User className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="font-medium">Utilisateur:</span>
                                <p className="text-sm text-muted-foreground">{profilCreateur.user.name}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatusColor(profilCreateur.statut)}>
                                    {profilCreateur.statut}
                                </Badge>
                            </div>
                            <div>
                                <span className="font-medium">Spécialités:</span>
                                <p className="text-sm text-muted-foreground">{profilCreateur.specialites}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Biographie
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{profilCreateur.biographie}</p>
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
                                {new Date(profilCreateur.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(profilCreateur.updated_at).toLocaleDateString('fr-FR', {
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


