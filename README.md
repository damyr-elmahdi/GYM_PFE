Projet Laravel - Système de gestion scolaire

Ce projet est une application web développée avec le framework Laravel pour la gestion des utilisateurs (administrateurs, professeurs, étudiants) d'un établissement scolaire.

📦 Contenu partagé (déjà installé)
- Le dossier `vendor/` est inclus : les dépendances PHP sont déjà installées
- Le dossier `node_modules/` est exclu (non nécessaire pour le partage)

🔧 Étapes d'installation POUR LES NOUVEAUX UTILISATEURS

1. Pré-requis :
- PHP >= 8.0
- Composer (seulement si vendor/ manquant)
- Serveur local (XAMPP/WAMP/MAMP)
- MySQL/MariaDB
- phpMyAdmin (optionnel)

2. Copier le projet :
- Copiez l'intégralité du dossier du projet (y compris `vendor/`)

3. Configurer l'environnement :
- Créez un fichier `.env` à partir de `.env.example`
- Modifiez ces paramètres :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scholify2
DB_USERNAME=root
DB_PASSWORD=

4. Générer la clé d'application (OBLIGATOIRE) :
php artisan key:generate

5. Démarrer le serveur :
php artisan serve

⚡ Raccourci d'installation (si vendor/ est présent) :
1. Copier le projet + créer .env
2. php artisan key:generate
3. php artisan serve

📁 Structure importante :
- vendor/ : Dépendances PHP (ne pas supprimer)
- .env : Configuration locale (à créer)
- database/base_de_donnees.sql : Importez-la dans phpMyAdmin

👥 Comptes par défaut (si la DB est importée) :
Admin : root / password : 

📞 Support :
Contactez : 0679992416 - mahdidamyr@gmail.com

Notes :
- Si vendor/ est absent, exécutez `composer install`
- Ne partagez jamais votre fichier .env !
- node_modules/ n'est pas nécessaire pour le fonctionnement de base