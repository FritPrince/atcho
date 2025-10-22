import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ConversationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        createur_id: '',
        atelier_id: '',
        sujet: '',
        est_archive: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/conversations');
    };

    return (
        <>
            <Head title="Créer une Conversation" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/conversations">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer une Conversation</h1>
                        <p className="text-muted-foreground">
                            Ajoutez une nouvelle conversation à la plateforme
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Informations de la conversation
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer une nouvelle conversation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="createur_id">Créateur</Label>
                                    <Input
                                        id="createur_id"
                                        type="number"
                                        value={data.createur_id}
                                        onChange={(e) => setData('createur_id', e.target.value)}
                                        placeholder="ID du créateur"
                                        required
                                    />
                                    {errors.createur_id && (
                                        <p className="text-sm text-red-600">{errors.createur_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="atelier_id">Atelier</Label>
                                    <Input
                                        id="atelier_id"
                                        type="number"
                                        value={data.atelier_id}
                                        onChange={(e) => setData('atelier_id', e.target.value)}
                                        placeholder="ID de l'atelier"
                                        required
                                    />
                                    {errors.atelier_id && (
                                        <p className="text-sm text-red-600">{errors.atelier_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sujet">Sujet</Label>
                                <Input
                                    id="sujet"
                                    value={data.sujet}
                                    onChange={(e) => setData('sujet', e.target.value)}
                                    placeholder="Sujet de la conversation"
                                    required
                                />
                                {errors.sujet && (
                                    <p className="text-sm text-red-600">{errors.sujet}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="est_archive"
                                    checked={data.est_archive}
                                    onCheckedChange={(checked) => setData('est_archive', checked as boolean)}
                                />
                                <Label htmlFor="est_archive">Archiver immédiatement</Label>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/conversations">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer la conversation'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
