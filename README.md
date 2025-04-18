# Projet_Web_S2

## Description du projet :
*Nihon no Monogatari* (Les histoires du Japon) est un site dédié à la culture, à l’histoire et aux paysages du Japon. Il permet d'explorer les différentes régions et villes japonaises tout en offrant une expérience interactive avec un petit kitsune (renard) virtuel dont l'utilisateur peut s'occuper.
Le but est de faire découvrir la culture nippone au plus grand monde.


## Fonctionnalités principales : 

### 1. Accueil
Présentation générale du site ainsi que deux carrousels d'images représentants différents paysages et monuments du Japon.

### 2. Frise chronologique présentant des événements 
Sur cette page, vous pourrez découvrir des événements clés de l'histoire du Japon en naviguant sur la frise à l'aide des boutons précédent et suivant.
Des informations complémentaires sur ces événements seront alors affichés en-dessous de la frise.


### 3. Carte interactive du Japon
Les visiteurs peuvent découvrir les différentes régions du Japon, ainsi que plusieurs villes (représentées par des torii) en cliquant sur celles-ci.
Le petit kitsune donnera alors des informations sur les villes et sur les régions. 
Pour chaque région, si vous voulez en apprendre plus, vous pourrez cliquer sur le lien qui vous redirigera vers une page donnant plus amples informations sur celle-ci.


### 4. Kitsune : Possibilité de s'occuper d'un petit Kitsune
Ici, vous pourrez interagir avec un petit kitsune pour augmenter son niveau d'affinité.
Vous pouvez le caresser, le nourrir ou jouer avec en appuyant sur les boutons correspondants.
Si vous souhaitez réinitialiser votre niveau d'affinité, vous pouvez utiliser le bouton réinitialiser.

### 5. Navigation
Vous pouvez naviguer sur chaque page à l'aide des dfférents onglets présents sur la barre de navigation.


## Les instructions d’installation et d’exécution :
- Installer Node.js et DBeaver (base de données)
- Vérifier dans l'invite de commande que ceci est bien installé :
    - npm init -y
    - npm install express sqlite3 body-parser express-session
- Ouvrir le terminal dans ton répertoire de projet et exécuter la commande suivante :
    - node server.js
- Ouvrir un navigateur et aller à l'adresse suivante :
    - http://localhost:3000
- Vous arrivez sur une page de connexion (obligatoire pour naviguer sur le site)
- Vous pouvez ensuite vous déplacer librement sur le site grâce aux différents onglets

- Pour DBeaver, une fois l'installation finie :
    - sélectionnner SQLite puis "Suivant"
    - Cliquer sur "Open" et importer la base de données (database) présente dans le dossier private
    - Cliquer ensuite sur "Terminer"
    - Appuyer sur la flèche pour déplier database.db
    - Déplier ensuite "Tables" pour accéder aux tables "accounts" et "users"

## Membres du groupe : 
- Nathan ACHIN,
- Loïc DESRY,
- Léo HERAULT,
- Lucas MONNEHAY,
- Audrey VASSEUR.
