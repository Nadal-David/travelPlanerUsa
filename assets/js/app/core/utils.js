// Pure helpers, storage helpers and shared presentation constants.
const getOfflineRoute = (id) => offlineRouteGeoJson?.features?.find(
  (feature) => feature.properties?.id === id
);

const fitMapState = (state) => {
  if (state.routeBounds?.isValid?.()) {
    state.map.fitBounds(state.routeBounds, { padding: [24, 24] });
    return;
  }
  if (state.bounds?.length > 1) {
    state.map.fitBounds(state.bounds, { padding: [24, 24] });
  }
};

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const buildMapsSearchUrl = (stop) => {
  if (stop?.mapsUrl) return stop.mapsUrl;
  if (stop?.label) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.label)}`;
  }
  if (typeof stop?.lat === 'number' && typeof stop?.lng === 'number') {
    return `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;
  }
  return 'https://www.google.com/maps';
};

const saveChecks = () => localStorage.setItem(storageKey, JSON.stringify(storedChecks));
const getSelectedTab = () => localStorage.getItem(selectedTabKey) || 'days';
const setChecked = (id, checked) => {
  storedChecks[id] = checked;
  saveChecks();
};
const isChecked = (id, fallback) => Object.prototype.hasOwnProperty.call(storedChecks, id) ? storedChecks[id] : fallback;

const uniqueCities = (days) => {
  const cities = new Set();
  days.forEach((day) => {
    const origin = String(day.route || '').split('\u2192')[0].trim();
    if (origin) cities.add(origin);
  });
  return cities.size;
};

const mapActionButtonClass = 'inline-flex items-center justify-center rounded-lg border border-sky-700/40 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-400/50 hover:bg-sky-500/15 hover:text-white';
const mapMarkerButtonClass = 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-700/40 bg-sky-500/10 text-sky-200 transition hover:border-sky-400/50 hover:bg-sky-500/15 hover:text-white focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/20';
