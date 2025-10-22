import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Palette, Building2, Wrench } from 'lucide-react';

interface Step4Props {
    role: string;
}

const styles = [
    { value: 'LUXE', label: 'Luxe' },
    { value: 'STREETWEAR', label: 'Streetwear' },
    { value: 'ECO_RESPONSABLE', label: 'Éco-responsable' },
    { value: 'CLASSIQUE', label: 'Classique' },
    { value: 'MODERNE', label: 'Moderne' },
    { value: 'VINTAGE', label: 'Vintage' },
];

const experiences = [
    { value: 'DEBUTANT', label: 'Débutant' },
    { value: 'INTERMEDIAIRE', label: 'Intermédiaire' },
    { value: 'EXPERT', label: 'Expert' },
];

const secteurs = [
    { value: 'PRET_A_PORTER', label: 'Prêt-à-porter' },
    { value: 'ACCESSOIRES', label: 'Accessoires' },
    { value: 'MARIAGE', label: 'Mariage' },
    { value: 'HAUTE_COUTURE', label: 'Haute couture' },
    { value: 'SPORT', label: 'Sport' },
];

const typesEntreprise = [
    { value: 'INDIVIDUEL', label: 'Individuel' },
    { value: 'SARL', label: 'SARL' },
    { value: 'SA', label: 'SA' },
    { value: 'AUTO_ENTREPRENEUR', label: 'Auto-entrepreneur' },
];

export default function Step4({ role }: Step4Props) {
    const renderCreateurFields = () => (
        <>
            <div className="space-y-2">
                <Label htmlFor="nom_marque" className="text-sm font-medium">
                    Nom de votre marque *
                </Label>
                <Input
                    id="nom_marque"
                    name="nom_marque"
                    type="text"
                    required
                    autoFocus
                    placeholder="Ma Marque"
                    className="h-11"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="style" className="text-sm font-medium">
                        Style principal
                    </Label>
                    <Select name="style">
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Sélectionner un style" />
                        </SelectTrigger>
                        <SelectContent>
                            {styles.map((style) => (
                                <SelectItem key={style.value} value={style.value}>
                                    {style.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="secteur" className="text-sm font-medium">
                        Secteur d'activité
                    </Label>
                    <Select name="secteur">
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                            {secteurs.map((secteur) => (
                                <SelectItem key={secteur.value} value={secteur.value}>
                                    {secteur.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium">
                    Niveau d'expérience *
                </Label>
                <Select name="experience" required>
                    <SelectTrigger className="h-11">
                        <SelectValue placeholder="Sélectionner votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                        {experiences.map((exp) => (
                            <SelectItem key={exp.value} value={exp.value}>
                                {exp.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </>
    );

    const renderAtelierFields = () => (
        <>
            <div className="space-y-2">
                <Label htmlFor="nom_atelier" className="text-sm font-medium">
                    Nom de votre atelier *
                </Label>
                <Input
                    id="nom_atelier"
                    name="nom_atelier"
                    type="text"
                    required
                    autoFocus
                    placeholder="Atelier de Couture"
                    className="h-11"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description_entreprise" className="text-sm font-medium">
                    Description de votre entreprise
                </Label>
                <Textarea
                    id="description_entreprise"
                    name="description_entreprise"
                    placeholder="Décrivez votre atelier, vos spécialités, vos équipements..."
                    className="min-h-[100px] resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type_entreprise" className="text-sm font-medium">
                        Type d'entreprise *
                    </Label>
                    <Select name="type_entreprise" required>
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                            {typesEntreprise.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="numero_siret" className="text-sm font-medium">
                        Numéro SIRET
                    </Label>
                    <Input
                        id="numero_siret"
                        name="numero_siret"
                        type="text"
                        placeholder="12345678901234"
                        className="h-11"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="taille_equipe" className="text-sm font-medium">
                        Taille de l'équipe *
                    </Label>
                    <Input
                        id="taille_equipe"
                        name="taille_equipe"
                        type="number"
                        required
                        min="1"
                        placeholder="5"
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tarif_horaire_moyen" className="text-sm font-medium">
                        Tarif horaire moyen (€)
                    </Label>
                    <Input
                        id="tarif_horaire_moyen"
                        name="tarif_horaire_moyen"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="25.00"
                        className="h-11"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="delai_livraison_moyen_jours" className="text-sm font-medium">
                        Délai moyen (jours)
                    </Label>
                    <Input
                        id="delai_livraison_moyen_jours"
                        name="delai_livraison_moyen_jours"
                        type="number"
                        min="1"
                        placeholder="14"
                        className="h-11"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="capacite_production_mensuelle" className="text-sm font-medium">
                    Capacité de production mensuelle
                </Label>
                <Input
                    id="capacite_production_mensuelle"
                    name="capacite_production_mensuelle"
                    type="number"
                    min="1"
                    placeholder="100"
                    className="h-11"
                />
            </div>
        </>
    );

    const getRoleInfo = () => {
        switch (role) {
            case 'CREATEUR':
                return {
                    title: 'Votre profil créateur',
                    description: 'Parlez-nous de votre marque et de votre style',
                    icon: Palette,
                    color: 'blue'
                };
            case 'ATELIER':
                return {
                    title: 'Votre atelier',
                    description: 'Décrivez votre entreprise et vos capacités',
                    icon: Building2,
                    color: 'purple'
                };
            case 'PRESTATAIRE':
                return {
                    title: 'Vos services',
                    description: 'Présentez vos services et votre expertise',
                    icon: Wrench,
                    color: 'orange'
                };
            default:
                return {
                    title: 'Votre profil',
                    description: 'Complétez votre profil',
                    icon: Palette,
                    color: 'blue'
                };
        }
    };

    const roleInfo = getRoleInfo();
    const IconComponent = roleInfo.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <Head title="Inscription - Étape 4 - Atcho" />
            
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {roleInfo.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        {roleInfo.description}
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Étape 4 sur 5</span>
                        <span className="text-sm text-slate-500">80%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>

                {/* Registration Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center justify-center space-x-2">
                            <div className={`h-10 w-10 rounded-lg bg-${roleInfo.color}-100 dark:bg-${roleInfo.color}-900 flex items-center justify-center`}>
                                <IconComponent className={`h-5 w-5 text-${roleInfo.color}-600 dark:text-${roleInfo.color}-400`} />
                            </div>
                            <CardTitle className="text-2xl">{roleInfo.title}</CardTitle>
                        </div>
                        <CardDescription className="text-center">
                            Ces informations nous aident à vous proposer les meilleures collaborations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action="/register/step4"
                            className="space-y-4"
                        >
                            {role === 'CREATEUR' && renderCreateurFields()}
                            {role === 'ATELIER' && renderAtelierFields()}
                            {role === 'PRESTATAIRE' && (
                                <div className="text-center py-8">
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Les champs pour les prestataires seront bientôt disponibles.
                                    </p>
                                </div>
                            )}

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


