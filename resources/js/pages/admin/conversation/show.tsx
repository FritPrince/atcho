import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, MessageSquare, Calendar, User, Archive } from 'lucide-react';

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
    updated_at: string;
}

interface Props {
    conversation: Conversation;
}

export default function ConversationShow({ conversation }: Props) {
    return (
        <>
            <Head title={`Conversation - ${conversation.sujet}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/conversations">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{conversation.sujet}</h1>
                            <p className="text-muted-foreground">Détails de la conversation</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/conversations/${conversation.id}/edit`}>
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
                            <div>
                                <span className="font-medium">Sujet:</span>
                                <p className="text-sm text-muted-foreground">{conversation.sujet}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                {conversation.est_archive ? (
                                    <Badge variant="secondary">
                                        <Archive className="mr-1 h-3 w-3" />
                                        Archivée
                                    </Badge>
                                ) : (
                                    <Badge variant="default">Active</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2 h-5 w-5" />
                                Participants
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Créateur:</span>
                                <span>{conversation.createur.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Atelier:</span>
                                <span>{conversation.atelier.name}</span>
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
                            <span className="font-medium">Créée le:</span>
                            <p className="text-sm text-muted-foreground">
                                {new Date(conversation.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(conversation.updated_at).toLocaleDateString('fr-FR', {
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


