import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, MessageSquare, User, Calendar } from 'lucide-react';
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
}

interface Props {
    messages: {
        data: Message[];
        links: any[];
        meta: any;
    };
}

export default function MessageIndex({ messages }: Props) {
    // Protection contre les données manquantes
    const messagesList = messages?.data || [];
    
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
            <Head title="Gestion des Messages" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Messages</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les messages de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/messages/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Message
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {messagesList.map((message) => (
                        <Card key={message.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <MessageSquare className="mr-2 h-5 w-5" />
                                        Message #{message.id}
                                    </CardTitle>
                                    <div className="flex space-x-2">
                                        <Badge className={getTypeColor(message.type)}>
                                            {message.type}
                                        </Badge>
                                        <Badge className={getStatusColor(message.statut)}>
                                            {message.statut}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {message.contenu}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">De:</span> {message.expediteur?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">À:</span> {message.destinataire?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        {new Date(message.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/messages/${message.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/messages/${message.id}/edit`}>
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
