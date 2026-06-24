// Roadtrip overview map lifecycle.
const refreshOverviewMap = () => {
  if (!window.L || !overviewMapState?.map) return;
  overviewMapState.map.invalidateSize();
  fitMapState(overviewMapState);
};

const mountOverviewMap = () => {
  if (!overviewContainer) return;
  const element = document.querySelector('#overview-map');
  if (!element) return;

  if (!window.L) {
    element.innerHTML = `
      <div class="flex h-full items-center justify-center px-4 text-center text-sm text-slate-300">
        La carte globale n'a pas pu se charger. Ouvre les étapes dans Google Maps ci-contre.
      </div>
    `;
    return;
  }

  if (overviewMapState?.map || element._leaflet_id) {
    refreshOverviewMap();
    return;
  }

  const bounds = [];
  const map = window.L.map(element, {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([36.5, -115.5], 4);

  overviewMapState = { map, bounds, routeBounds: null };

  window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri'
  }).addTo(map);

  overviewTrip.stops.forEach((stop, stopIndex) => {
    const coords = [stop.lat, stop.lng];
    bounds.push(coords);
    overviewMapState.bounds = bounds;
    const markerIcon = window.L.divIcon({
      className: 'stop-marker',
      html: `<div class="stop-marker__inner">${stopIndex + 1}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    window.L.marker(coords, { icon: markerIcon }).addTo(map).bindPopup(`${stopIndex + 1}. ${stop.label}`);
  });

  const offlineRoute = getOfflineRoute('overview');
  if (offlineRoute) {
    const routeLayer = window.L.geoJSON(offlineRoute, {
      style: {
        color: '#38bdf8',
        weight: 4,
        opacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round'
      }
    }).addTo(map);
    overviewMapState.routeBounds = routeLayer.getBounds();
    fitMapState(overviewMapState);
  } else if (bounds.length > 1) {
    window.L.polyline(bounds, {
      color: '#38bdf8',
      weight: 4,
      opacity: 0.9
    }).addTo(map);
    map.fitBounds(bounds, { padding: [24, 24] });
  }

  setTimeout(() => {
    map.invalidateSize();
  }, 0);
};
