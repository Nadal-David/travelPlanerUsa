// Event binding and application startup.
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
