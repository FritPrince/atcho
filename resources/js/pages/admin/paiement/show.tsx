import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, CreditCard, Euro, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Paiement {
    id: number;
    montant: number;
    methode: string;
    statut: string;
    reference: string;
    date_paiement: string;
    commande: {
        id: number;
        numero: string;
    };
    utilisateur: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    paiement: Paiement;
}

export default function PaiementShow({ paiement }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAYE': return 'bg-green-100 text-green-800';
            case 'EN_ATTENTE': return 'bg-yellow-100 text-yellow-800';
            case 'ECHEC': return 'bg-red-100 text-red-800';
            case 'REMBOURSE': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'CARTE': return 'bg-blue-100 text-blue-800';
            case 'VIREMENT': return 'bg-purple-100 text-purple-800';
            case 'PAYPAL': return 'bg-yellow-100 text-yellow-800';
            case 'ESPECES': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAYE': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'EN_ATTENTE': return <Clock className="h-5 w-5 text-yellow-600" />;
            case 'ECHEC': return <XCircle className="h-5 w-5 text-red-600" />;
            case 'REMBOURSE': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            default: return <Clock className="h-5 w-5 text-gray-600" />;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    return (
        <AdminLayout>
            <Head title={`Paiement #${paiement.id}`} />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/paiements">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Paiement #{paiement.id}</h1>
                            <p className="text-muted-foreground">Détails du paiement</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={`/admin/paiements/${paiement.id}/edit`}>
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
                                <CreditCard className="mr-2 h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-green-600 flex items-center">
                                    <Euro className="h-6 w-6 mr-2" />
                                    {formatCurrency(paiement.montant)}
                                </span>
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon(paiement.statut)}
                                    <Badge className={getStatusColor(paiement.statut)}>
                                        {paiement.statut}
                                    </Badge>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Méthode:</span>
                                <Badge className={getMethodColor(paiement.methode)}>
                                    {paiement.methode}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Référence:</span>
                                <span className="font-mono text-sm">{paiement.reference}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Client:</span>
                                <span>{paiement.utilisateur?.name || 'Non défini'}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Commande:</span>
                                <span>#{paiement.commande?.numero || 'Non définie'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Calendar className="mr-2 h-5 w-5" />
                                Dates importantes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {paiement.date_paiement && (
                                <div>
                                    <span className="font-medium">Date de paiement:</span>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(paiement.date_paiement).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <span className="font-medium">Créé le:</span>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(paiement.created_at).toLocaleDateString('fr-FR', {
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
                                    {new Date(paiement.updated_at).toLocaleDateString('fr-FR', {
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

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Résumé du paiement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {formatCurrency(paiement.montant)}
                                </div>
                                <div className="text-sm text-muted-foreground">Montant</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-lg font-semibold">
                                    {paiement.methode}
                                </div>
                                <div className="text-sm text-muted-foreground">Méthode</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-center space-x-2">
                                    {getStatusIcon(paiement.statut)}
                                    <span className="text-lg font-semibold">{paiement.statut}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">Statut</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
