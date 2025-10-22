import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, ShoppingCart, Euro } from 'lucide-react';

interface Order {
    id: number;
    montant_final: number;
    statut: string;
    createur: {
        id: number;
        name: string;
    };
    atelier: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    orders: {
        data: Order[];
        links: any[];
        meta: any;
    };
}

export default function OrderIndex({ orders }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
            case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
            case 'COMPLETED': return 'bg-green-600 text-white';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Gestion des Commandes" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h1>
                        <p className="text-muted-foreground">
                            Gérez toutes les commandes de la plateforme
                        </p>
                    </div>
                    <Link href="/admin/orders/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle Commande
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {orders.data.map((order) => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Commande #{order.id}
                                    </CardTitle>
                                    <Badge className={getStatusColor(order.statut)}>
                                        {order.statut}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Euro className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Montant:</span>
                                        <span>{order.montant_final}€</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Créateur:</span> {order.createur.name}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Atelier:</span> {order.atelier.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Créée le {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/orders/${order.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/orders/${order.id}/edit`}>
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
        </>
    );
}
