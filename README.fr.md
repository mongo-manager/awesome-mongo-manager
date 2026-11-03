# Awesome Mongo Manager [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<img src="https://raw.githubusercontent.com/mongo-manager/mongo-manager/main/site/assets/icon.svg" align="right" width="96" alt="Mongo Manager">

> Plug-ins et ressources pour [Mongo Manager](https://github.com/mongo-manager/mongo-manager), le gestionnaire MongoDB auto-hébergé qui fonctionne dans votre navigateur.

Un plug-in ajoute une vue, une action ou une page à Mongo Manager : une carte des lieux d’une collection, un graphique, un détecteur de doublons. C’est un dossier de fichiers statiques que l’application affiche dans un cadre isolé (sandbox), sans code côté serveur et sans accès au réseau de lui-même (seulement à une adresse qu’un administrateur définit, comme le serveur de tuiles d’une carte), et il ne s’exécute qu’après qu’un administrateur a approuvé exactement ses fichiers et les autorisations qu’il demande.

**Figurer dans cette liste n’est ni un examen ni une recommandation.** L’application analyse chaque plug-in avant qu’un administrateur l’approuve, mais une analyse trouve des motifs connus, pas des intentions. Lisez un plug-in, et son analyse sur la page Plug-ins, avant de l’approuver.

[English](README.md) · [Türkçe](README.tr.md) · [简体中文](README.zh.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Português](README.pt.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · Français · [Русский](README.ru.md)

## Sommaire

<!-- toc:start -->
- [Plug-ins officiels](#plug-ins-officiels)
  - [Requêtes et recherche](#requêtes-et-recherche)
  - [Graphiques et cartes](#graphiques-et-cartes)
  - [Documents et valeurs](#documents-et-valeurs)
  - [Schéma et qualité des données](#schéma-et-qualité-des-données)
  - [Confidentialité et données de test](#confidentialité-et-données-de-test)
  - [Exploitation et performances](#exploitation-et-performances)
- [Plug-ins de la communauté](#plug-ins-de-la-communauté)
- [Installer un plug-in](#installer-un-plug-in)
- [Créer un plug-in](#créer-un-plug-in)
<!-- toc:end -->

## Plug-ins officiels

Fournis avec Mongo Manager : ils sont déjà sur votre serveur, et un administrateur active chacun d’eux depuis la page Plug-ins.

<!-- official:start -->

### Requêtes et recherche

- [Filtres de date](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/date-presets) - Place dans la requête Documents les plages de dates courantes (aujourd’hui, hier, les 7 derniers jours, ce mois-ci, les n dernières heures ou jours, entre deux jours) sur un champ de date, ou sur _id selon le moment de création des documents.
- [Recherche de valeurs](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/value-search) - Cherche un texte, un nombre ou un ObjectId dans chaque champ des documents d’une collection et indique où il a été trouvé.
- [SQL vers MongoDB](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/sql-to-mongodb) - Convertit les instructions SELECT en requêtes MongoDB et en code de pilote, les exécute en lecture seule dans la collection ouverte (un JOIN lit aussi la collection qu’il nomme, de la même base de données) et les transmet à Documents ou Agrégations.
- [Bac à sable de recherche](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/search-playground) - Teste les index de recherche d’une collection : recherche en texte intégral dans un champ ou dans tous, avec fautes de frappe tolérées et surlignages, ou recherche vectorielle avec un vecteur collé ou un document de la collection. Résultats avec leur score ; le pipeline passe à Agrégations.
- [Remodeler](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/reshape) - Renomme, aplatit, imbrique, convertit ou supprime les champs d’une collection en opérations prévisualisées sur des documents d’échantillon, puis les transmet à Agrégations comme un pipeline ; un $out ajouté là-bas écrit une nouvelle collection. La collection elle-même n’est jamais modifiée.

### Graphiques et cartes

- [Graphiques](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/charts) - Représente les valeurs d’une collection sous forme de graphique — barres, courbe dans le temps, anneau, histogramme, nuage de points — avec un tableau récapitulatif, dans le cadre de la requête en cours.
- [Carte](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/geojson-map) - Dessine sur une carte les champs GeoJSON et les paires \[lng, lat\] des documents d’une collection, et les filtre selon une zone dessinée dessus.

### Documents et valeurs

- [Comparaison de documents](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-diff) - Compare un document à un autre de sa collection, champ par champ : ce qui a été ajouté, supprimé ou modifié, valeurs imbriquées et tableaux compris.
- [Références](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/references) - Trouve les champs qui contiennent des ObjectId d’autres documents et les collections vers lesquelles ils pointent ; affiche le nom du document référencé à côté de chaque identifiant, et signale comme tel un document manquant ; liste les documents qui font référence à un document.
- [Indices temporels](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/time-hints) - Affiche, en pointant un ObjectId, le moment de sa création et, en pointant un nombre qui se lit comme une heure Unix, sa date.
- [Heure locale](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/local-time) - Affiche chaque date dans votre heure locale, ou dans un fuseau horaire que vous définissez, avec son décalage par rapport à UTC, dans une infobulle ou à côté de la valeur ; si vous le souhaitez, il y a combien de temps c’était.
- [Aperçu des données binaires](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/binary-preview) - Indique ce que contient une valeur binaire — le type et la taille d’une image, un PDF, une archive — lorsqu’on la pointe, et affiche les images stockées dans les documents d’une collection, ou dans un seul document, dessinées à partir de leurs propres octets.
- [UUID hérités](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/legacy-uuid) - Lit les UUID hérités que stockaient les anciens pilotes (sous-type binaire 3) dans les ordres d’octets de Java, C# et Python, détermine dans quel ordre un champ a été écrit et trouve un UUID quelle que soit la façon dont il a été stocké.
- [Taille des documents](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/document-size) - Quelle est la taille des documents d’une collection — leur répartition, les plus gros, leur proximité de la limite de 16 MB — et où vont leurs octets, champ par champ et jusque dans les champs objet, noms compris, mesuré sur le serveur.

### Schéma et qualité des données

- [Santé du schéma](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/schema-health) - Vérifie un échantillon d’une collection, la taille de ses documents et ses index à la recherche des antipatrons de schéma cités dans la documentation de MongoDB : documents et tableaux volumineux, imbrication profonde, types mélangés, index inutilisés et redondants.
- [Contrôle de validation](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/validation-inspector) - Vérifie un à un les documents d’une collection par rapport à ses règles de validation (sur un échantillon aléatoire ou sur tous) et indique combien enfreignent chaque règle, ces documents étant à un clic dans Documents.
- [Détecteur de doublons](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/duplicate-finder) - Trouve les documents qui partagent des valeurs dans des champs qui devraient être uniques, les compte et affiche les plus répétés en premier.
- [Dictionnaire de données](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/data-dictionary) - Documente une base de données : les champs de chaque collection avec leurs types et leur présence, ce qu’en disent ses règles de validation, les références entre collections, les index et les règles. S’affiche dans un onglet et s’enregistre en Markdown ou en HTML.

### Confidentialité et données de test

- [Détecteur de données personnelles](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/personal-data) - Repère, dans un échantillon aléatoire, les champs d’une collection qui contiennent des données personnelles (e-mails, téléphones, cartes, IBAN, numéros d’identité, noms, adresses, mots de passe), n’affiche que des exemples masqués et suggère les champs choisis comme règles de données personnelles.
- [Anonymiseur](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/anonymiser) - Crée une copie anonymisée d’une collection pour les tests ou le partage : valeurs fictives réalistes qui gardent leur format, hachages cohérents, valeurs mélangées, dates décalées, bruit numérique ; enregistrée en NDJSON ou JSON, ou importée dans une nouvelle collection.
- [Données de test](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/mock-data) - Génère des documents de test réalistes, de la forme de ceux d’une collection — noms, e-mails, adresses, prix, dates et plus, à partir de plus de 100 modèles en dix langues — et les transmet à l’assistant d’importation, où vous les vérifiez et lancez l’importation.

### Exploitation et performances

- [Script d’index](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/index-script) - Écrit les index d’une collection, ou de toute une base de données, sous forme de commandes qui les recréent — pour mongosh, le pilote Node.js ou Python, ou en JSON — à copier ou à enregistrer, pour un autre environnement ou une migration.
- [Rapport de stockage](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/storage-report) - Affiche ce que chaque collection occupe sur le disque, l’espace libre que WiredTiger garde dans ses fichiers et ceux de ses index, et sa part. Pour une collection, estime ce que le compactage restituerait et la compacte quand l’application vous le demande et que vous saisissez son nom.
- [Expiration (TTL)](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/ttl-view) - Montre quand les index TTL d’une collection suppriment ses documents (déjà échus, dans l’heure, le jour, la semaine, plus tard) et lesquels ils ne suppriment jamais ; chaque groupe est à un clic dans Documents.
- [Analyseur de clés de partition](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/shard-key-analyzer) - Compare les clés de partition candidates d’une collection d’après les résultats de analyzeShardKey de MongoDB (valeurs distinctes, fréquence de la valeur la plus courante, croissance de la clé à chaque insertion) et juge chacune selon les recommandations de MongoDB.
- [Analyseur de journaux](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/log-analyzer) - Lit un fichier journal mongod ou mongos dans votre navigateur (il ne le quitte jamais) et affiche ses opérations lentes regroupées par forme de requête, les erreurs et avertissements, les connexions et une chronologie.

<!-- official:end -->

## Plug-ins de la communauté

Les plug-ins créés par d’autres, chacun dans son propre dépôt, figurent dans la [liste en anglais](README.md#community-plugins). Chaque entrée est vérifiée avec le code même de l’application, par rapport à la dernière version de Mongo Manager : sa dernière version contient une seule archive de plug-in, l’application accepte son manifeste, et l’analyse de l’application n’y trouve aucun risque élevé.

## Installer un plug-in

Sur la page **Plug-ins**, un administrateur choisit **Téléverser un plug-in** et fournit le fichier `.tgz` de la version GitHub du plug-in, ou choisit **Installer depuis GitHub** et donne l’adresse du dépôt (désactivé tant que le serveur ne définit pas `MM_PLUGINS_GITHUB=1`).

Sur le serveur lui-même, on peut aussi placer le dossier du plug-in, nommé d’après son id, dans le dossier `plugins` du répertoire de données, puis choisir **Analyser à nouveau**.

Quelle que soit la voie, le plug-in arrive désactivé, est analysé et attend l’approbation d’un administrateur. Toute modification de ses fichiers demande une nouvelle approbation.

## Créer un plug-in

Sur la page Plug-ins, sous **Créer votre propre plug-in**, choisissez **Lire le guide du développeur** pour tout ce qu’un plug-in peut faire : le manifeste, le pont, les autorisations, le bac à sable, l’analyse, l’empaquetage et la publication.

- [Modèle de départ](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins/starter) - Un plug-in qui fonctionne, en JavaScript simple, sans étape de compilation ni dépendance, avec des instructions pour les assistants de programmation IA. Aussi sur la page Plug-ins, sous **Télécharger le modèle de départ (.zip)**.
- [Code source des plug-ins officiels](https://github.com/mongo-manager/mongo-manager/tree/main/packages/plugins) - Tous les plug-ins ci-dessus, avec leurs tests.

## Contribuer

Les contributions sont les bienvenues ! Lisez d’abord les [consignes de contribution](CONTRIBUTING.md) (en anglais). Pour ajouter un plug-in, ouvrez une pull request qui ajoute une ligne à README.md.
