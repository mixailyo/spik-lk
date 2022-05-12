function appointments() {
  let appointmentsItemMoreBtn = document.querySelectorAll('.appointments__item-more-btn');
  let appointmentsItemMore = document.querySelector('.appointments__item-more');
  let appointmentsFilterInput = document.querySelector('.appointments__filter-date-input');
  let appointmentsItemMoreCancel = document.querySelector('.appointments__item-more-cancel');
  let modalCancelRecord = document.querySelector('[data-modal="cancel-record"]');
  let appointmentDate = document.querySelector('.appointment__date');
  let appointment = document.querySelector('.appointment');
  let appointmentsFilters = document.querySelector('.appointments__filters');
  let appointmentsFiltersOpenBtn = document.querySelector('.appointments__filters-open');
  let appointmentsFiltersCloseBtn = document.querySelector('.appointments__filters-back');
  let appointmentsFiltersSubmit = document.querySelector('.appointments__filters-submit');

  if (appointmentsItemMoreBtn.length) {
    // Всплывающее меню на записи
    appointmentsItemMoreBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        let topPosition = btn.getBoundingClientRect().top + window.pageYOffset
        let leftPosition = btn.getBoundingClientRect().left + window.pageXOffset

        appointmentsItemMore.classList.add('appointments__item-more--active')
        appointmentsItemMore.style.top = `${topPosition}px`
        appointmentsItemMore.style.left = `${leftPosition}px`

        appointmentsItemMore.dataset.recordNumber = btn.closest('.appointments__item').dataset.recordNumber
      })
    })

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.appointments__item-more-btn') && !e.target.closest('.appointments__item-more')) {
        appointmentsItemMore.classList.remove('appointments__item-more--active')
      }
    })

    appointmentsItemMoreCancel.addEventListener('click', () => {
      appointmentsItemMore.classList.remove('appointments__item-more--active')
      modalCancelRecord.querySelector('.modal__btn-cancel-record').dataset.recordNumber = appointmentsItemMore.dataset.recordNumber;
    })

    // Дата в фильтрах записей

    let nowDate = new Date();
    let formatedNowDate = nowDate.toISOString().slice(0, 10);
    appointmentsFilterInput.value = formatedNowDate;
    appointmentsFilterInput.dataset.value = nowDate.toLocaleDateString();

    appointmentsFilterInput.addEventListener('change', () => {
      appointmentsFilterInput.dataset.value = appointmentsFilterInput.value === '' ? 'дд.мм.гггг' : new Date(appointmentsFilterInput.value).toLocaleDateString()
    })

    // Дата и время в форме записи на прием
    appointmentDate.addEventListener('change', () => {
      appointmentDate.classList.add('appointment__date--active')
      appointmentDate.dataset.value = new Date(appointmentDate.value).toLocaleString()
    })

    // Модалка об успешной записи на прием
    appointment.addEventListener('submit', (e) => {
      e.preventDefault();

      modals.close("make-an-appointment")
      modals.open("appointment-success")
    })

    // Фильтры на мобайле
    function appointmentsFiltersOpen() {
      appointmentsFilters.classList.add('appointments__filters--active');
      document.body.classList.add('scroll-lock')
    }

    function appointmentsFiltersClose() {
      appointmentsFilters.classList.remove('appointments__filters--active');
      document.body.classList.remove('scroll-lock')
    }

    appointmentsFiltersOpenBtn.addEventListener('click', appointmentsFiltersOpen)

    appointmentsFiltersCloseBtn.addEventListener('click', appointmentsFiltersClose)

    appointmentsFiltersSubmit.addEventListener('click', appointmentsFiltersClose)
  }
}

export { appointments }