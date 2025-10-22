import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const countries = [
    { value: 'FR', label: 'France' },
    { value: 'BE', label: 'Belgique' },
    { value: 'CH', label: 'Suisse' },
    { value: 'CA', label: 'Canada' },
    { value: 'US', label: 'États-Unis' },
    { value: 'GB', label: 'Royaume-Uni' },
    { value: 'DE', label: 'Allemagne' },
    { value: 'IT', label: 'Italie' },
    { value: 'ES', label: 'Espagne' },
    { value: 'PT', label: 'Portugal' },
];

const regions = [
    { value: 'IDF', label: 'Île-de-France' },
    { value: 'ARA', label: 'Auvergne-Rhône-Alpes' },
    { value: 'HDF', label: 'Hauts-de-France' },
    { value: 'NAQ', label: 'Nouvelle-Aquitaine' },
    { value: 'OCC', label: 'Occitanie' },
    { value: 'GES', label: 'Grand Est' },
    { value: 'PDL', label: 'Pays de la Loire' },
    { value: 'NOR', label: 'Normandie' },
    { value: 'BRE', label: 'Bretagne' },
    { value: 'CVL', label: 'Centre-Val de Loire' },
    { value: 'BFC', label: 'Bourgogne-Franche-Comté' },
    { value: 'PAC', label: 'Provence-Alpes-Côte d\'Azur' },
    { value: 'COR', label: 'Corse' },
];

export default function Step3() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Head title="Inscription - Étape 3 - Atcho" />
            
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Votre adresse
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        Renseignez votre adresse pour faciliter les collaborations locales
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Étape 3 sur 5</span>
                        <span className="text-sm text-slate-500">60%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                </div>

                {/* Registration Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl text-center">Informations d'adresse</CardTitle>
                        <CardDescription className="text-center">
                            Ces informations nous aident à vous connecter avec des partenaires proches
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action="/register/step3"
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="adresse_ligne1" className="text-sm font-medium">
                                    Adresse ligne 1 *
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="adresse_ligne1"
                                        name="adresse[ligne1]"
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="123 rue de la Paix"
                                        className="pl-10 h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adresse_ligne2" className="text-sm font-medium">
                                    Adresse ligne 2
                                </Label>
                                <Input
                                    id="adresse_ligne2"
                                    name="adresse[ligne2]"
                                    type="text"
                                    placeholder="Appartement, étage, etc."
                                    className="h-11"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="adresse_code_postal" className="text-sm font-medium">
                                        Code postal *
                                    </Label>
                                    <Input
                                        id="adresse_code_postal"
                                        name="adresse[code_postal]"
                                        type="text"
                                        required
                                        placeholder="75001"
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="adresse_ville" className="text-sm font-medium">
                                        Ville *
                                    </Label>
                                    <Input
                                        id="adresse_ville"
                                        name="adresse[ville]"
                                        type="text"
                                        required
                                        placeholder="Paris"
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="adresse_region" className="text-sm font-medium">
                                        Région
                                    </Label>
                                    <Select name="adresse[region]">
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regions.map((region) => (
                                                <SelectItem key={region.value} value={region.value}>
                                                    {region.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adresse_pays" className="text-sm font-medium">
                                    Pays *
                                </Label>
                                <Select name="adresse[pays]" defaultValue="FR">
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Sélectionner un pays" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.value} value={country.value}>
                                                {country.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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


