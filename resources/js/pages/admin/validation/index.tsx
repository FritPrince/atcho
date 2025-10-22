import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, UserCheck, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface PendingUser {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
}

interface Props {
    pendingUsers: {
        data: PendingUser[];
        links: any[];
        meta: any;
    };
}

export default function ValidationIndex({ pendingUsers }: Props) {
    // Protection contre les données manquantes
    const users = pendingUsers?.data || [];
    
    return (
        <AdminLayout>
            <Head title="Validation des Comptes" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Validation des Comptes</h1>
                        <p className="text-muted-foreground">
                            Gérez les demandes de validation des comptes utilisateurs
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <Card key={user.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg flex items-center">
                                        <UserCheck className="mr-2 h-5 w-5" />
                                        {user.name}
                                    </CardTitle>
                                    <Badge variant="secondary">
                                        <Clock className="mr-1 h-3 w-3" />
                                        En attente
                                    </Badge>
                                </div>
                                <CardDescription>{user.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="font-medium">Rôle:</span> {user.role}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">Statut:</span> 
                                        {user.email_verified_at ? (
                                            <span className="text-green-600 ml-1">Vérifié</span>
                                        ) : (
                                            <span className="text-red-600 ml-1">Non vérifié</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Link href={`/admin/validation/${user.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" className="text-green-600">
                                        Approuver
                                    </Button>
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
