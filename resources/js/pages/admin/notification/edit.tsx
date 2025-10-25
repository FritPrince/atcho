import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

interface Notification {
    id: number;
    titre: string;
    message: string;
    type: string;
    est_lue: boolean;
    date_envoi: string;
    user_id: number;
}

interface Props {
    notification: Notification;
}

export default function NotificationEdit({ notification }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        titre: notification.titre,
        message: notification.message,
        type: notification.type,
        est_lue: notification.est_lue,
        date_envoi: notification.date_envoi ? new Date(notification.date_envoi).toISOString().slice(0, 16) : '',
        user_id: notification.user_id.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/notifications/${notification.id}`);
    };

    const typesNotification = [
        { value: 'info', label: 'Information', description: 'Notification d\'information générale' },
        { value: 'success', label: 'Succès', description: 'Notification de succès' },
        { value: 'warning', label: 'Avertissement', description: 'Notification d\'avertissement' },
        { value: 'error', label: 'Erreur', description: 'Notification d\'erreur' }
    ];

    return (
        <AdminLayout>
            <Head title={`Modifier - ${notification.titre}`} />
            
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href={`/admin/notifications/${notification.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Modifier la notification</h1>
                        <p className="text-muted-foreground">
                            Modifiez les informations de la notification "{notification.titre}"
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Bell className="mr-2 h-5 w-5" />
                            Informations de la notification
                        </CardTitle>
                        <CardDescription>
                            Modifiez les informations de la notification
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="titre">Titre de la notification</Label>
                                <Input
                                    id="titre"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    placeholder="Titre de la notification"
                                    required
                                />
                                {errors.titre && (
                                    <p className="text-sm text-red-600">{errors.titre}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Contenu de la notification"
                                    rows={4}
                                    required
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-600">{errors.message}</p>
                                )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Type de notification</Label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        {typesNotification.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label} - {type.description}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="user_id">ID du destinataire</Label>
                                    <Input
                                        id="user_id"
                                        type="number"
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        placeholder="ID de l'utilisateur"
                                        required
                                    />
                                    {errors.user_id && (
                                        <p className="text-sm text-red-600">{errors.user_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_envoi">Date d'envoi (optionnel)</Label>
                                <Input
                                    id="date_envoi"
                                    type="datetime-local"
                                    value={data.date_envoi}
                                    onChange={(e) => setData('date_envoi', e.target.value)}
                                />
                                {errors.date_envoi && (
                                    <p className="text-sm text-red-600">{errors.date_envoi}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="est_lue"
                                    checked={data.est_lue}
                                    onChange={(e) => setData('est_lue', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="est_lue">Notification lue</Label>
                            </div>
                            {errors.est_lue && (
                                <p className="text-sm text-red-600">{errors.est_lue}</p>
                            )}

                            <div className="flex justify-end space-x-4">
                                <Link href={`/admin/notifications/${notification.id}`}>
                                    <Button variant="outline" type="button">
                                        Annuler
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Mise à jour...' : 'Mettre à jour'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


