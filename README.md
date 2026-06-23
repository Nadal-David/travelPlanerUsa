Pages: generer un build avant push

```bash
npm run build
```

## Cartes hors ligne

Les geometries routieres sont conservees dans `assets/routes/roadbook-routes.geojson`.
L'application charge leur version embarquee depuis `assets/routes.js`, ce qui fonctionne
aussi quand le site est ouvert directement depuis les fichiers locaux.

Apres une modification des points d'un trajet, regenerer les deux fichiers avec :

```bash
node scripts/generate-routes.mjs
```

Cette commande utilise ponctuellement le serveur public OSRM. L'affichage des routes
enregistrees ne fait ensuite plus appel a ce serveur. Le fond satellite Esri reste en ligne.
