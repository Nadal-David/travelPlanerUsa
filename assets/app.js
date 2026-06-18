const daysContainer = document.querySelector('#days');
const navTabs = document.querySelector('#nav-tabs');
const daysCount = document.querySelector('#days-count');
const appView = document.querySelector('#app-view');
const overviewView = document.querySelector('#overview-view');
const estaView = document.querySelector('#esta-view');
const esimView = document.querySelector('#esim-view');
const parksView = document.querySelector('#parks-view');
const todoView = document.querySelector('#todo-view');
const dayPickerButton = document.querySelector('#day-picker-button');
const dayPickerLabel = document.querySelector('#day-picker-label');
const dayPickerMenu = document.querySelector('#day-picker-menu');
const dayPickerWrap = document.querySelector('#day-picker-wrap');
const dayPrev = document.querySelector('#day-prev');
const dayNext = document.querySelector('#day-next');
const dayCounter = document.querySelector('#day-counter');
const travelerContainer = document.querySelector('#traveler-container');
const esimContainer = document.querySelector('#esim-container');
const parksContainer = document.querySelector('#parks-container');
const prepContainer = document.querySelector('#prep-container');
const davidContainer = document.querySelector('#david-container');
const emelineContainer = document.querySelector('#emeline-container');
const bothContainer = document.querySelector('#both-container');
const metaCities = document.querySelector('#meta-cities');
const metaFlights = document.querySelector('#meta-flights');
const overviewContainer = document.querySelector('#overview-container');
let navMoreButton = null;
let navMoreMenu = null;

const storageKey = 'travel-planner-usa-checklist-v1';
const selectedTabKey = 'travel-planner-usa-tab-v1';
const storedChecks = JSON.parse(localStorage.getItem(storageKey) || '{}');
let activeDayIndex = 0;
const dayMaps = new Map();
let overviewMapState = null;

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

const renderFlightSegment = (segment) => `
  <div class="rounded-xl border border-slate-700 bg-slate-900 p-3">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">Vol ${escapeHtml(segment.number)}</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(segment.from)} &rarr; ${escapeHtml(segment.to)}</p>
      </div>
    </div>
    <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-2.5">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Départ</p>
        <p class="mt-1 font-semibold text-white">${escapeHtml(segment.depart)}</p>
      </div>
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-2.5">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Arrivée</p>
        <p class="mt-1 font-semibold text-white">${escapeHtml(segment.arrive)}</p>
      </div>
    </div>
  </div>
`;

const renderLinks = (links = []) => links.length ? `
  <div class="mt-4">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Liens utiles</p>
    <ul class="mt-2 space-y-2">
      ${links.map((link) => `
        <li>
          <a
            class="group flex items-start gap-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-sky-200 transition hover:border-sky-400/40 hover:bg-slate-800 hover:text-white"
            href="${escapeHtml(link.url)}"
            target="_blank"
            rel="noreferrer"
          >
            <span class="leading-6">${escapeHtml(link.label)}</span>
          </a>
        </li>
      `).join('')}
    </ul>
  </div>
` : '';

const renderHighlights = (highlights = []) => highlights.length ? `
  <div class="mt-4">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Activités</p>
    <div class="mt-2 flex flex-wrap gap-2">
      ${highlights.map((item) => `
        <span class="label-chip border border-slate-700 bg-slate-900 text-sky-100">${escapeHtml(item)}</span>
      `).join('')}
    </div>
  </div>
` : '';

const renderItinerary = (itinerary = []) => itinerary.length ? `
  <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-4">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">Activités</p>
    <ol class="mt-3 space-y-2">
      ${itinerary.map((step, stepIndex) => `
        <li class="flex gap-3 rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2.5">
          <span class="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2 text-[11px] font-bold text-sky-200">
            ${stepIndex + 1}
          </span>
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">${escapeHtml(step.time)}</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(step.label)}</p>
          </div>
        </li>
      `).join('')}
    </ol>
  </div>
` : '';

const renderMapPanel = (map, index) => map ? `
  <div class="mt-4 overflow-hidden rounded-xl border border-sky-700/30 bg-slate-900">
    <div class="border-b border-sky-700/30 px-4 py-3">
      <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300">Carte du jour</p>
      <h3 class="mt-1 text-lg font-bold text-white">${escapeHtml(map.title)}</h3>
    </div>
    <div class="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
      <div id="day-map-${index}" class="h-72 bg-slate-950 lg:h-full"></div>
      <div class="border-t border-slate-700 bg-slate-900 p-4 lg:border-l lg:border-t-0">
        <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Points clés</p>
        <ul class="mt-3 space-y-2">
          ${map.stops.map((stop, stopIndex) => `
            <li class="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <span class="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2 text-[11px] font-bold text-sky-200">
                ${stopIndex + 1}
              </span>
              <span class="min-w-0 flex-1 text-sm font-semibold text-slate-100">${escapeHtml(stop.label)}</span>
              <a
                class="${mapMarkerButtonClass}"
                href="${escapeHtml(buildMapsSearchUrl(stop))}"
                target="_blank"
                rel="noreferrer"
                aria-label="Ouvrir ${escapeHtml(stop.label)} dans Google Maps"
                title="Ouvrir dans Google Maps"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4">
                  <path fill="currentColor" d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13S5 14.25 5 9c0-3.866 3.134-7 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"/>
                </svg>
              </a>
            </li>
          `).join('')}
        </ul>
        <a
          class="mt-4 w-full ${mapActionButtonClass}"
          href="${escapeHtml(map.directionsUrl)}"
          target="_blank"
          rel="noreferrer"
        >
          Ouvrir dans Google Maps
        </a>
      </div>
    </div>
  </div>
` : '';

const renderOverview = () => {
  if (!overviewContainer) return;
  overviewContainer.innerHTML = `
    <section class="day-card rounded-xl p-4 sm:p-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">${escapeHtml(overviewTrip.title)}</p>
          <h2 class="mt-1 text-3xl font-black tracking-tight text-white">Carte globale du roadtrip</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">${escapeHtml(overviewTrip.subtitle)}</p>
        </div>
      </div>
      <div class="mt-4 overflow-hidden rounded-xl border border-sky-700/30 bg-slate-900">
        <div class="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
          <div id="overview-map" class="h-[28rem] bg-slate-950 lg:h-full"></div>
          <div class="border-t border-slate-700 bg-slate-900 p-4 lg:border-l lg:border-t-0">
            <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Grandes étapes</p>
            <ol class="mt-3 space-y-2">
              ${overviewTrip.stops.map((stop, stopIndex) => `
                <li class="flex items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                  <span class="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 px-2 text-[11px] font-bold text-sky-200">
                    ${stopIndex + 1}
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm font-semibold text-slate-100">${escapeHtml(stop.label)}</span>
                    <span class="block text-xs text-slate-400">${escapeHtml(stop.days)}</span>
                  </span>
                </li>
              `).join('')}
            </ol>
            <a
              class="mt-4 w-full ${mapActionButtonClass}"
              href="${escapeHtml(overviewTrip.directionsUrl)}"
              target="_blank"
              rel="noreferrer"
            >
              Ouvrir l’itinéraire global
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
};

const renderVisit = (visit) => visit ? `
  <div class="mt-4 overflow-hidden rounded-xl border border-emerald-800/40 bg-slate-900">
    <div class="border-b border-emerald-800/40 px-4 py-3">
      <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200">Visite réservée</p>
      <h3 class="mt-1 text-lg font-bold text-white">${escapeHtml(visit.title)}</h3>
    </div>
    <div class="grid gap-2.5 p-3 sm:grid-cols-2">
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Heure</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(visit.time)}</p>
      </div>
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Billetterie</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(visit.checkin)}</p>
      </div>
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3 sm:col-span-2">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Détails</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(visit.details)}</p>
        <p class="mt-2 text-sm text-slate-300">${escapeHtml(visit.provider)}</p>
        <p class="mt-1 text-sm text-slate-300">${escapeHtml(visit.address)}</p>
      </div>
    </div>
  </div>
` : '';

const renderTransport = (transport) => transport ? `
  <div class="mt-4 overflow-hidden rounded-xl border border-cyan-800/40 bg-slate-900">
    <div class="border-b border-cyan-800/40 px-4 py-3">
      <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">${escapeHtml(transport.title || 'Transport en commun')}</p>
      <h3 class="mt-1 text-lg font-bold text-white">${escapeHtml(transport.summary || 'Accès sans voiture')}</h3>
        ${transport.duration ? `<p class="mt-1 text-sm text-slate-300">Temps total estimé à pied: ${escapeHtml(transport.duration)}</p>` : ''}
        ${transport.driveDuration ? `<p class="mt-1 text-sm text-slate-300">En voiture: ${escapeHtml(transport.driveDuration)}</p>` : ''}
        ${transport.hours ? `<p class="mt-1 text-sm text-slate-300">${escapeHtml(transport.hours)}</p>` : ''}
    </div>
    <div class="grid gap-3 p-3 md:grid-cols-2">
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Aller</p>
        <ol class="timeline-list mt-3">
          ${(transport.outbound || []).map((step, stepIndex) => `
            <li class="timeline-item">
              <span class="timeline-dot">${stepIndex + 1}</span>
              <span class="timeline-text">${escapeHtml(step)}</span>
            </li>
          `).join('')}
        </ol>
      </div>
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Retour</p>
        <ol class="timeline-list mt-3">
          ${(transport.inbound || []).map((step, stepIndex) => `
            <li class="timeline-item">
              <span class="timeline-dot">${stepIndex + 1}</span>
              <span class="timeline-text">${escapeHtml(step)}</span>
            </li>
          `).join('')}
        </ol>
      </div>
      ${transport.parking ? `
        <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3 md:col-span-2">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Parking</p>
          <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(transport.parking)}</p>
        </div>
      ` : ''}
      ${transport.link ? `
        <a class="md:col-span-2 ${mapActionButtonClass}" href="${escapeHtml(transport.link.url)}" target="_blank" rel="noreferrer">
          ${escapeHtml(transport.link.label)}
        </a>
      ` : ''}
    </div>
  </div>
` : '';

const renderHotel = (hotel) => {
  if (!hotel) return '';
  if (typeof hotel === 'string') {
    return `
      <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">Hôtel</p>
        <p class="mt-2 text-sm font-semibold text-white">${escapeHtml(hotel)}</p>
      </div>
    `;
  }

  return `
    <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
      <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">Hôtel</p>
      <p class="mt-2 text-sm font-semibold text-white">${escapeHtml(hotel.name)}</p>
      ${hotel.address ? `<p class="mt-1 text-sm text-slate-300">${escapeHtml(hotel.address)}</p>` : ''}
      <div class="mt-3 grid gap-2 sm:grid-cols-2">
        ${hotel.dates ? `
          <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Dates</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(hotel.dates)}</p>
          </div>
        ` : ''}
        ${hotel.nights ? `
          <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Nuit(s)</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(hotel.nights)}</p>
          </div>
        ` : ''}
        ${hotel.mealPlan ? `
          <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Plan de repas</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(hotel.mealPlan)}</p>
          </div>
        ` : ''}
        <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Petit déjeuner</p>
          <p class="mt-1 text-sm font-semibold ${hotel.breakfast ? 'text-emerald-300' : 'text-amber-200'}">
            ${hotel.breakfast ? 'Oui' : 'Non'}
          </p>
        </div>
        ${hotel.reception ? `
          <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3 sm:col-span-2">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Réception</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(hotel.reception)}</p>
          </div>
        ` : ''}
        ${hotel.roomType ? `
          <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3 sm:col-span-2">
            <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Type de chambre</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(hotel.roomType)}</p>
          </div>
        ` : ''}
        ${hotel.mapsUrl ? `
          <a
            class="${mapActionButtonClass} sm:col-span-2"
            href="${escapeHtml(hotel.mapsUrl)}"
            target="_blank"
            rel="noreferrer"
          >
            Ouvrir sur Google Maps
          </a>
        ` : ''}
      </div>
    </div>
  `;
};

const renderCar = (car) => car ? `
  <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200">${escapeHtml(car.label)}</p>
    <div class="mt-2 grid gap-2 sm:grid-cols-2">
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Heure</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(car.time)}</p>
      </div>
      <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
        <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Lieu</p>
        <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(car.place)}</p>
      </div>
      ${car.agency ? `
        <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Agence</p>
          <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(car.agency)}</p>
        </div>
      ` : ''}
      ${car.model ? `
        <div class="rounded-lg border border-slate-700 bg-slate-950/40 p-3">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Véhicule</p>
          <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(car.model)}</p>
        </div>
      ` : ''}
    </div>
  </div>
` : '';

const renderDayCard = (day, index) => `
  <article id="day-${index}" class="day-card rounded-xl p-4">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">${escapeHtml(day.date)}</p>
        <h2 class="mt-1 text-xl font-black tracking-tight text-white">${escapeHtml(day.title)}</h2>
        <p class="mt-2 text-sm font-medium text-slate-300">${escapeHtml(day.route)}</p>
      </div>
      <span class="label-chip border border-slate-700 bg-slate-900 text-slate-100">
        ${day.flights ? 'Vols' : day.hotel ? '\u00c9tape' : day.visit ? 'Visite' : 'Programme'}
      </span>
    </div>

    ${day.flights ? `
      <section class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
        <div class="flex items-center justify-between gap-3">
          <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200">${escapeHtml(day.flights.title)}</p>
          <div class="flex flex-wrap items-center gap-2">
            ${day.flights.duration ? `
              <span class="rounded-full border border-slate-600 bg-slate-950/60 px-3 py-1 text-xs font-bold text-sky-100">
                Durée ${escapeHtml(day.flights.duration)}
              </span>
            ` : ''}
            <span class="rounded-full border border-slate-600 bg-slate-950/60 px-3 py-1 text-xs font-bold text-sky-100">
              ${day.flights.segments.length} segment${day.flights.segments.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div class="mt-3 grid gap-2">
          ${day.flights.segments.map((segment, segmentIndex) => `
            ${renderFlightSegment(segment)}
            ${segmentIndex === 0 && day.flights.connection ? `
              <div class="flex justify-center">
                <span class="label-chip border border-slate-700 bg-slate-950/60 text-sky-100">
                  Escale : ${escapeHtml(day.flights.connection)}
                </span>
              </div>
            ` : ''}
          `).join('')}
        </div>
      </section>
    ` : ''}

    ${renderCar(day.car)}
    ${renderHotel(day.hotel)}
    ${renderVisit(day.visit)}
    ${renderTransport(day.transport)}
    ${renderHighlights(day.highlights)}
    ${renderItinerary(day.itinerary)}
    ${renderMapPanel(day.map, index)}
    ${renderLinks(day.links)}
  </article>
`;

const renderDays = () => {
  const day = tripDays[activeDayIndex];
  daysContainer.innerHTML = day ? renderDayCard(day, activeDayIndex) : '';
};

const refreshMaps = () => {
  if (!window.L) return;
  dayMaps.forEach((state) => {
    state.map.invalidateSize();
    if (state.bounds && state.bounds.length > 1) {
      state.map.fitBounds(state.bounds, { padding: [24, 24] });
    }
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
    const state = { map, bounds: [] };
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

    if (bounds.length > 1) {
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
  });
};

const refreshOverviewMap = () => {
  if (!window.L || !overviewMapState?.map) return;
  overviewMapState.map.invalidateSize();
  if (overviewMapState.bounds && overviewMapState.bounds.length > 1) {
    overviewMapState.map.fitBounds(overviewMapState.bounds, { padding: [24, 24] });
  }
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

  overviewMapState = { map, bounds };

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

  if (bounds.length > 1) {
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

const renderEsta = () => {
  estaView.innerHTML = `
    <section class="day-card rounded-xl p-4 sm:p-5">
      <div class="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">${escapeHtml(estaInfo.title)}</p>
          <h2 class="mt-1 text-3xl font-black tracking-tight text-white">Autorisation de voyage</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Demande à faire en ligne avant le départ. Le texte important est mis en avant pour être lisible d'un coup d'œil.
          </p>
          <a
            class="mt-4 inline-flex rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-400"
            href="${escapeHtml(estaInfo.mainLink)}"
            target="_blank"
            rel="noreferrer"
          >
            Faire la demande ESTA
          </a>
        </div>
        <div class="rounded-xl border border-sky-700/30 bg-slate-900 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Résumé</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-200">
            ${estaInfo.bullets.map((item) => `<li class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
};

const renderParks = () => {
  parksContainer.innerHTML = `
    <section class="day-card rounded-xl p-4 sm:p-5">
      <div class="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">${escapeHtml(parkPassInfo.title)}</p>
          <h2 class="mt-1 text-3xl font-black tracking-tight text-white">${escapeHtml(parkPassInfo.name)}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Un seul pass pour nous deux dans la même voiture, utile sur les grands parcs du voyage.
          </p>
          <a
            class="mt-4 inline-flex rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-400"
            href="${escapeHtml(parkPassInfo.buyLink)}"
            target="_blank"
            rel="noreferrer"
          >
            Acheter le pass en version digitale
          </a>
        </div>
        <div class="rounded-xl border border-sky-700/30 bg-slate-900 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">À savoir</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-200">
            ${parkPassInfo.bullets.map((item) => `<li class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="mx-auto mt-8 max-w-4xl overflow-hidden border border-slate-600 bg-slate-800">
        <div class="border-b border-slate-700 bg-slate-900 px-4 py-3">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Comparatif</p>
          <p class="mt-1 text-sm text-slate-300">Estimation pour deux personnes sur l'itinéraire.</p>
        </div>
        <table class="w-full border-collapse text-sm text-slate-100">
          <thead>
            <tr class="bg-slate-700 text-slate-100">
              <th class="border-b border-slate-600 px-4 py-3 text-left font-semibold">Option</th>
              <th class="border-b border-slate-600 px-4 py-3 text-left font-semibold">Coût estimé pour 2 personnes</th>
            </tr>
          </thead>
          <tbody>
            ${parkPassInfo.tableRows.map((row) => `
              <tr class="${row.strong ? 'bg-sky-950/60 text-white font-semibold' : 'bg-slate-900'}">
                <td class="border-t border-slate-700 px-4 py-2.5 ${row.strong ? 'text-white' : 'text-slate-100'}">${escapeHtml(row.label)}</td>
                <td class="border-t border-slate-700 px-4 py-2.5 ${row.strong ? 'text-white' : 'text-slate-100'}">${escapeHtml(row.cost)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="mx-auto mt-6 max-w-4xl text-sm text-slate-200">
        <p class="font-semibold">
          Acheter le pass en version digitale :
          <a class="text-sky-300 underline decoration-sky-400/40 underline-offset-4" href="${escapeHtml(parkPassInfo.buyLink)}" target="_blank" rel="noreferrer">
            Digital America the Beautiful Passes
          </a>
        </p>

        <div class="mt-6">
          <p class="font-semibold text-white">Sources :</p>
          <ul class="mt-2 space-y-2">
            ${parkPassInfo.sources.map((source) => `
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 shrink-0 rounded-full bg-slate-300"></span>
                <a class="text-sky-300 underline decoration-sky-400/40 underline-offset-4" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
                  ${escapeHtml(source.label)}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
};

const renderEsim = () => {
  if (!esimContainer) return;
  esimContainer.innerHTML = `
    <section class="day-card rounded-xl p-4 sm:p-5">
      <div class="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-sky-300">${escapeHtml(esimInfo.title)}</p>
          <h2 class="mt-1 text-3xl font-black tracking-tight text-white">${escapeHtml(esimInfo.name)}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Pour 3 semaines aux Etats-Unis, on cherche surtout un bon compromis entre couverture, simplicite et prix. Ubigi sort comme le choix le plus equilibré.
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a
              class="inline-flex rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-bold text-slate-100 transition hover:border-sky-400/40 hover:text-white"
              href="${escapeHtml(esimInfo.mainLink)}"
              target="_blank"
              rel="noreferrer"
            >
              Site Ubigi
            </a>
          </div>
        </div>
        <div class="rounded-xl border border-sky-700/30 bg-slate-900 p-4">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Pourquoi ce choix</p>
          <ul class="mt-3 space-y-2 text-sm text-slate-200">
            ${esimInfo.bullets.map((item) => `<li class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="mx-auto mt-8 max-w-4xl overflow-hidden border border-slate-600 bg-slate-800">
        <div class="border-b border-slate-700 bg-slate-900 px-4 py-3">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Comparatif rapide</p>
          <p class="mt-1 text-sm text-slate-300">Pour un roadtrip de 3 semaines avec GPS, messages et recherches.</p>
        </div>
        <table class="w-full border-collapse text-sm text-slate-100">
          <thead>
            <tr class="bg-slate-700 text-slate-100">
              <th class="border-b border-slate-600 px-4 py-3 text-left font-semibold">Option</th>
              <th class="border-b border-slate-600 px-4 py-3 text-left font-semibold">Lecture rapide</th>
            </tr>
          </thead>
          <tbody>
            ${esimInfo.tableRows.map((row) => `
              <tr class="${row.strong ? 'bg-sky-950/60 text-white font-semibold' : 'bg-slate-900'}">
                <td class="border-t border-slate-700 px-4 py-2.5 ${row.strong ? 'text-white' : 'text-slate-100'}">${escapeHtml(row.label)}</td>
                <td class="border-t border-slate-700 px-4 py-2.5 ${row.strong ? 'text-white' : 'text-slate-100'}">${escapeHtml(row.cost)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="mx-auto mt-6 max-w-4xl text-sm text-slate-200">
        <div class="mt-1">
          <p class="font-semibold text-white">A garder en tete :</p>
          <ul class="mt-2 space-y-2">
            ${esimInfo.notes.map((item) => `
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 shrink-0 rounded-full bg-slate-300"></span>
                <span>${escapeHtml(item)}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="mt-6">
          <p class="font-semibold text-white">Sources :</p>
          <ul class="mt-2 space-y-2">
            ${esimInfo.sources.map((source) => `
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 shrink-0 rounded-full bg-slate-300"></span>
                <a class="text-sky-300 underline decoration-sky-400/40 underline-offset-4" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">
                  ${escapeHtml(source.label)}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
};

const renderChecklistItem = (item) => `
  <label class="flex items-start gap-2 text-[15px] leading-6 text-slate-100">
    <input class="mt-1 size-4 shrink-0 accent-sky-400" type="checkbox" data-check-id="${escapeHtml(item.id)}" ${isChecked(item.id, item.checked) ? 'checked' : ''}>
    <span class="flex-1">${escapeHtml(item.label)}</span>
    ${item.linkLabel ? `
      <span class="shrink-0 whitespace-nowrap">
        <a
          class="ml-1 inline-flex items-center rounded-full bg-sky-500/15 px-2.5 py-0.5 text-[13px] font-medium text-sky-200 underline decoration-sky-300/60 underline-offset-2 transition hover:text-white hover:bg-sky-500/25"
          href="#${escapeHtml(item.linkTab)}"
          data-tab-link="${escapeHtml(item.linkTab)}"
        >
          ${escapeHtml(item.linkLabel)}
        </a>
      </span>
    ` : ''}
  </label>
`;

const renderChecklistGroup = (title, items, container, options = {}) => {
  if (!container) return;
  const renderItems = (list) => list.map(renderChecklistItem).join('');
  container.innerHTML = `
    <section class="${options.sectionClass || 'day-card rounded-xl p-4 sm:p-5'}">
      <h3 class="${options.titleClass || 'text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300'}">${escapeHtml(title)}</h3>
      ${Array.isArray(items) ? `
        <div class="${options.itemsClass || 'mt-3 space-y-1.5'} ${options.indentClass || 'pl-8'}">
          ${renderItems(items)}
        </div>
      ` : `
        <div class="mt-3 space-y-4">
          ${(items.sections || []).map((section) => `
            <div>
              <h4 class="text-[15px] font-semibold uppercase tracking-[0.18em] text-slate-400">${escapeHtml(section.title)}</h4>
              <div class="${options.itemsClass || 'mt-3 space-y-1.5'} ${options.indentClass || 'pl-8'}">
                ${renderItems(section.items || [])}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </section>
  `;
};

const renderTodo = () => {
  if (travelerContainer) {
    travelerContainer.innerHTML = `
      <section class="day-card rounded-xl p-4 sm:p-5">
        <h2 class="text-center text-2xl font-black tracking-tight text-white">To-Do List</h2>
      </section>
    `;
  }

  renderChecklistGroup('Préparation', prepTodo, prepContainer, {
    titleClass: 'text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300',
    itemsClass: 'mt-3 space-y-1.5',
    indentClass: 'pl-8'
  });

  if (davidContainer) {
    davidContainer.innerHTML = `
      <section class="day-card rounded-xl p-4 sm:p-5">
        <div>
          <h4 class="text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300">David</h4>
          <div class="mt-3 space-y-1.5 pl-8">
            ${travelTodo.David.map(renderChecklistItem).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderChecklistGroup('Emeline', travelTodo.Emeline, emelineContainer, {
    titleClass: 'text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300',
    itemsClass: 'mt-3 space-y-1.5',
    indentClass: 'pl-8'
  });

  renderChecklistGroup('David et Emeline', travelTodo['David et Emeline'], bothContainer, {
    titleClass: 'text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300',
    itemsClass: 'mt-3 space-y-1.5',
    indentClass: 'pl-8'
  });
};

const renderTraveler = () => renderTodo();

const renderNav = () => {
  const otherTabs = [
    { id: 'overview', label: 'Itinéraire global' },
    { id: 'esta', label: 'ESTA' },
    { id: 'esim', label: 'eSIM' },
    { id: 'parks', label: 'Parcs nationaux' },
    { id: 'todo', label: 'To-do' }
  ];

  navTabs.innerHTML = `
    <button
      class="flex shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-slate-300 transition hover:border-sky-400/35 hover:text-white sm:px-4 sm:text-sm"
      data-tab="days"
      type="button"
    >
      Jours
    </button>
    <div class="relative ml-auto">
      <button
        id="nav-more-button"
        class="inline-flex min-w-[7.25rem] items-center justify-between gap-2 rounded-full border border-slate-700 bg-slate-950/40 px-4 py-2 text-[11px] font-semibold text-slate-300 transition hover:border-sky-400/35 hover:text-white focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/20 sm:min-w-[8rem]"
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <span class="truncate">Pages</span>
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-4 w-4 shrink-0 text-slate-400">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
        </svg>
      </button>
      <div
        id="nav-more-menu"
        class="absolute right-0 top-full z-30 mt-2 hidden min-w-56 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl shadow-slate-950/50"
        role="menu"
      >
        ${otherTabs.map((tab) => `
          <button
            class="flex w-full items-center px-4 py-3 text-left text-sm text-slate-200 transition duration-150 hover:bg-slate-800 hover:text-white focus-visible:bg-slate-800 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500/35"
            data-tab="${tab.id}"
            type="button"
            role="menuitem"
          >
            ${escapeHtml(tab.label)}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  navMoreButton = document.querySelector('#nav-more-button');
  navMoreMenu = document.querySelector('#nav-more-menu');
};

const renderDaySelect = () => {
  if (!dayPickerMenu) return;
  dayPickerMenu.innerHTML = tripDays.map((day, index) => `
    <button
      class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-900 hover:text-white"
      type="button"
      role="option"
      data-day-index="${index}"
      aria-selected="false"
    >
      <span class="flex-1">
        <span class="block font-semibold text-inherit">Jour ${index + 1}</span>
        <span class="block text-xs text-slate-400">${escapeHtml(day.date)}</span>
      </span>
    </button>
  `).join('');
};

const setActiveTab = (tab) => {
  localStorage.setItem(selectedTabKey, tab);
  if (appView) appView.classList.toggle('hidden', tab !== 'days');
  if (overviewView) overviewView.classList.toggle('hidden', tab !== 'overview');
  if (estaView) estaView.classList.toggle('hidden', tab !== 'esta');
  if (esimView) esimView.classList.toggle('hidden', tab !== 'esim');
  if (parksView) parksView.classList.toggle('hidden', tab !== 'parks');
  if (todoView) todoView.classList.toggle('hidden', tab !== 'todo');
  if (dayPickerWrap) dayPickerWrap.classList.toggle('hidden', tab !== 'days');
  if (dayPickerMenu && dayPickerButton && tab !== 'days') {
    dayPickerMenu.classList.add('hidden');
    dayPickerButton.setAttribute('aria-expanded', 'false');
  }
  if (navMoreMenu && navMoreButton) {
    navMoreMenu.classList.add('hidden');
    navMoreButton.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('[data-tab]').forEach((button) => {
    const active = button.dataset.tab === tab;
    const inMenu = Boolean(button.closest('#nav-more-menu'));

    if (inMenu) {
      button.classList.toggle('bg-slate-800', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('ring-1', active);
      button.classList.toggle('ring-slate-500/35', active);
      button.classList.toggle('bg-transparent', !active);
      button.classList.toggle('text-slate-200', !active);
      button.classList.toggle('ring-0', !active);
    } else {
      button.classList.toggle('bg-sky-500', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('border-sky-400/60', active);
      button.classList.toggle('bg-slate-900', !active);
      button.classList.toggle('text-slate-300', !active);
      button.classList.toggle('border-slate-700', !active);
    }
  });

  if (navMoreButton) {
    const active = tab !== 'days';
    navMoreButton.classList.toggle('bg-slate-900', active);
    navMoreButton.classList.toggle('text-white', active);
    navMoreButton.classList.toggle('border-sky-400/35', active);
    navMoreButton.classList.toggle('bg-slate-950/40', !active);
    navMoreButton.classList.toggle('text-slate-300', !active);
    navMoreButton.classList.toggle('border-slate-700', !active);
  }

  if (tab === 'days' || tab === 'overview') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (tab === 'days') refreshMaps();
        if (tab === 'overview') {
          mountOverviewMap();
          refreshOverviewMap();
        }
      });
    });
  }
};

const setActiveDay = (index, options = {}) => {
  const maxIndex = tripDays.length - 1;
  const nextIndex = Math.min(Math.max(Number(index) || 0, 0), maxIndex);
  activeDayIndex = nextIndex;

  const day = tripDays[activeDayIndex];

  if (dayPickerLabel && day) {
    dayPickerLabel.textContent = `Jour ${activeDayIndex + 1} - ${day.date}`;
  }
  if (dayCounter && day) {
    dayCounter.textContent = `Jour ${activeDayIndex + 1} / ${tripDays.length} • ${day.date}`;
  }
  if (dayPickerMenu) {
    dayPickerMenu.querySelectorAll('[data-day-index]').forEach((button) => {
      const active = Number(button.dataset.dayIndex) === activeDayIndex;
      button.classList.toggle('bg-slate-800', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('border-slate-500/35', active);
      button.classList.toggle('ring-1', active);
      button.classList.toggle('ring-slate-500/25', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }
  if (dayPrev) dayPrev.disabled = activeDayIndex === 0;
  if (dayNext) dayNext.disabled = activeDayIndex === maxIndex;

  renderDays();
  mountMaps();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      refreshMaps();
    });
  });
};

const bindChecklistHandlers = () => {
  document.querySelectorAll('input[data-check-id]').forEach((input) => {
    input.addEventListener('change', () => {
      setChecked(input.dataset.checkId, input.checked);
    });
  });
};

const bindUi = () => {
  navTabs.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-tab]');
    if (!button) return;
    setActiveTab(button.dataset.tab);
  });

  if (navMoreButton && navMoreMenu) {
    navMoreButton.addEventListener('click', () => {
      const open = !navMoreMenu.classList.contains('hidden');
      navMoreMenu.classList.toggle('hidden', open);
      navMoreButton.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    navMoreMenu.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-tab]');
      if (!button) return;
      setActiveTab(button.dataset.tab);
      navMoreMenu.classList.add('hidden');
      navMoreButton.setAttribute('aria-expanded', 'false');
    });
  }

  if (dayPrev) {
    dayPrev.addEventListener('click', () => {
      setActiveDay(activeDayIndex - 1);
    });
  }

  if (dayNext) {
    dayNext.addEventListener('click', () => {
      setActiveDay(activeDayIndex + 1);
    });
  }

  if (dayPickerButton && dayPickerMenu) {
    dayPickerButton.addEventListener('click', () => {
      const open = !dayPickerMenu.classList.contains('hidden');
      dayPickerMenu.classList.toggle('hidden', open);
      dayPickerButton.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    dayPickerMenu.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-day-index]');
      if (!button) return;
      setActiveDay(Number(button.dataset.dayIndex));
      dayPickerMenu.classList.add('hidden');
      dayPickerButton.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', (event) => {
    if (navMoreButton && navMoreMenu && !event.target.closest('#nav-more-button') && !event.target.closest('#nav-more-menu')) {
      navMoreMenu.classList.add('hidden');
      navMoreButton.setAttribute('aria-expanded', 'false');
    }
    if (dayPickerButton && dayPickerMenu && !event.target.closest('#day-picker-button') && !event.target.closest('#day-picker-menu')) {
      dayPickerMenu.classList.add('hidden');
      dayPickerButton.setAttribute('aria-expanded', 'false');
    }
    const link = event.target.closest('[data-tab-link]');
    if (!link) return;
    event.preventDefault();
    setActiveTab(link.dataset.tabLink);
  });
};

renderNav();
renderDaySelect();
renderDays();
renderOverview();
renderEsta();
renderEsim();
renderParks();
renderTraveler();
bindChecklistHandlers();
bindUi();

if (daysCount) daysCount.textContent = `${tripDays.length} jours`;
if (metaCities) metaCities.textContent = String(uniqueCities(tripDays));
if (metaFlights) metaFlights.textContent = String(tripDays.filter((day) => day.flights).length);

setActiveTab(getSelectedTab());
setActiveDay(0);

window.addEventListener('load', () => {
  mountMaps();
});

window.addEventListener('resize', () => {
  refreshMaps();
  refreshOverviewMap();
});
