# Travel Planner USA

Application statique de planification du voyage USA. Elle reste utilisable directement hors ligne : aucune compilation, aucun serveur et aucun import JavaScript réseau ne sont nécessaires au chargement.

## Architecture

- `assets/js/data/days/day-XX.js` : une journée par fichier, modifiable indépendamment.
- `assets/js/data/reference.js` : ESTA, eSIM, pass parcs et listes communes.
- `assets/js/app/core` : état, utilitaires, événements et démarrage.
- `assets/js/app/ui` : rendu des vues et composants HTML.
- `assets/js/app/maps` : cycle de vie des cartes Leaflet.
- `assets/js/routes` : géométries générées et stockées localement.

Les scripts sont classiques et chargés dans un ordre explicite dans `index.html`. Ce choix conserve la compatibilité avec une ouverture directe en `file://`.

## Modifier une journée

Éditer uniquement le fichier `assets/js/data/days/day-XX.js` correspondant. Chaque fichier ajoute un objet à `window.TravelPlannerData.days`; l'ordre des balises dans `index.html` définit l'ordre du voyage.

## Commandes

- `npm run build` : reconstruit la feuille Tailwind locale avant un push.
- `npm test` : vérifie le chargement de tous les scripts, des 19 jours et des routes hors ligne.
- `npm run routes:generate` : régénère les fichiers de route depuis OSRM. Cette commande demande internet, mais les fichiers produits restent ensuite disponibles hors ligne.
- `npm run routes:optimize` : allège à nouveau les routes existantes sans accès internet.

Le fond satellite Esri reste une ressource en ligne. Les tracés, les marqueurs et toutes les données du roadbook sont locaux.
