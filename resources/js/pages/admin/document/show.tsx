import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, FileText, Download, User, Calendar, HardDrive } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Document {
    id: number;
    nom: string;
    type: string;
    taille: number;
    chemin: string;
    statut: string;
    description: string;
    auteur: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    document: Document;
}

export default function DocumentShow({ document }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLIE': return 'bg-green-100 text-green-800';
            case 'BROUILLON': return 'bg-yellow-100 text-yellow-800';
            case 'ARCHIVE': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'PDF': return 'bg-red-100 text-red-800';
            case 'DOC': return 'bg-blue-100 text-blue-800';
            case 'DOCX': return 'bg-blue-100 text-blue-800';
            case 'IMAGE': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <AdminLayout>
            <Head title={`Document - ${document.nom}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/documents">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{document.nom}</h1>
                            <p className="text-muted-foreground">Détails du document</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                        </Button>
                        <Link href={`/admin/documents/${document.id}/edit`}>
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
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Type:</span>
                                <Badge className={getTypeColor(document.type)}>
                                    {document.type}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Statut:</span>
                                <Badge className={getStatusColor(document.statut)}>
                                    {document.statut}
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                                <HardDrive className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Taille:</span>
                                <span>{formatFileSize(document.taille)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Auteur:</span>
                                <span>{document.auteur?.name || 'Non défini'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                Chemin du fichier
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                                {document.chemin}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {document.description && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2 h-5 w-5" />
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{document.description}</p>
                        </CardContent>
                    </Card>
                )}

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
                                {new Date(document.created_at).toLocaleDateString('fr-FR', {
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
                                {new Date(document.updated_at).toLocaleDateString('fr-FR', {
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
