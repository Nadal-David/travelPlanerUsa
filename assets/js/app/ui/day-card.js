// Day card renderer and day list rendering.
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
      <div class="grid gap-3 p-3 ${Array.isArray(transport.inbound) && transport.inbound.length > 0 ? 'md:grid-cols-2' : ''}">
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
      ${(transport.inbound || []).length ? `
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
      ` : ''}
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
          <p class="mt-1 text-sm font-semibold ${hotel.breakfast === true ? 'text-emerald-300' : 'text-amber-200'}">
            ${hotel.breakfast === true ? 'Oui' : hotel.breakfast === false ? 'Non' : '&Agrave; confirmer'}
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
    ${renderDayInfo(day.info)}
    ${renderMapPanel(day.map, index)}
    ${renderLinks(day.links)}
  </article>
`;

const renderDays = () => {
  const day = tripDays[activeDayIndex];
  daysContainer.innerHTML = day ? renderDayCard(day, activeDayIndex) : '';
};
