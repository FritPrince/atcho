import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Upload } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function DocumentCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        type: 'PDF',
        chemin: '',
        statut: 'BROUILLON',
        description: '',
        auteur_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/documents');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('nom', file.name);
            setData('chemin', file.name);
            // Déterminer le type basé sur l'extension
            const extension = file.name.split('.').pop()?.toUpperCase();
            if (extension) {
                setData('type', extension);
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Créer un Document" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/documents">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Document</h1>
                        <p className="text-muted-foreground">
                            Ajoutez un nouveau document
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            Informations du document
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau document
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="file">Fichier</Label>
                                <div className="flex items-center space-x-4">
                                    <Input
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="outline">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Parcourir
                                    </Button>
                                </div>
                                {errors.chemin && (
                                    <p className="text-sm text-red-600">{errors.chemin}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom du document</Label>
                                    <Input
                                        id="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        placeholder="Nom du document"
                                        required
                                    />
                                    {errors.nom && (
                                        <p className="text-sm text-red-600">{errors.nom}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Type de document</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PDF">PDF</SelectItem>
                                            <SelectItem value="DOC">DOC</SelectItem>
                                            <SelectItem value="DOCX">DOCX</SelectItem>
                                            <SelectItem value="TXT">TXT</SelectItem>
                                            <SelectItem value="IMAGE">IMAGE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="chemin">Chemin du fichier</Label>
                                    <Input
                                        id="chemin"
                                        value={data.chemin}
                                        onChange={(e) => setData('chemin', e.target.value)}
                                        placeholder="Chemin du fichier"
                                        required
                                    />
                                    {errors.chemin && (
                                        <p className="text-sm text-red-600">{errors.chemin}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BROUILLON">Brouillon</SelectItem>
                                            <SelectItem value="PUBLIE">Publié</SelectItem>
                                            <SelectItem value="ARCHIVE">Archivé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="auteur_id">Auteur</Label>
                                <Input
                                    id="auteur_id"
                                    type="number"
                                    value={data.auteur_id}
                                    onChange={(e) => setData('auteur_id', e.target.value)}
                                    placeholder="ID de l'auteur"
                                    required
                                />
                                {errors.auteur_id && (
                                    <p className="text-sm text-red-600">{errors.auteur_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description du document"
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/documents">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le document'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


