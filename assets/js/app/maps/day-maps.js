// Per-day offline map lifecycle.
const refreshMaps = () => {
  if (!window.L) return;
  dayMaps.forEach((state) => {
    state.map.invalidateSize();
    fitMapState(state);
  });
};

const mountMaps = () => {
  if (!window.L) {
    tripDays.forEach((day, index) => {
      if (!day.map) return;
      const element = document.querySelector(`#day-map-${index}`);
      if (element) {
        element.innerHTML = `
          <div class="flex h-full items-center justify-center px-4 text-center text-sm text-slate-300">
            La carte n'a pas pu se charger. Ouvre le trajet dans Google Maps ci-contre.
          </div>
        `;
      }
    });
    return;
  }

  tripDays.forEach((day, index) => {
    if (!day.map) return;
    const element = document.querySelector(`#day-map-${index}`);
    if (!element || element._leaflet_id) return;

    const map = window.L.map(element, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([day.map.center.lat, day.map.center.lng], day.map.zoom || 12);
    const state = { map, bounds: [], routeBounds: null };
    dayMaps.set(index, state);

    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }).addTo(map);

    const bounds = [];
    day.map.stops.forEach((stop) => {
      const coords = [stop.lat, stop.lng];
      bounds.push(coords);
      state.bounds = bounds;
      const stopNumber = bounds.length;
      const markerIcon = window.L.divIcon({
        className: 'stop-marker',
        html: `<div class="stop-marker__inner">${stopNumber}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      window.L.marker(coords, { icon: markerIcon }).addTo(map).bindPopup(`${stopNumber}. ${stop.label}`);
    });

    day.map.trails?.forEach((trail) => {
      const trailCoordinates = trail.coordinates.map((point) => [point.lat, point.lng]);
      window.L.polyline(trailCoordinates, {
        color: '#f59e0b',
        weight: 4,
        opacity: 0.95,
        dashArray: '7 7',
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(map).bindPopup(trail.label);
    });

    const offlineRoute = day.map.showRoute === false ? null : getOfflineRoute(`day-${index + 1}`);
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
      state.routeBounds = routeLayer.getBounds();
      fitMapState(state);
    } else if (day.map.showRoute !== false && bounds.length > 1) {
      window.L.polyline(bounds, {
        color: '#38bdf8',
        weight: 4,
        opacity: 0.9
      }).addTo(map);
      map.fitBounds(bounds, { padding: [24, 24] });
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [24, 24] });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  });
};
