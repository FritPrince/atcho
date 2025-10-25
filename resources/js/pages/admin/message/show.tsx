import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, MessageSquare, User, Calendar } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Message {
    id: number;
    contenu: string;
    type: string;
    statut: string;
    expediteur: {
        id: number;
        name: string;
    };
    destinataire: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    message: Message;
}

export default function MessageShow({ message }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ENVOYE': return 'bg-blue-100 text-blue-800';
            case 'LU': return 'bg-green-100 text-green-800';
            case 'ARCHIVE': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'TEXTE': return 'bg-blue-100 text-blue-800';
            case 'IMAGE': return 'bg-purple-100 text-purple-800';
            case 'FICHIER': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Message #${message.id}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/messages">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Message #{message.id}</h1>
                            <p className="text-muted-foreground">Détails du message</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/messages/${message.id}/edit`}>
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
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Type:</span>
                                <Badge className={getTypeColor(message.type)}>
                                    {message.type}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatusColor(message.statut)}>
                                    {message.statut}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Expéditeur:</span>
                                <span>{message.expediteur?.name || 'Non défini'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Destinataire:</span>
                                <span>{message.destinataire?.name || 'Non défini'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MessageSquare className="mr-2 h-5 w-5" />
                                Contenu du message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{message.contenu}</p>
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
                            <span className="font-medium">Envoyé le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(message.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(message.updated_at).toLocaleDateString('fr-FR', {
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


