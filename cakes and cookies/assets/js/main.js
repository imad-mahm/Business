/* Cakes & Cookies — interactions */
(function () {
  'use strict';

  /* ---- Brand contacts (single source of truth) ---- */
  var WA_LB = '96176177785';   // Lebanon WhatsApp / phone
  var WA_AE = '971521360218';  // UAE WhatsApp / phone

  /* ---- Graceful image fallback: reveal the styled frame if a photo fails ---- */
  document.querySelectorAll('.imgframe img').forEach(function (img) {
    img.addEventListener('error', function () { img.remove(); });
  });

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

  /* ---- Hero spotlight reveal (veil unveiled by cursor / auto-drift on touch) ---- */
  document.querySelectorAll('[data-reveal]').forEach(function (rv) {
    var fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) { rv.classList.add('is-bare'); return; }     // show all cakes, no motion

    if (fine) {
      // Track the cursor globally so the spotlight keeps following it past the
      // frame edges — off the images means the reveal moves off-frame too.
      window.addEventListener('pointermove', function (e) {
        var r = rv.getBoundingClientRect();
        rv.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        rv.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      }, { passive: true });
    } else {
      var t = 0;
      (function drift() {
        t += 0.01;
        rv.style.setProperty('--mx', (50 + 34 * Math.sin(t) * Math.cos(t * 0.6)) + '%');
        rv.style.setProperty('--my', (50 + 32 * Math.sin(t * 0.85)) + '%');
        requestAnimationFrame(drift);
      })();
    }
  });

  /* ---- Hero floating-cake parallax: each cake is drawn TOWARD the cursor ---- */
  document.querySelectorAll('[data-floating]').forEach(function (container) {
    var fine = window.matchMedia && matchMedia('(pointer: fine)').matches;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Randomise each cake's idle float so none of them move in sync
    if (!reduce) {
      var rnd = function (a, b) { return a + Math.random() * (b - a); };
      container.querySelectorAll('.floaty__inner').forEach(function (inner) {
        inner.style.setProperty('--fx', (rnd(8, 22) * (Math.random() < 0.5 ? -1 : 1)).toFixed(1) + 'px');
        inner.style.setProperty('--fy', rnd(10, 26).toFixed(1) + 'px');
        inner.style.setProperty('--fr', (rnd(1.5, 4.5) * (Math.random() < 0.5 ? -1 : 1)).toFixed(1) + 'deg');
        var dur = rnd(6.5, 11);
        inner.style.animationDuration = dur.toFixed(2) + 's';
        inner.style.animationDelay = (-rnd(0, dur)).toFixed(2) + 's'; // negative = start mid-cycle
      });
    }

    if (!fine || reduce) return; // parallax only on a fine pointer, non-reduced motion

    var sensitivity = parseFloat(container.getAttribute('data-sensitivity')) || 1;
    var easing = 0.08;
    var MAX = 90; // px cap so a far cursor only makes them lean, not fly
    var items = [].slice.call(container.querySelectorAll('[data-depth]')).map(function (el) {
      return { el: el, depth: parseFloat(el.getAttribute('data-depth')) || 1, x: 0, y: 0, hx: 0, hy: 0 };
    });
    if (!items.length) return;

    function clamp(v) { return v < -MAX ? -MAX : (v > MAX ? MAX : v); }

    // Measure home centres ONCE (page coords) so the animation loop never reads
    // layout — that per-frame getBoundingClientRect/offset read was the scroll jank.
    function measure() {
      for (var i = 0; i < items.length; i++) { items[i].el.style.transform = ''; items[i].x = 0; items[i].y = 0; }
      for (var j = 0; j < items.length; j++) {
        var r = items[j].el.getBoundingClientRect();
        items[j].hx = r.left + window.scrollX + r.width / 2;
        items[j].hy = r.top + window.scrollY + r.height / 2;
      }
    }
    measure();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(measure, 150); });

    var px = null, py = null; // cursor in page coords (scroll-independent, no layout read)
    window.addEventListener('mousemove', function (e) { px = e.pageX; py = e.pageY; }, { passive: true });
    document.addEventListener('mouseleave', function () { px = py = null; });

    var visible = true, raf = null;
    function kick() { if (raf === null) raf = requestAnimationFrame(frame); }
    function frame() {
      raf = null;
      for (var i = 0; i < items.length; i++) {
        var it = items[i], tx = 0, ty = 0;
        if (px !== null) {
          var s = (it.depth * sensitivity) / 20;
          tx = clamp((px - it.hx) * s); // vector toward the cursor
          ty = clamp((py - it.hy) * s);
        }
        it.x += (tx - it.x) * easing;
        it.y += (ty - it.y) * easing;
        it.el.style.transform = 'translate3d(' + it.x.toFixed(2) + 'px,' + it.y.toFixed(2) + 'px,0)';
      }
      if (visible) raf = requestAnimationFrame(frame);
    }
    // Run only while the hero is on screen; stop entirely once scrolled past.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) kick(); }, { threshold: 0 }).observe(container);
    }
    kick();
  });

  /* ---- Minimalist pink cursor follower ---- */
  (function () {
    if (!window.matchMedia) return;
    if (!matchMedia('(pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, shown = false;
    var hot = 'a, button, summary, label, input, select, textarea, .dish, .collection';

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; glow.classList.add('is-on'); }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.classList.remove('is-on'); shown = false; });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hot)) glow.classList.add('is-hot');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hot)) glow.classList.remove('is-hot');
    });

    (function loop() {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      glow.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  })();

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
