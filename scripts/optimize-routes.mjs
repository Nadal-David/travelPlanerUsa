import { readdir, readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
import { simplifyCoordinates } from './route-utils.mjs';

const directory = new URL('../assets/js/routes/', import.meta.url);
const filenames = (await readdir(directory)).filter((name) => /^(day-\d+|overview)\.js$/.test(name));

for (const filename of filenames) {
  const context = { window: { TravelPlannerRoutes: { features: [] } } };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL(filename, directory), 'utf8'), context);
  const feature = context.window.TravelPlannerRoutes.features[0];
  const originalCount = feature.geometry.coordinates.length;
  feature.geometry.coordinates = simplifyCoordinates(feature.geometry.coordinates);
  await writeFile(
    new URL(filename, directory),
    `// Generated routing geometry stored locally for offline display.\nwindow.TravelPlannerRoutes.features.push(${JSON.stringify(feature)});\n`,
    'utf8'
  );
  console.log(`${feature.properties.id}: ${originalCount} -> ${feature.geometry.coordinates.length} points`);
}
