import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function RendezVousCreate() {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        type: 'CONSULTATION',
        statut: 'EN_ATTENTE',
        lieu: '',
        adresse_id: '',
        createur_id: '',
        participant_id: '',
        projet_associe_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/rendez-vous');
    };

    return (
        <AdminLayout>
            <Head title="Créer un Rendez-vous" />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/rendez-vous">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Créer un Rendez-vous</h1>
                        <p className="text-muted-foreground">
                            Planifiez un nouveau rendez-vous
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2 h-5 w-5" />
                            Informations du rendez-vous
                        </CardTitle>
                        <CardDescription>
                            Remplissez les informations pour créer un nouveau rendez-vous
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="titre">Titre</Label>
                                    <Input
                                        id="titre"
                                        value={data.titre}
                                        onChange={(e) => setData('titre', e.target.value)}
                                        placeholder="Titre du rendez-vous"
                                        required
                                    />
                                    {errors.titre && (
                                        <p className="text-sm text-red-600">{errors.titre}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Type</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CONSULTATION">Consultation</SelectItem>
                                            <SelectItem value="REUNION">Réunion</SelectItem>
                                            <SelectItem value="PRESENTATION">Présentation</SelectItem>
                                            <SelectItem value="FORMATION">Formation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description du rendez-vous"
                                    rows={3}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="date_debut">Date et heure de début</Label>
                                    <Input
                                        id="date_debut"
                                        type="datetime-local"
                                        value={data.date_debut}
                                        onChange={(e) => setData('date_debut', e.target.value)}
                                        required
                                    />
                                    {errors.date_debut && (
                                        <p className="text-sm text-red-600">{errors.date_debut}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_fin">Date et heure de fin</Label>
                                    <Input
                                        id="date_fin"
                                        type="datetime-local"
                                        value={data.date_fin}
                                        onChange={(e) => setData('date_fin', e.target.value)}
                                        required
                                    />
                                    {errors.date_fin && (
                                        <p className="text-sm text-red-600">{errors.date_fin}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lieu">Lieu</Label>
                                    <Input
                                        id="lieu"
                                        value={data.lieu}
                                        onChange={(e) => setData('lieu', e.target.value)}
                                        placeholder="Lieu du rendez-vous"
                                    />
                                    {errors.lieu && (
                                        <p className="text-sm text-red-600">{errors.lieu}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut</Label>
                                    <Select value={data.statut} onValueChange={(value) => setData('statut', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un statut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                                            <SelectItem value="CONFIRME">Confirmé</SelectItem>
                                            <SelectItem value="ANNULE">Annulé</SelectItem>
                                            <SelectItem value="TERMINE">Terminé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.statut && (
                                        <p className="text-sm text-red-600">{errors.statut}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="createur_id">Organisateur</Label>
                                    <Input
                                        id="createur_id"
                                        type="number"
                                        value={data.createur_id}
                                        onChange={(e) => setData('createur_id', e.target.value)}
                                        placeholder="ID de l'organisateur"
                                        required
                                    />
                                    {errors.createur_id && (
                                        <p className="text-sm text-red-600">{errors.createur_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="participant_id">Participant</Label>
                                    <Input
                                        id="participant_id"
                                        type="number"
                                        value={data.participant_id}
                                        onChange={(e) => setData('participant_id', e.target.value)}
                                        placeholder="ID du participant"
                                        required
                                    />
                                    {errors.participant_id && (
                                        <p className="text-sm text-red-600">{errors.participant_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="adresse_id">Adresse</Label>
                                    <Input
                                        id="adresse_id"
                                        type="number"
                                        value={data.adresse_id}
                                        onChange={(e) => setData('adresse_id', e.target.value)}
                                        placeholder="ID de l'adresse"
                                    />
                                    {errors.adresse_id && (
                                        <p className="text-sm text-red-600">{errors.adresse_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="projet_associe_id">Projet associé</Label>
                                    <Input
                                        id="projet_associe_id"
                                        type="number"
                                        value={data.projet_associe_id}
                                        onChange={(e) => setData('projet_associe_id', e.target.value)}
                                        placeholder="ID du projet associé"
                                    />
                                    {errors.projet_associe_id && (
                                        <p className="text-sm text-red-600">{errors.projet_associe_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/rendez-vous">
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Création...' : 'Créer le rendez-vous'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
