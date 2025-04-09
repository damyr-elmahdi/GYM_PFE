# Rapport de Projet - Application Fitness et E-commerce


## 1. Remerciements

Nous tenons à exprimer notre profonde gratitude à toutes les personnes qui ont contribué à la réalisation de ce projet combinant fitness et e-commerce.

Nos sincères remerciements s'adressent en premier lieu à notre encadrant, dont l'expertise et les conseils précieux nous ont guidés tout au long de ce travail. Sa disponibilité et son soutien ont été déterminants dans l'aboutissement de ce projet.

Nous remercions également l'ensemble du corps professoral et administratif de notre établissement pour la qualité de la formation dispensée, qui nous a fourni les compétences nécessaires pour mener à bien ce travail.

Notre reconnaissance va aussi à nos familles et amis pour leur soutien indéfectible, leur patience et leurs encouragements constants qui nous ont permis de surmonter les difficultés rencontrées durant cette période.

Nous souhaitons également remercier nos camarades de promotion pour l'environnement collaboratif et stimulant qu'ils ont contribué à créer, ainsi que pour les échanges enrichissants qui ont nourri notre réflexion.

Enfin, nos remerciements s'adressent aux membres du jury qui ont accepté d'évaluer notre travail et dont les remarques constructives contribueront certainement à l'amélioration de nos compétences professionnelles.

## 2. Résumé

Ce projet consiste en la conception et le développement d'une application complète combinant fitness et e-commerce. La plateforme offre aux utilisateurs la possibilité de consulter des exercices de fitness, calculer leurs besoins caloriques, accéder à une base de données nutritionnelle, et acheter des produits liés au fitness.

Développée avec des technologies modernes (React pour le frontend, Laravel/PHP pour le backend), l'application propose une architecture client-serveur robuste et une interface utilisateur intuitive. Elle répond aux besoins croissants dans le domaine du fitness et du bien-être en offrant une solution complète et intégrée.

Les principales fonctionnalités implémentées comprennent la gestion des utilisateurs avec différents rôles, un catalogue d'exercices filtrable avec système de favoris, des outils nutritionnels, un module e-commerce complet avec panier et commandes, ainsi qu'un système d'abonnement à différents forfaits.

Le développement a relevé plusieurs défis techniques, notamment la gestion efficace des fichiers médias, la sécurisation des transactions, l'implémentation de calculs nutritionnels précis et la gestion d'états complexes dans l'interface utilisateur.

Si l'application actuelle répond aux objectifs fixés initialement, plusieurs perspectives d'évolution sont envisagées, comme l'ajout de recommandations personnalisées, de fonctionnalités sociales, d'intégrations avec des appareils connectés et l'expansion des capacités commerciales.
## Sommaire

1. [Introduction](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#introduction)
2. [Cahier des charges](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#cahier-des-charges)
3. [Analyse des besoins](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#analyse-des-besoins)
4. [Conception du projet](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#conception-du-projet)
5. [Développement et mise en œuvre](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#d%C3%A9veloppement-et-mise-en-oeuvre)
6. [Conclusion et perspectives](https://claude.ai/chat/755a52a4-9701-4b5f-9175-c4aeb0d666f6#conclusion-et-perspectives)

## Introduction

Ce rapport présente le développement d'une application complète combinant fitness et e-commerce. L'application propose une plateforme où les utilisateurs peuvent accéder à des exercices de fitness, calculer leurs besoins caloriques, consulter une base de données nutritionnelle, et acheter des produits liés au fitness.

Le projet a été développé en utilisant des technologies modernes pour le frontend et le backend, notamment React pour l'interface utilisateur et Laravel/PHP pour l'API. Cette combinaison permet de créer une expérience utilisateur fluide et réactive tout en maintenant une architecture robuste côté serveur.

L'application répond aux besoins croissants dans le domaine du fitness et du bien-être, en offrant une solution complète qui permet aux utilisateurs de suivre leur progression, de gérer leur alimentation et d'acquérir des produits adaptés à leurs objectifs de santé.

## Cahier des charges

### Objectifs du projet

- Développer une plateforme complète combinant fitness et e-commerce
- Permettre aux utilisateurs de consulter et gérer des exercices de fitness
- Offrir des outils de calcul de besoins caloriques et de suivi nutritionnel
- Mettre en place une boutique en ligne avec système de panier et de commande
- Gérer différents types d'utilisateurs (clients et administrateurs)
- Implémenter un système d'abonnement avec différents forfaits

### Fonctionnalités principales

1. **Gestion des utilisateurs**
    
    - Inscription et authentification
    - Profils utilisateurs avec données personnelles et objectifs fitness
    - Différenciation des rôles (admin/client)
2. **Module d'exercices**
    
    - Catalogue d'exercices consultable par tous les utilisateurs
    - Possibilité de marquer des exercices comme favoris
    - Filtrage par partie du corps et niveau de difficulté
3. **Outils de nutrition**
    
    - Calculateur de calories avec sauvegarde des résultats
    - Base de données d'aliments avec informations nutritionnelles
4. **E-commerce**
    
    - Catalogue de produits par catégories
    - Système de panier d'achat
    - Processus de commande et paiement
    - Historique des commandes
5. **Système d'abonnement**
    
    - Différents plans avec des fonctionnalités spécifiques
    - Gestion des abonnements (création, modification, annulation)
6. **Administration**
    
    - Gestion des utilisateurs
    - Gestion des produits et des exercices
    - Statistiques d'utilisation

### Contraintes techniques

- Architecture client-serveur avec API RESTful
- Frontend développé en React
- Backend développé en PHP avec Laravel
- Base de données relationnelle
- Gestion des fichiers médias (images, vidéos)
- Sécurisation des données et des transactions

## Analyse des besoins

### Public cible

L'application s'adresse à plusieurs types d'utilisateurs :

- Personnes intéressées par le fitness et la nutrition souhaitant accéder à des ressources d'exercices
- Utilisateurs souhaitant calculer et suivre leurs besoins caloriques
- Personnes cherchant à acheter des produits liés au fitness (équipements, suppléments, etc.)
- Administrateurs nécessitant des outils de gestion de contenu et d'utilisateurs


### Besoins fonctionnels

#### Côté utilisateur (client)  
1. **Gestion du compte**  
   - Création et personnalisation du profil  
   - Mise à jour des informations personnelles et de santé  
   - Visualisation de l’abonnement actif  

2. **Exercices**  
   - Parcourir le catalogue  
   - Filtrer par difficulté et zone ciblée  
   - Ajouter/retirer des favoris  
   - Voir les détails  

3. **Produits et panier**  
   - Parcourir les produits  
   - Ajouter/retirer du panier  
   - Modifier les quantités  
   - Finaliser l’achat  

4. **Abonnements**  
   - Voir les plans  
   - S’abonner  
   - Résilier un abonnement  

5. **Calcul des besoins nutritionnels** *(Nouveau)*  
   - Calculer les besoins caloriques et macronutriments selon les données personnelles  

6. **Base de données alimentaire** *(Nouveau)*  
   - Consulter les valeurs nutritionnelles des aliments  

#### Côté administrateur  
1. **Gestion des utilisateurs**  
   - Ajouter, modifier, supprimer  
   - Attribuer des rôles  
   - Visualiser les statistiques  

2. **Gestion des exercices**  
   - Ajouter, modifier, supprimer  
   - Upload d’images/vidéos  
   - Catégorisation  

3. **Gestion des produits**  
   - Ajouter, modifier, supprimer  
   - Gestion du stock  
   - Upload d’images  

4. **Gestion des abonnements**  
   - Création et édition des plans  
   - Suivi des abonnements  



### Besoins non fonctionnels

- **Performance** : Temps de réponse rapide pour les requêtes API
- **Sécurité** : Protection des données utilisateurs et des transactions
- **Scalabilité** : Capacité à évoluer avec l'augmentation du nombre d'utilisateurs
- **Convivialité** : Interface utilisateur intuitive et responsive
- **Fiabilité** : Minimisation des erreurs et gestion appropriée des exceptions

## Conception du projet

### Introduction aux diagrammes UML

Dans le cadre de la modélisation du système, l'utilisation du langage UML (Unified Modeling Language) permet de représenter de manière claire et structurée les différents aspects du fonctionnement de l'application. Les diagrammes UML offrent une vision globale et détaillée de l’architecture logicielle, facilitant ainsi la compréhension, la conception et le développement du système.

Parmi les nombreux types de diagrammes UML, deux sont particulièrement pertinents dans ce projet :

- Le diagramme de cas d’utilisation permet de visualiser les interactions entre les utilisateurs (ou acteurs) et le système, en mettant en évidence les différentes fonctionnalités offertes.
    
- Le diagramme de classes représente les différentes entités du système, leurs attributs, leurs méthodes ainsi que les relations entre elles. Il constitue une base essentielle pour la conception orientée objet de l’application.
    

Les sections suivantes présentent ces deux diagrammes afin d’illustrer la structure et le comportement du système développé.


### Architecture globale

L'application suit une architecture client-serveur classique avec une séparation claire entre le frontend et le backend :

- Frontend** : Application React utilisant des composants modulaires
- **Backend** : API RESTful développée avec Laravel
- **Base de données** : Système de gestion de base de données relationnelle

Cette architecture permet une séparation des préoccupations et facilite la maintenance du code.

### Structure de la base de données

La base de données comprend plusieurs tables interconnectées :

1. **users** : Informations sur les utilisateurs (identifiants, profils, rôles)
2. **exercises** : Catalogue d'exercices avec descriptions et médias
3. **favorite_exercises** : Relation entre utilisateurs et exercices favoris
4. **products** : Catalogue de produits disponibles à l'achat
5. **cart_items** : Éléments dans le panier des utilisateurs
6. **orders** et **order_items** : Commandes passées et leurs détails
7. **subscriptions** : Abonnements des utilisateurs
8. **plan_details** : Détails des différents plans d'abonnement

### Conception des API

Les API sont conçues selon les principes RESTful avec des endpoints spécifiques pour chaque ressource :

- **/api/users** : Gestion des utilisateurs
- **/api/exercises** : Gestion des exercices
- **/api/cart** : Opérations liées au panier d'achat
- **/api/orders** : Gestion des commandes
- **/api/products** : Gestion des produits
- **/api/subscriptions** : Gestion des abonnements

Chaque endpoint implémente les opérations CRUD (Create, Read, Update, Delete) appropriées.

### Interfaces utilisateur

L'interface utilisateur comprend plusieurs modules :

1.Module d'authentification** : Connexion, inscription, gestion de profil
1.Module d'exercices** : Consultation, recherche et gestion des favoris
1. **Module de nutrition** : Calculateur de calories et base de données alimentaire
2. **Module e-commerce** : Catalogue, panier, commande et historique d'achats
3. **Module d'abonnement** : Consultation et gestion des abonnements
4. **Module d'administration** : Gestion du contenu et des utilisateurs

## Développement et mise en œuvre

### Technologies utilisées

**Frontend** :

- React.js pour le développement des composants d'interface
- CSS pour la mise en forme
- React Icons pour les icônes
- Local Storage pour la persistance des données côté client

**Backend** :

- PHP 8.x avec Laravel framework
- API RESTful pour l'échange de données
- Système d'authentification par jetons (tokens)
- Gestion des fichiers médias avec Laravel Storage

**Base de données** :

- Migrations Laravel pour la définition et l'évolution du schéma
- Eloquent ORM pour les interactions avec la base de données

### Implémentation clé

#### 1. Gestion des utilisateurs

Le système de gestion des utilisateurs comprend :

- Inscription et authentification sécurisée
- Gestion des profils utilisateurs avec données personnelles
- Différenciation des rôles (admin/client) pour le contrôle d'accès

```php
// Extrait du contrôleur UserController
public function store(Request $request)
{
    $fields = $request->validate([
        'name' => 'required|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        'role' => 'required|in:admin,client'
    ]);

    $fields['password'] = Hash::make($fields['password']);
    
    $user = User::create($fields);
    
    return response()->json([
        'message' => 'User created successfully',
        'user' => $user
    ], 201);
}
```

#### 2. Module d'exercices

Le module d'exercices permet aux utilisateurs de :

- Consulter un catalogue d'exercices avec descriptions et médias
- Filtrer les exercices par partie du corps et niveau de difficulté
- Marquer des exercices comme favoris

```php
// Extrait du contrôleur ExerciseController
public function index()
{
    $exercises = Exercise::all();
    return response()->json($exercises);
}

// Extrait du contrôleur FavoriteExerciseController
public function toggleFavorite(Request $request, $id)
{
    try {
        $user = $request->user();
        $exercise = Exercise::findOrFail($id);
        
        // Check if the exercise is already favorited
        if ($user->favoriteExercises()->where('exercise_id', $id)->exists()) {
            $user->favoriteExercises()->detach($id);
            return response()->json([
                'message' => 'Exercise removed from favorites',
                'isFavorite' => false
            ]);
        } else {
            $user->favoriteExercises()->attach($id);
            return response()->json([
                'message' => 'Exercise added to favorites',
                'isFavorite' => true
            ]);
        }
    } catch (\Exception $e) {
        // Gestion des erreurs
    }
}
```

#### 3. Outils de nutrition

Les outils de nutrition comprennent :

- Un calculateur de besoins caloriques basé sur les données personnelles
- Une sauvegarde des résultats de calcul
- Une base de données d'aliments avec informations nutritionnelles

```jsx
// Extrait du composant React Calculator
const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des entrées
    if (!age || !weight || !height || !activityLevel) {
        alert("Please fill in all fields.");
        return;
    }

    // Calcul du métabolisme de base
    let bmr = 88.362 + 13.397 * weightNumber + 4.799 * heightNumber - 5.677 * ageNumber;
    let activityFactor = {
        "no-exercise": 1.2,
        "1-3-times": 1.375,
        "3-5-times": 1.55,
        "6-7-times": 1.725,
        "hard-exercises": 1.9,
    }[activityLevel] || 1.2;

    // Calcul des besoins caloriques quotidiens
    const tdee = bmr * activityFactor;
    setCalories(tdee.toFixed(2));
    setProtein(((tdee * 0.25) / 4).toFixed(2));
    setCarbs(((tdee * 0.45) / 4).toFixed(2));
    setFats(((tdee * 0.3) / 9).toFixed(2));

    setShowResults(true);
};
```

#### 4. E-commerce

Le module e-commerce comprend :

- Un catalogue de produits
- Un système de panier d'achat
- Un processus de commande et de paiement

```php
// Extrait du contrôleur CartController
public function addToCart(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1'
    ]);
    
    $user = Auth::user();
    
    // Check if product exists and has stock
    $product = Product::findOrFail($request->product_id);
    
    // Check if product is already in cart
    $cartItem = CartItem::where('user_id', $user->id)
        ->where('product_id', $request->product_id)
        ->first();
        
    if ($cartItem) {
        // Update quantity if product already in cart
        $cartItem->quantity += $request->quantity;
        $cartItem->save();
    } else {
        // Create new cart item
        $cartItem = CartItem::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);
    }
    
    return response()->json([
        'message' => 'Product added to cart',
        'cart_item' => $cartItem
    ], 201);
}
```

#### 5. Système d'abonnement

Le système d'abonnement permet aux utilisateurs de :

- S'abonner à différents plans
- Gérer leur abonnement (annulation)

```php
// Extrait du contrôleur SubscriptionController
public function createSubscription(Request $request)
{
    $validatedData = $request->validate([
        'plan_type' => 'required|in:' . implode(',', array_keys(Subscription::getPlanDetails())),
        'user_id' => 'required|exists:users,id'
    ]);

    $plans = Subscription::getPlanDetails();
    $selectedPlan = $plans[$validatedData['plan_type']];

    // Check if user already has an active subscription
    $existingSubscription = Subscription::where('user_id', $validatedData['user_id'])
                                        ->where('status', 'active')
                                        ->first();

    if ($existingSubscription) {
        return response()->json([
            'message' => 'You already have an active subscription'
        ], 400);
    }

    $subscription = Subscription::create([
        'user_id' => $validatedData['user_id'],
        'plan_type' => $validatedData['plan_type'],
        'start_date' => now(),
        'end_date' => now()->addMonth(),
        'status' => 'active',
        'price' => $selectedPlan['price'],
        'features' => json_encode($selectedPlan['features'])
    ]);

    return response()->json($subscription, 201);
}
```

### Défis techniques et solutions

1. **Gestion des fichiers médias**
    
    - Défi : Stocker et servir efficacement les images pour les exercices et les produits
    - Solution : Utilisation du système de stockage de Laravel avec validation des types de fichiers et des tailles
2. **Sécurité des transactions**
    
    - Défi : Assurer la sécurité des données de paiement
    - Solution : Utilisation de transactions DB pour garantir l'intégrité des commandes
3. **Calculs nutritionnels**
    
    - Défi : Implémenter des formules précises pour les calculs caloriques
    - Solution : Utilisation d'algorithmes validés pour le calcul du métabolisme basal
4. **Gestion des états dans React**
    
    - Défi : Gérer les états complexes dans l'interface utilisateur
    - Solution : Utilisation cohérente des hooks React (useState) et du localStorage pour la persistance

## Conclusion et perspectives

### Bilan du projet

Le développement de cette application a permis de créer une plateforme complète combinant fitness et e-commerce. Les principaux objectifs ont été atteints :

- Mise en place d'un système d'authentification et de gestion des utilisateurs
- Développement d'un catalogue d'exercices avec fonctionnalités de favoris
- Implémentation d'outils de nutrition (calculateur, base de données alimentaire)
- Création d'un module e-commerce complet (catalogue, panier, commandes)
- Développement d'un système d'abonnement

L'architecture adoptée, séparant clairement le frontend et le backend, a permis une bonne organisation du code et facilitera les évolutions futures.

### Points forts

- Conception modulaire permettant une maintenance aisée
- Utilisation de technologies modernes et éprouvées
- Mise en œuvre de bonnes pratiques de développement (validation des données, gestion des erreurs)
- Interface utilisateur intuitive et réactive
- Gestion efficace des données avec des relations bien définies

### Limitations actuelles

- Absence d'un système de recommandation personnalisé
- Pas de fonctionnalités sociales (partage, commentaires)
- Intégration limitée avec des appareils connectés fitness
- Système de paiement simulé, non intégré à de vrais processeurs de paiement

### Perspectives d'évolution

Le projet pourrait être étendu avec les fonctionnalités suivantes :

1. **Personnalisation avancée**
    
    - Recommandations d'exercices et de produits basées sur le profil et l'historique
    - Plans d'entraînement personnalisés
2. **Dimension sociale**
    
    - Partage des exercices et des résultats
    - Système de commentaires et d'évaluation
    - Création de communautés autour d'objectifs communs
3. **Intégration technologique**
    
    - Connexion avec des appareils fitness (montres connectées, capteurs)
    - Synchronisation avec d'autres applications de santé
4. **Expansion commerciale**
    
    - Intégration de vrais processeurs de paiement
    - Système de réductions et de fidélité
    - Abonnements plus complexes avec différentes durées
5. **Analyse de données**
    
    - Tableaux de bord avancés pour les utilisateurs
    - Analyses prédictives pour les objectifs fitness
    - Outils de business intelligence pour les administrateurs

L'application développée constitue une base solide pour ces évolutions futures, grâce à son architecture extensible et sa conception modulaire.