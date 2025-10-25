import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FileText, Download, User, Calendar } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Document {
    id: number;
    nom: string;
    type: string;
    taille: number;
    chemin: string;
    statut: string;
    auteur: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    documents: {
        data: Document[];
        links: any[];
        meta: any;
    };
}

export default function DocumentIndex({ documents }: Props) {
    // Protection contre les données manquantes
    const documentsList = documents?.data || [];
    
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
            <Head title="Gestion des Documents" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Documents</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les documents de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/documents/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Document
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documentsList.map((document) => (
                        <Card key={document.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        {document.nom}
                                    </CardTitle>
                                    <div className="flex space-x-2">
                                        <Badge className={getTypeColor(document.type)}>
                                            {document.type}
                                        </Badge>
                                        <Badge className={getStatusColor(document.statut)}>
                                            {document.statut}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription>
                                    Taille: {formatFileSize(document.taille)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Auteur:</span> {document.auteur?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <span className="font-medium">Chemin:</span> 
                                        <span className="text-muted-foreground ml-1 font-mono text-xs">
                                            {document.chemin}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        {new Date(document.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Link href={`/admin/documents/${document.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/documents/${document.id}/edit`}>
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


