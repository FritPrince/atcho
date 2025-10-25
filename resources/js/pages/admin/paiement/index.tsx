import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, CreditCard, Euro, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
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
}

interface Props {
    paiements: {
        data: Paiement[];
        links: any[];
        meta: any;
    };
}

export default function PaiementIndex({ paiements }: Props) {
    // Protection contre les données manquantes
    const paiementsList = paiements?.data || [];
    
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
            case 'PAYE': return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'EN_ATTENTE': return <Clock className="h-4 w-4 text-yellow-600" />;
            case 'ECHEC': return <XCircle className="h-4 w-4 text-red-600" />;
            case 'REMBOURSE': return <CheckCircle className="h-4 w-4 text-blue-600" />;
            default: return <Clock className="h-4 w-4 text-gray-600" />;
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
            <Head title="Gestion des Paiements" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Paiements</h1>
                        <p className="text-muted-foreground">
                            Gérez tous les paiements de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/paiements/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouveau Paiement
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {paiementsList.map((paiement) => (
                        <Card key={paiement.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <CreditCard className="mr-2 h-5 w-5" />
                                        Paiement #{paiement.id}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(paiement.statut)}
                                        <Badge className={getStatusColor(paiement.statut)}>
                                            {paiement.statut}
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription>
                                    Référence: {paiement.reference}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-green-600 flex items-center">
                                            <Euro className="h-5 w-5 mr-1" />
                                            {formatCurrency(paiement.montant)}
                                        </span>
                                        <Badge className={getMethodColor(paiement.methode)}>
                                            {paiement.methode}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            <span className="font-medium">Client:</span> {paiement.utilisateur?.name || 'Non défini'}
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm">
                                        <span className="font-medium">Commande:</span> #{paiement.commande?.numero || 'Non définie'}
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground">
                                        <Calendar className="inline h-3 w-3 mr-1" />
                                        {new Date(paiement.date_paiement || paiement.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/paiements/${paiement.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/paiements/${paiement.id}/edit`}>
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


