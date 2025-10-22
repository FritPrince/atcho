import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Building2, Handshake, Shield, Zap, ArrowRight, Star } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Atcho - Plateforme de Collaboration Créateurs-Ateliers" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                {/* Header */}
                <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">A</span>
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">Atcho</span>
                            </div>
                            <nav className="hidden md:flex items-center space-x-6">
                                <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    Fonctionnalités
                                </a>
                                <a href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    À propos
                                </a>
                                <a href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                                    Contact
                                </a>
                            </nav>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                                >
                                    Se connecter
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        S'inscrire
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto text-center">
                        <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Nouvelle plateforme
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            Connectez les{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                créateurs
                            </span>{' '}
                            aux{' '}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                ateliers
                            </span>
                            </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
                            Atcho est la plateforme qui révolutionne la collaboration entre créateurs et ateliers. 
                            Trouvez les partenaires parfaits, gérez vos projets et développez votre business ensemble.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                                    Commencer maintenant
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                Voir la démo
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-4 bg-white dark:bg-slate-900">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                Pourquoi choisir Atcho ?
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                Une plateforme complète pour tous vos besoins de collaboration créative
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle className="text-xl">Réseau de professionnels</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Connectez-vous avec des créateurs et ateliers vérifiés dans votre domaine d'activité.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                                        <Handshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle className="text-xl">Collaboration simplifiée</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Outils intégrés pour gérer vos projets, échanger des fichiers et suivre l'avancement.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                                        <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <CardTitle className="text-xl">Sécurité garantie</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Vos données et projets sont protégés avec les meilleures pratiques de sécurité.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                                        <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <CardTitle className="text-xl">Matching intelligent</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Notre algorithme vous propose les meilleurs partenaires selon vos besoins et compétences.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-pink-100 dark:bg-pink-900 flex items-center justify-center mb-4">
                                        <Building2 className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                                    </div>
                                    <CardTitle className="text-xl">Gestion d'entreprise</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Outils complets pour gérer votre business, vos équipes et vos partenaires.
                                    </CardDescription>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                                        <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <CardTitle className="text-xl">Qualité premium</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        Accès à des professionnels de haut niveau et des projets d'exception.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Prêt à transformer votre business ?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Rejoignez des milliers de créateurs et ateliers qui font confiance à Atcho pour développer leurs projets.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                                    Créer mon compte
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                                En savoir plus
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white py-12 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">A</span>
                                    </div>
                                    <span className="text-xl font-bold">Atcho</span>
                                </div>
                                <p className="text-slate-400">
                                    La plateforme qui connecte créateurs et ateliers pour des collaborations exceptionnelles.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Plateforme</h3>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Support</h3>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-4">Légal</h3>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
                            <p>&copy; 2024 Atcho. Tous droits réservés.</p>
                        </div>
                </div>
                </footer>
            </div>
        </>
    );
}