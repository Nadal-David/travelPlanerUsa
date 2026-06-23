import { mkdir, writeFile } from 'node:fs/promises';

const routeRequests = {
  'day-1': [
    [-118.4085, 33.9416],
    [-118.3623568, 33.9001875],
    [-118.3137125, 34.0834396],
    [-118.4722, 33.9856],
    [-118.4695, 33.985],
    [-118.4737, 33.9855],
    [-118.4973, 34.0094]
  ],
  'day-2': [
    [-118.3137125, 34.0834396],
    [-118.3389, 34.1016],
    [-118.3396, 34.1019],
    [-118.4004, 34.0736],
    [-118.4016, 34.0675],
    [-118.3849, 34.09],
    [-118.496, 34.0156]
  ],
  'day-3': [
    [-118.3137125, 34.0834396],
    [-118.315, 34.0838],
    [-118.3256, 34.1016],
    [-118.3268, 34.1016],
    [-118.3625, 34.1393],
    [-118.3534, 34.1381]
  ],
  'day-4': [
    [-118.3137125, 34.0834396],
    [-118.315, 34.0838],
    [-118.3256, 34.1016],
    [-118.3268, 34.1016],
    [-118.3625, 34.1393],
    [-118.3534, 34.1381]
  ],
  'day-5': [
    [-118.3137125, 34.0834396],
    [-114.5767, 35.1679]
  ],
  'day-6': [
    [-114.5767, 35.1679],
    [-112.1071, 36.0613],
    [-112.117, 36.066],
    [-112.1291202, 35.9693408],
    [-112.1247, 35.9755187],
    [-111.83738, 36.03851]
  ],
  overview: [
    [-118.2437, 34.0522],
    [-114.573, 35.1678],
    [-112.1401, 36.0544],
    [-110.0984, 36.9989],
    [-111.4558, 36.9147],
    [-112.1871, 37.593],
    [-115.1398, 36.1699],
    [-119.2921, 36.3302],
    [-119.5383, 37.8651],
    [-122.4194, 37.7749]
  ]
};

const features = [];

for (const [id, coordinates] of Object.entries(routeRequests)) {
  const path = coordinates.map(([lng, lat]) => `${lng},${lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson&steps=false`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'TravelPlannerUSA/1.0' }
  });

  if (!response.ok) throw new Error(`${id}: HTTP ${response.status}`);

  const payload = await response.json();
  const route = payload.routes?.[0];
  if (payload.code !== 'Ok' || !route) throw new Error(`${id}: ${payload.code}`);

  features.push({
    type: 'Feature',
    properties: {
      id,
      distanceMeters: Math.round(route.distance),
      durationSeconds: Math.round(route.duration),
      generatedFrom: 'OSRM / OpenStreetMap'
    },
    geometry: route.geometry
  });
}

const collection = { type: 'FeatureCollection', features };

await mkdir(new URL('../assets/routes/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../assets/routes/roadbook-routes.geojson', import.meta.url),
  `${JSON.stringify(collection, null, 2)}\n`,
  'utf8'
);
await writeFile(
  new URL('../assets/routes.js', import.meta.url),
  `// Generated routing geometry stored locally for offline display.\nconst offlineRouteGeoJson = ${JSON.stringify(collection)};\n`,
  'utf8'
);

for (const feature of features) {
  const distance = Math.round(feature.properties.distanceMeters / 1000);
  console.log(`${feature.properties.id}: ${distance} km, ${feature.geometry.coordinates.length} points`);
}
