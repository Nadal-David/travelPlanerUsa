const daysContainer = document.querySelector('#days');
const navTabs = document.querySelector('#nav-tabs');
const daysCount = document.querySelector('#days-count');
const appView = document.querySelector('#app-view');
const estaView = document.querySelector('#esta-view');
const esimView = document.querySelector('#esim-view');
const parksView = document.querySelector('#parks-view');
const todoView = document.querySelector('#todo-view');
const dayPickerButton = document.querySelector('#day-picker-button');
const dayPickerLabel = document.querySelector('#day-picker-label');
const dayPickerMenu = document.querySelector('#day-picker-menu');
const dayPickerWrap = document.querySelector('#day-picker-wrap');
const travelerContainer = document.querySelector('#traveler-container');
const esimContainer = document.querySelector('#esim-container');
const parksContainer = document.querySelector('#parks-container');
const prepContainer = document.querySelector('#prep-container');
const davidContainer = document.querySelector('#david-container');
const emelineContainer = document.querySelector('#emeline-container');
const bothContainer = document.querySelector('#both-container');
const metaCities = document.querySelector('#meta-cities');
const metaFlights = document.querySelector('#meta-flights');

const storageKey = 'travel-planner-usa-checklist-v1';
const selectedTabKey = 'travel-planner-usa-tab-v1';
const storedChecks = JSON.parse(localStorage.getItem(storageKey) || '{}');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

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
              <span class="text-sm font-semibold text-slate-100">${escapeHtml(stop.label)}</span>
            </li>
          `).join('')}
        </ul>
        <a
          class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-400"
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

const renderHotel = (hotel) => hotel ? `
  <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-200">Hôtel</p>
    <p class="mt-2 text-sm font-semibold text-white">${escapeHtml(hotel)}</p>
  </div>
` : '';

const renderCar = (car) => car ? `
  <div class="mt-4 rounded-xl border border-slate-700 bg-slate-900 p-3">
    <p class="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200">${escapeHtml(car.label)}</p>
    <p class="mt-2 text-sm font-semibold text-white">Heure : ${escapeHtml(car.time)}</p>
    <p class="mt-1 text-sm text-slate-300">${escapeHtml(car.place)}</p>
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
          <span class="rounded-full border border-slate-600 bg-slate-950/60 px-3 py-1 text-xs font-bold text-sky-100">
            ${day.flights.segments.length} segment${day.flights.segments.length > 1 ? 's' : ''}
          </span>
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
    ${renderHighlights(day.highlights)}
    ${renderItinerary(day.itinerary)}
    ${renderMapPanel(day.map, index)}
    ${renderLinks(day.links)}
  </article>
`;

const renderDays = () => {
  daysContainer.innerHTML = tripDays.map(renderDayCard).join('');
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

    window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }).addTo(map);

    const bounds = [];
    day.map.stops.forEach((stop) => {
      const coords = [stop.lat, stop.lng];
      bounds.push(coords);
      window.L.marker(coords).addTo(map).bindPopup(stop.label);
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
  container.innerHTML = `
    <section class="${options.sectionClass || 'day-card rounded-xl p-4 sm:p-5'}">
      <h3 class="${options.titleClass || 'text-[19px] font-bold uppercase tracking-[0.22em] text-sky-300'}">${escapeHtml(title)}</h3>
      <div class="${options.itemsClass || 'mt-3 space-y-1.5'} ${options.indentClass || 'pl-8'}">
        ${items.map(renderChecklistItem).join('')}
      </div>
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
  const tabs = [
    { id: 'days', label: 'Jours' },
    { id: 'esta', label: 'ESTA' },
    { id: 'esim', label: 'eSIM' },
    { id: 'parks', label: 'Parcs nationaux' },
    { id: 'todo', label: 'To-do' }
  ];

  navTabs.innerHTML = tabs.map((tab) => `
    <button
      class="flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-center text-[12px] font-semibold leading-tight text-slate-300 transition hover:border-sky-400/35 hover:text-white sm:w-auto sm:rounded-full sm:px-4 sm:py-2 sm:text-sm"
      data-tab="${tab.id}"
      type="button"
    >
      ${escapeHtml(tab.label)}
    </button>
  `).join('');
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
  if (estaView) estaView.classList.toggle('hidden', tab !== 'esta');
  if (esimView) esimView.classList.toggle('hidden', tab !== 'esim');
  if (parksView) parksView.classList.toggle('hidden', tab !== 'parks');
  if (todoView) todoView.classList.toggle('hidden', tab !== 'todo');
  if (dayPickerWrap) dayPickerWrap.classList.toggle('hidden', tab !== 'days');
  if (dayPickerMenu && dayPickerButton && tab !== 'days') {
    dayPickerMenu.classList.add('hidden');
    dayPickerButton.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('[data-tab]').forEach((button) => {
    const active = button.dataset.tab === tab;
    button.classList.toggle('bg-sky-500', active);
    button.classList.toggle('text-white', active);
    button.classList.toggle('border-sky-400/60', active);
    button.classList.toggle('bg-slate-900', !active);
    button.classList.toggle('text-slate-300', !active);
    button.classList.toggle('border-slate-700', !active);
  });
};

const setActiveDay = (index, options = {}) => {
  const { scroll = true } = options;
  if (dayPickerLabel) {
    const day = tripDays[index];
    dayPickerLabel.textContent = `Jour ${index + 1} - ${day.date}`;
  }
  if (dayPickerMenu) {
    dayPickerMenu.querySelectorAll('[data-day-index]').forEach((button) => {
      const active = Number(button.dataset.dayIndex) === index;
      button.classList.toggle('bg-sky-500/10', active);
      button.classList.toggle('text-white', active);
      button.classList.toggle('border-sky-400/40', active);
      button.classList.toggle('ring-1', active);
      button.classList.toggle('ring-sky-400/20', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  if (scroll) {
    const target = document.querySelector(`#day-${index}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
setActiveDay(0, { scroll: false });

window.addEventListener('load', () => {
  mountMaps();
});
