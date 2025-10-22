import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Mail, Bell, Smartphone } from 'lucide-react';

export default function Step5() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Head title="Inscription - Étape 5 - Atcho" />
            
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Dernière étape !
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Configurez vos préférences et acceptez nos conditions
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Étape 5 sur 5</span>
                        <span className="text-sm text-slate-500">100%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>

                {/* Registration Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Préférences et conditions</CardTitle>
                        <CardDescription className="text-center">
                            Personnalisez votre expérience et acceptez nos conditions d'utilisation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action="/register/step5"
                            className="space-y-6"
                        >
                            {/* Notifications */}
                            <div className="space-y-4">
                                <Label className="text-base font-medium">Préférences de notifications</Label>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <Checkbox 
                                            id="email_notifications" 
                                            name="preferences_notifications[email]" 
                                            defaultChecked 
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-slate-500" />
                                            <Label htmlFor="email_notifications" className="text-sm">
                                                Recevoir des notifications par email
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox 
                                            id="sms_notifications" 
                                            name="preferences_notifications[sms]" 
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Smartphone className="h-4 w-4 text-slate-500" />
                                            <Label htmlFor="sms_notifications" className="text-sm">
                                                Recevoir des notifications par SMS
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox 
                                            id="push_notifications" 
                                            name="preferences_notifications[push]" 
                                            defaultChecked 
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Bell className="h-4 w-4 text-slate-500" />
                                            <Label htmlFor="push_notifications" className="text-sm">
                                                Recevoir des notifications push
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Terms and conditions */}
                            <div className="space-y-4">
                                <Label className="text-base font-medium">Conditions d'utilisation</Label>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox 
                                            id="accept_terms" 
                                            name="accept_terms" 
                                            required 
                                        />
                                        <div className="space-y-1">
                                            <Label htmlFor="accept_terms" className="text-sm font-medium">
                                                J'accepte les conditions d'utilisation *
                                            </Label>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                En cochant cette case, vous acceptez nos{' '}
                                                <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                                                    conditions d'utilisation
                                                </a>
                                                {' '}et reconnaissez avoir lu notre{' '}
                                                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                                                    politique de confidentialité
                                                </a>.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Checkbox 
                                            id="accept_privacy" 
                                            name="accept_privacy" 
                                            required 
                                        />
                                        <div className="space-y-1">
                                            <Label htmlFor="accept_privacy" className="text-sm font-medium">
                                                J'accepte la politique de confidentialité *
                                            </Label>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                Vous acceptez que nous traitions vos données personnelles conformément à notre politique de confidentialité.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
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
                                    className="flex-1 h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Créer mon compte
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


