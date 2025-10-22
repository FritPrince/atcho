import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Users, Building2, Wrench, CheckCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Head title="Inscription - Atcho" />
            
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Rejoignez Atcho
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Choisissez votre type de compte pour commencer votre inscription
                    </p>
                            </div>

                {/* Registration Options Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Choisissez votre profil</CardTitle>
                        <CardDescription className="text-center">
                            Sélectionnez le type de compte qui correspond le mieux à votre activité
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Créateur */}
                            <Link href="/register/step1">
                                <div className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all dark:border-slate-700 dark:hover:border-blue-600">
                                    <div className="flex w-full items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg font-semibold">Créateur/Créatrice</span>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Designer, styliste, créateur de mode, artiste... Vous créez des produits et cherchez des ateliers pour les réaliser.
                                            </p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-slate-400" />
                                    </div>
                                </div>
                            </Link>

                            {/* Atelier */}
                            <Link href="/register/step1">
                                <div className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-md transition-all dark:border-slate-700 dark:hover:border-purple-600">
                                    <div className="flex w-full items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                            <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg font-semibold">Atelier/Manufacturier</span>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Atelier de couture, usine, fabricant... Vous produisez des vêtements et cherchez des créateurs pour collaborer.
                                            </p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-slate-400" />
                                    </div>
                            </div>
                            </Link>

                            {/* Prestataire */}
                            <Link href="/register/step1">
                                <div className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-6 hover:border-orange-300 hover:shadow-md transition-all dark:border-slate-700 dark:hover:border-orange-600">
                                    <div className="flex w-full items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                                            <Wrench className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg font-semibold">Prestataire de services</span>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Photographe, mannequin, consultant... Vous offrez des services complémentaires à la mode.
                                            </p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-slate-400" />
                                    </div>
                                </div>
                            </Link>
                            </div>

                        <div className="mt-6">
                            <Separator className="my-4" />
                            <div className="text-center text-sm text-slate-600 dark:text-slate-300">
                                Déjà un compte ?{' '}
                                <a 
                                    href="/login" 
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Se connecter
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <a 
                        href="/" 
                        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </a>
                </div>
            </div>
                        </div>
    );
}
