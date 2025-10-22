import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Users, Building2, Wrench, CheckCircle } from 'lucide-react';

export default function Step2() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Head title="Inscription - Étape 2 - Atcho" />
            
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Choisissez votre profil
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Sélectionnez le type de compte qui correspond le mieux à votre activité
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Étape 2 sur 5</span>
                        <span className="text-sm text-slate-500">40%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                </div>

                {/* Registration Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Type de compte</CardTitle>
                        <CardDescription className="text-center">
                            Cette information nous aide à personnaliser votre expérience
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action="/register/step2"
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <Label className="text-base font-medium">Je suis un(e) :</Label>
                                <RadioGroup name="role" defaultValue="CREATEUR" className="space-y-4">
                                    {/* Créateur */}
                                    <div className="relative">
                                        <RadioGroupItem value="CREATEUR" id="CREATEUR" className="sr-only" />
                                        <Label
                                            htmlFor="CREATEUR"
                                            className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-4 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"
                                        >
                                            <div className="flex w-full items-center space-x-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                                            </div>
                                        </Label>
                                    </div>

                                    {/* Atelier */}
                                    <div className="relative">
                                        <RadioGroupItem value="ATELIER" id="ATELIER" className="sr-only" />
                                        <Label
                                            htmlFor="ATELIER"
                                            className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-4 hover:border-purple-300 dark:border-slate-700 dark:hover:border-purple-600"
                                        >
                                            <div className="flex w-full items-center space-x-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                                    <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
                                            </div>
                                        </Label>
                                    </div>

                                    {/* Prestataire */}
                                    <div className="relative">
                                        <RadioGroupItem value="PRESTATAIRE" id="PRESTATAIRE" className="sr-only" />
                                        <Label
                                            htmlFor="PRESTATAIRE"
                                            className="flex cursor-pointer rounded-lg border-2 border-slate-200 p-4 hover:border-orange-300 dark:border-slate-700 dark:hover:border-orange-600"
                                        >
                                            <div className="flex w-full items-center space-x-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                                                    <Wrench className="h-5 w-5 text-orange-600 dark:text-orange-400" />
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
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-sm font-medium">
                                    Présentez-vous (optionnel)
                                </Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Parlez-nous de votre parcours, vos spécialités, vos ambitions..."
                                    className="min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-11"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Retour
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    Continuer
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </Form>

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


