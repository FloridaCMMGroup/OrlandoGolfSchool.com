// orlandogolfschool.com: tuition schedule, countdown and school list.
// All switch times are midnight US Eastern. To change prices or dates, edit PHASES and the
// data-start values on the school list in index.html. SureCart prices must be changed to match.
(function () {
  var REGULAR = 2299;
  var PHASES = [
    { key: 'early',   from: null,                   until: '2026-11-27T05:00:00Z', price: 1999,
      text: 'Save $300 before tuition rises to $2,299 on January 1.' },
    { key: 'holiday', from: '2026-11-27T05:00:00Z', until: '2026-12-25T05:00:00Z', price: 1699,
      text: 'Holiday price: save $600 through December 24.' },
    { key: 'late',    from: '2026-12-25T05:00:00Z', until: '2027-01-01T05:00:00Z', price: 1999,
      text: 'Last chance: save $300 before tuition rises to $2,299 on January 1.' },
    { key: 'regular', from: '2027-01-01T05:00:00Z', until: null,                   price: REGULAR,
      text: '' }
  ];

  var now = Date.now();
  function t(iso) { return iso ? Date.parse(iso) : null; }
  function money(n) { return '$' + n.toLocaleString('en-US'); }

  var current = PHASES[PHASES.length - 1];
  for (var i = 0; i < PHASES.length; i++) {
    var p = PHASES[i];
    if ((p.from === null || now >= t(p.from)) && (p.until === null || now < t(p.until))) { current = p; break; }
  }

  // Prices everywhere they appear.
  document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = money(current.price); });
  var onSale = current.price < REGULAR;
  document.querySelectorAll('[data-was]').forEach(function (el) {
    el.textContent = money(REGULAR);
    el.hidden = !onSale;
  });
  document.querySelectorAll('[data-savings-line]').forEach(function (el) {
    el.textContent = onSale
      ? 'That\u2019s ' + money(REGULAR - current.price) + ' off. Tuition rises to $2,299 on January 1, 2027.'
      : '';
  });

  document.querySelectorAll('[data-presale]').forEach(function (el) { el.hidden = !onSale; });

  // Promo bar and countdown.
  var promo = document.getElementById('promo');
  var promoText = document.getElementById('promo-text');
  var countdown = document.getElementById('promo-countdown');
  if (!current.text) {
    promo.hidden = true;
  } else {
    promoText.textContent = current.text;
    if (current.key !== 'early' && current.until) {
      var end = t(current.until);
      var tick = function () {
        var ms = end - Date.now();
        if (ms <= 0) { window.location.reload(); return; }
        var d = Math.floor(ms / 86400000);
        var h = Math.floor((ms % 86400000) / 3600000);
        var m = Math.floor((ms % 3600000) / 60000);
        countdown.textContent = 'Ends in ' + d + (d === 1 ? ' day, ' : ' days, ') + h + (h === 1 ? ' hour, ' : ' hours, ') + m + (m === 1 ? ' minute' : ' minutes');
      };
      countdown.hidden = false;
      tick();
      setInterval(tick, 30000);
    }
  }

  // Highlight the current step in the tuition schedule.
  var reached = true;
  document.querySelectorAll('#schedule li').forEach(function (li) {
    if (li.getAttribute('data-phase') === current.key) { li.classList.add('is-now'); li.setAttribute('aria-current', 'true'); reached = false; }
    else if (reached) { li.classList.add('is-past'); }
  });
  if (current.key === 'regular') {
    var sched = document.querySelector('.ladder-prices');
    if (sched) sched.hidden = true;
  }

  // Hide schools that have already started (Eastern time).
  var todayET = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
  document.querySelectorAll('#schools li[data-start]').forEach(function (li) {
    if (li.getAttribute('data-start') <= todayET) li.hidden = true;
  });
})();
