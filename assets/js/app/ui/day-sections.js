// Small renderers used inside a day card.
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
          <li class="rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2.5">
          <div class="flex gap-3">
          <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-full border border-sky-400/30 bg-sky-500/10 p-0 text-[11px] font-bold leading-none text-sky-200">
            ${stepIndex + 1}
          </span>
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">${escapeHtml(step.time)}</p>
            <p class="mt-1 text-sm font-semibold text-white">${escapeHtml(step.label)}</p>
            ${step.linkUrl ? `
              <a
                class="mt-2 inline-flex text-xs font-bold text-sky-300 underline decoration-sky-300/60 underline-offset-4 transition hover:text-white"
                href="${escapeHtml(step.linkUrl)}"
                target="_blank"
                rel="noreferrer"
              >
                ${escapeHtml(step.linkLabel || 'Plus d’informations')}
              </a>
            ` : ''}
            ${Array.isArray(step.bullets) && step.bullets.length ? `
              <ul class="mt-2 space-y-1.5 pl-4 text-sm text-slate-200 marker:text-sky-300">
                ${step.bullets.map((bullet) => `
                  <li class="leading-5">${escapeHtml(bullet)}</li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
          </div>
        </li>
      `).join('')}
    </ol>
  </div>
` : '';

const renderDayInfo = (items = []) => items.length ? `
  <aside class="day-info-card mt-3 flex items-start gap-3 rounded-xl border px-4 py-3">
    <span class="day-info-icon inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black leading-none" aria-hidden="true">i</span>
    <div class="min-w-0">
      <p class="day-info-title text-[11px] font-black uppercase tracking-[0.22em]">&Agrave; savoir</p>
      <ul class="mt-2 list-disc space-y-2 pl-5 marker:text-amber-300">
        ${items.map((item) => {
          const info = typeof item === 'string' ? { text: item } : item;
          return `
            <li class="pl-1">
              <div class="min-w-0">
                <p class="day-info-text text-sm font-semibold leading-5">${escapeHtml(info.text)}</p>
              ${info.sourceUrl ? `
                <a
                  class="mt-1 inline-flex text-xs font-bold text-amber-200 underline decoration-amber-200/50 underline-offset-4 transition hover:text-amber-100"
                  href="${escapeHtml(info.sourceUrl)}"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source : ${escapeHtml(info.sourceLabel || 'Site officiel')}
                </a>
              ` : ''}
              </div>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
  </aside>
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
            <li class="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
              <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-full border border-sky-400/30 bg-sky-500/10 p-0 text-[11px] font-bold leading-none text-sky-200">
                ${stopIndex + 1}
              </span>
                <span class="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-100">${escapeHtml(stop.label)}</span>
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
