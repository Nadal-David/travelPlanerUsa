// Roadtrip overview renderer.
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
                <li class="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2">
                  <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center self-center rounded-full border border-sky-400/30 bg-sky-500/10 p-0 text-[11px] font-bold leading-none text-sky-200">
                    ${stopIndex + 1}
                  </span>
                  <span class="min-w-0">
                    <span class="block text-sm font-semibold leading-snug text-slate-100">${escapeHtml(stop.label)}</span>
                    <span class="block text-xs leading-snug text-slate-400">${escapeHtml(stop.days)}</span>
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
