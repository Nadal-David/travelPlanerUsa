// Navigation and active-view state.
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
