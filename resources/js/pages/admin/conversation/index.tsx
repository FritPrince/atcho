import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, MessageSquare, Archive } from 'lucide-react';

interface Conversation {
    id: number;
    sujet: string;
    est_archive: boolean;
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
    conversations: {
        data: Conversation[];
        links: any[];
        meta: any;
    };
}

export default function ConversationIndex({ conversations }: Props) {
    return (
        <>
            <Head title="Gestion des Conversations" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Conversations</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les conversations de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/conversations/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Conversation
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {conversations.data.map((conversation) => (
                        <Card key={conversation.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <MessageSquare className="mr-2 h-5 w-5" />
                                        {conversation.sujet}
                                    </CardTitle>
                                    <div className="flex space-x-2">
                                        {conversation.est_archive && (
                                            <Badge variant="secondary">
                                                <Archive className="mr-1 h-3 w-3" />
                                                Archivée
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Créateur:</span> {conversation.createur.name}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Atelier:</span> {conversation.atelier.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créée le {new Date(conversation.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/conversations/${conversation.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/conversations/${conversation.id}/edit`}>
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


