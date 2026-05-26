/* Cakes & Cookies — interactions */
(function () {
  'use strict';

  /* ---- Brand contacts (single source of truth) ---- */
  var WA_LB = '96176177785';   // Lebanon WhatsApp / phone
  var WA_AE = '971521360218';  // UAE WhatsApp / phone

  /* ---- Mobile nav ---- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav__drawer a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Nav shadow on scroll ---- */
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Gallery filter ---- */
  var filterBar = document.querySelector('.filterbar');
  if (filterBar) {
    var items = document.querySelectorAll('.masonry [data-cat]');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn) return;
      filterBar.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        it.style.display = (f === 'all' || it.getAttribute('data-cat') === f) ? '' : 'none';
      });
    });
  }

  /* ---- Order / quote multi-step form ---- */
  var form = document.getElementById('orderForm');
  if (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    var indicators = Array.prototype.slice.call(document.querySelectorAll('.step'));
    var current = 0;

    function showStep(i) {
      steps.forEach(function (s, idx) { s.hidden = idx !== i; });
      indicators.forEach(function (ind, idx) { ind.classList.toggle('is-active', idx <= i); });
      current = i;
      var first = steps[i].querySelector('input,select,textarea');
      if (first) { try { first.focus({ preventScroll: true }); } catch (_) {} }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(i) {
      var ok = true;
      steps[i].querySelectorAll('[required]').forEach(function (el) {
        var field = el.closest('.field');
        var valid = el.type === 'radio'
          ? !!form.querySelector('input[name="' + el.name + '"]:checked')
          : !!el.value.trim() && (!el.checkValidity || el.checkValidity());
        if (!valid) {
          ok = false;
          if (field) field.classList.add('has-error');
          el.setAttribute('aria-invalid', 'true');
        } else {
          if (field) field.classList.remove('has-error');
          el.removeAttribute('aria-invalid');
        }
      });
      if (!ok) {
        var bad = steps[i].querySelector('[aria-invalid="true"]');
        if (bad) bad.focus();
      }
      return ok;
    }

    form.addEventListener('click', function (e) {
      var next = e.target.closest('[data-next]');
      var prev = e.target.closest('[data-prev]');
      if (next) { e.preventDefault(); if (validateStep(current)) showStep(Math.min(current + 1, steps.length - 1)); }
      if (prev) { e.preventDefault(); showStep(Math.max(current - 1, 0)); }
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field.has-error');
      if (field && e.target.value.trim()) { field.classList.remove('has-error'); e.target.removeAttribute('aria-invalid'); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(current)) return;

      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };
      var market = get('market');
      var lines = [
        '🎂 New Cake Inquiry — Cakes & Cookies',
        '',
        'Name: ' + get('name'),
        'Phone: ' + get('phone'),
        'Market: ' + market,
        'Occasion: ' + get('occasion'),
        'Date needed: ' + get('date'),
        'Servings: ' + get('servings'),
        'Flavour: ' + get('flavour'),
        'Budget: ' + get('budget'),
        '',
        'Details: ' + (get('details') || '—')
      ];
      var text = encodeURIComponent(lines.join('\n'));
      var number = market === 'UAE (Dubai / Abu Dhabi)' ? WA_AE : WA_LB;
      var waURL = 'https://wa.me/' + number + '?text=' + text;

      // Show success panel + open WhatsApp with prefilled order
      var success = document.getElementById('formSuccess');
      var formInner = document.getElementById('formInner');
      var waLink = document.getElementById('waLink');
      if (waLink) waLink.href = waURL;
      if (formInner) formInner.style.display = 'none';
      if (success) { success.classList.add('show'); success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      window.open(waURL, '_blank', 'noopener');
    });

    showStep(0);
  }

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
