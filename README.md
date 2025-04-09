# Instructions de configuration de la base de données du projet

## Instructions d'importation de la base de données

Ce projet nécessite une base de données MySQL pour fonctionner correctement. J'ai inclus la structure et le contenu de la base de données dans cette soumission pour garantir que le projet fonctionne sans configuration supplémentaire.

### Option 1 : Configuration automatique (Recommandée)

1. Placez tous les fichiers du projet dans votre répertoire de serveur web (par exemple, htdocs pour XAMPP, www pour WAMP)
2. Accédez au projet dans votre navigateur (par exemple, http://localhost/nom-du-projet)
3. Le script de configuration créera et remplira automatiquement la base de données
4. Vous serez redirigé vers la page de connexion une fois la configuration terminée

### Option 2 : Importation manuelle de la base de données

Si la configuration automatique ne fonctionne pas, suivez ces étapes :

1. **Créer la base de données**
   - Ouvrez phpMyAdmin (généralement à http://localhost/phpmyadmin)
   - Cliquez sur "Nouvelle" dans la barre latérale gauche pour créer une nouvelle base de données
   - Nommez la base de données `project_db` (ou utilisez le nom spécifié dans le fichier `config.php`)
   - Cliquez sur "Créer"

2. **Importer le contenu de la base de données**
   - Sélectionnez votre base de données nouvellement créée dans la barre latérale gauche
   - Cliquez sur l'onglet "Importer" en haut
   - Cliquez sur "Choisir un fichier" et sélectionnez le fichier `database.sql` inclus dans cette soumission
   - Faites défiler vers le bas et cliquez sur "Exécuter" pour importer la structure et les données de la base de données

3. **Vérifier la connexion à la base de données**
   - Ouvrez le fichier `config.php` dans le répertoire racine du projet
   - Assurez-vous que les paramètres de connexion à la base de données correspondent à votre environnement :
     ```php
     $dbHost = 'localhost';
     $dbUser = 'root';  // Nom d'utilisateur par défaut pour XAMPP/WAMP
     $dbPass = '';      // Mot de passe par défaut pour XAMPP/WAMP (vide)
     $dbName = 'project_db';
     ```
   - Enregistrez les modifications si nécessaire

## Identifiants de connexion par défaut

Une fois la base de données configurée, vous pouvez accéder au système en utilisant :

- **Nom d'utilisateur :** admin
- **Mot de passe :** admin123

## Dépannage

Si vous rencontrez des problèmes de connexion à la base de données :

1. Vérifiez que votre serveur web (Apache) et les services MySQL sont en cours d'exécution
2. Vérifiez que le nom de la base de données correspond à celui du fichier `config.php`
3. Assurez-vous que l'utilisateur MySQL dispose des autorisations appropriées pour accéder à la base de données
4. Vérifiez les messages d'erreur dans le journal d'erreurs du projet

## Structure du projet

- `/index.php` - Point d'entrée principal de l'application
- `/config.php` - Paramètres de configuration de la base de données
- `/database.sql` - Dump complet de la base de données avec structure et données
- `/includes/` - Contient des fonctions d'aide et des composants
- `/assets/` - Fichiers CSS, JavaScript et images

## Prérequis

- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur
- Serveur web (Apache/Nginx)