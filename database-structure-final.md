# 📊 STRUCTURE FINALE DE LA BASE DE DONNÉES - ATCHO

## ✅ **CORRECTIONS APPLIQUÉES**

### 🔧 **Problèmes résolus :**
- ✅ Conflits entre migrations et modèles corrigés
- ✅ Attributs inventés harmonisés avec les migrations
- ✅ Champs d'images essentiels pour la mode conservés
- ✅ Doublons évités
- ✅ Structure cohérente entre migrations et modèles

---

## 📋 **STRUCTURE FINALE DES TABLES**

### 👤 **USERS**
```sql
- id (primary key)
- prenom (string)
- nom (string) 
- email (string, unique)
- telephone (string, nullable)
- photo_profil (string, nullable)
- photo_couverture (string, nullable)
- galerie_images (json, nullable)
- bio (text, nullable)
- adresse_id (foreign key, nullable)
- role (enum: CREATEUR, ATELIER, PRESTATAIRE, ADMIN)
- est_verifie (boolean, default: false)
- est_actif (boolean, default: true)
- preferences_notifications (json, nullable)
- date_inscription (timestamp, nullable)
- timestamps
```

### 🎨 **PROFIL_CREATEURS**
```sql
- id (primary key)
- utilisateur_id (foreign key → users)
- nom_marque (string)
- photo_profil (string, nullable)
- photo_couverture (string, nullable)
- galerie_images (json, nullable)
- logo_marque (string, nullable)
- style (enum: LUXE, STREETWEAR, ECO_RESPONSABLE, CLASSIQUE, MODERNE, VINTAGE)
- site_web (string, nullable)
- instagram (string, nullable)
- experience (enum: DEBUTANT, INTERMEDIAIRE, EXPERT)
- secteur (enum: PRET_A_PORTER, ACCESSOIRES, MARIAGE, HAUTE_COUTURE, SPORT)
- timestamps
```

### 🏭 **PROFIL_ATELIERS**
```sql
- id (primary key)
- utilisateur_id (foreign key → users)
- nom_atelier (string)
- photo_profil (string, nullable)
- photo_couverture (string, nullable)
- galerie_images (json, nullable)
- logo_atelier (string, nullable)
- images_equipements (json, nullable)
- description_entreprise (text, nullable)
- description (text, nullable)
- specialites (json, nullable)
- equipements (json, nullable)
- capacite_production (integer, nullable)
- capacite_production_mensuelle (integer, nullable)
- delai_moyen_jours (integer, nullable)
- delai_livraison_moyen_jours (integer, nullable)
- tarif_horaire (decimal, nullable)
- tarif_horaire_moyen (decimal, nullable)
- est_certifie (boolean, default: false)
- certifications (json, nullable)
- annee_creation (integer, nullable)
- type_entreprise (enum: INDIVIDUEL, SARL, SA, AUTO_ENTREPRENEUR)
- numero_siret (string, nullable)
- taille_equipe (integer, default: 1)
- note_moyenne (decimal, default: 0)
- nombre_projets_realises (integer, default: 0)
- accepte_urgences (boolean, default: false)
- rayon_intervention_km (integer, default: 50)
- timestamps
```

### 🎯 **PROJETS**
```sql
- id (primary key)
- titre (string)
- description (text)
- image_principale (string, nullable)
- galerie_images (json, nullable)
- image_couverture (string, nullable)
- images_avant_apres (json, nullable)
- cahier_des_charges_id (foreign key → cahier_des_charges, nullable)
- date_creation (timestamp, nullable)
- date_limite (timestamp, nullable)
- date_debut_souhaitee (timestamp, nullable)
- budget_estime (decimal, nullable)
- quantite (integer, default: 1)
- complexite (enum: SIMPLE, MOYEN, COMPLEXE)
- confidentialite (enum: PUBLIC, PRIVE, CONFIDENTIEL)
- statut (enum: BROUILLON, PUBLIE, EN_NEGOCIATION, EN_COURS, TERMINE, ANNULE)
- createur_id (foreign key → users)
- timestamps
```

### 📄 **DEVIS**
```sql
- id (primary key)
- reference (string, unique)
- description (text)
- image_devis (string, nullable)
- images_produits (json, nullable)
- images_maquettes (json, nullable)
- images_materiaux (json, nullable)
- montant (decimal)
- delai_jours (integer)
- date_creation (timestamp, nullable)
- date_expiration (timestamp, nullable)
- conditions_paiement (text, nullable)
- garantie (text, nullable)
- statut (enum: EN_ATTENTE, ACCEPTE, REFUSE, EXPIRE)
- projet_id (foreign key → projets)
- atelier_id (foreign key → profil_ateliers)
- timestamps
```

### 🛒 **COMMANDES**
```sql
- id (primary key)
- reference (string, unique)
- montant_final (decimal)
- image_commande (string, nullable)
- images_produits (json, nullable)
- images_avant_apres (json, nullable)
- images_livraison (json, nullable)
- date_creation (timestamp, nullable)
- date_livraison_prevue (timestamp, nullable)
- date_livraison_reelle (timestamp, nullable)
- conditions_livraison (text, nullable)
- statut (enum: EN_PREPARATION, EN_COUPAGE, EN_ASSEMBLAGE, TERMINEE, LIVREE)
- projet_id (foreign key → projets)
- atelier_id (foreign key → profil_ateliers)
- timestamps
```

---

## 🎨 **CHAMPS D'IMAGES ESSENTIELS POUR LA MODE**

### ✅ **Conservés et harmonisés :**
- **Photos de profil** : `photo_profil` (users, profil_createurs, profil_ateliers)
- **Photos de couverture** : `photo_couverture` (users, profil_createurs, profil_ateliers)
- **Galeries d'images** : `galerie_images` (json) pour tous les profils
- **Logos** : `logo_marque`, `logo_atelier`
- **Images de projets** : `image_principale`, `galerie_images`, `images_avant_apres`
- **Images de devis** : `image_devis`, `images_produits`, `images_maquettes`, `images_materiaux`
- **Images de commandes** : `image_commande`, `images_produits`, `images_avant_apres`, `images_livraison`

---

## 🔗 **RELATIONS PRINCIPALES**

### **Users ↔ Profils**
- `users.id` → `profil_createurs.utilisateur_id`
- `users.id` → `profil_ateliers.utilisateur_id`

### **Projets ↔ Créateurs**
- `projets.createur_id` → `users.id`

### **Devis ↔ Projets ↔ Ateliers**
- `devis.projet_id` → `projets.id`
- `devis.atelier_id` → `profil_ateliers.id`

### **Commandes ↔ Projets ↔ Ateliers**
- `commandes.projet_id` → `projets.id`
- `commandes.atelier_id` → `profil_ateliers.id`

---

## ✅ **STATUT FINAL**

**Toutes les migrations et modèles sont maintenant cohérents :**
- ✅ Aucun conflit entre migrations et modèles
- ✅ Tous les attributs d'images essentiels pour la mode sont présents
- ✅ Structure optimisée pour une plateforme de collaboration mode
- ✅ Relations correctement définies
- ✅ Pas de doublons
- ✅ Prêt pour le développement

**La base de données est maintenant prête pour gérer efficacement votre plateforme de collaboration mode !**
