// Reusable checklist rendering.
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
