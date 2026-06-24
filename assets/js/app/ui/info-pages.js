// ESTA, parks and eSIM information pages.
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
