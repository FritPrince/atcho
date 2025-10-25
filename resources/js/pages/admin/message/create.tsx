import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function MessageCreate() {
    const { data, setData, post, processing, errors } = useForm({
        expediteur_id: '',
        destinataire_id: '',
        contenu: '',
        type: 'TEXTE',
        statut: 'ENVOYE',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/messages');
    };

    return (
        <AdminLayout>
            <Head title="Créer un Message" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/messages">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Message</h1>
                        <p className="text-muted-foreground">
                            Envoyez un nouveau message
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Informations du message
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau message
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="expediteur_id">Expéditeur</Label>
                                    <Input
                                        id="expediteur_id"
                                        type="number"
                                        value={data.expediteur_id}
                                        onChange={(e) => setData('expediteur_id', e.target.value)}
                                        placeholder="ID de l'expéditeur"
                                        required
                                    />
                                    {errors.expediteur_id && (
                                        <p className="text-sm text-red-600">{errors.expediteur_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="destinataire_id">Destinataire</Label>
                                    <Input
                                        id="destinataire_id"
                                        type="number"
                                        value={data.destinataire_id}
                                        onChange={(e) => setData('destinataire_id', e.target.value)}
                                        placeholder="ID du destinataire"
                                        required
                                    />
                                    {errors.destinataire_id && (
                                        <p className="text-sm text-red-600">{errors.destinataire_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type de message</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TEXTE">Texte</SelectItem>
                                            <SelectItem value="IMAGE">Image</SelectItem>
                                            <SelectItem value="FICHIER">Fichier</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ENVOYE">Envoyé</SelectItem>
                                            <SelectItem value="LU">Lu</SelectItem>
                                            <SelectItem value="ARCHIVE">Archivé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contenu">Contenu du message</Label>
                                <Textarea
                                    id="contenu"
                                    value={data.contenu}
                                    onChange={(e) => setData('contenu', e.target.value)}
                                    placeholder="Contenu du message"
                                    rows={6}
                                    required
                                />
                                {errors.contenu && (
                                    <p className="text-sm text-red-600">{errors.contenu}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/messages">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Envoi...' : 'Envoyer le message'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


