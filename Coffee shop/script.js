/* Halfway — small, signature interactions */

(() => {
  /* 1. Dateline — replace static text with today's actual date,
        in newspaper style: "Tuesday morning · 23 May" */
  const dateEl = document.getElementById("js-date");
  if (dateEl) {
    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const hour = now.getHours();
    const partOfDay =
      hour < 11 ? "morning" :
      hour < 14 ? "midday" :
      hour < 17 ? "afternoon" :
      hour < 20 ? "evening" : "night";
    const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    dateEl.textContent = `${day} ${partOfDay} · ${date}`;
    dateEl.dateTime = now.toISOString();
  }

  /* 2. Shop pulse — rotate through small, believable "live" details.
        In production this would pull from a backend. For the demo we
        cycle a small set so the page feels alive on each visit. */
  const pulseStates = [
    {
      playing: "Nick Hakim, Cometa",
      weather: "11°, low clouds",
      pace: "Quiet, two seats free",
    },
    {
      playing: "Floating Points, Crush",
      weather: "13°, sun breaks",
      pace: "Picking up, one seat",
    },
    {
      playing: "Mdou Moctar, Funeral for Justice",
      weather: "9°, drizzling",
      pace: "Calm, plenty of room",
    },
    {
      playing: "Tirzah, Devotion",
      weather: "12°, overcast",
      pace: "Busy, expect a short wait",
    },
    {
      playing: "Yussef Dayes, Black Classical Music",
      weather: "14°, clearing",
      pace: "Easy, three seats free",
    },
  ];

  const playingEl = document.getElementById("js-playing");
  const weatherEl = document.getElementById("js-weather");
  const paceEl = document.getElementById("js-pace");

  let idx = Math.floor(Math.random() * pulseStates.length);
  const renderPulse = () => {
    const s = pulseStates[idx];
    if (playingEl) playingEl.textContent = s.playing;
    if (weatherEl) weatherEl.textContent = s.weather;
    if (paceEl) paceEl.textContent = s.pace;
  };
  renderPulse();

  setInterval(() => {
    idx = (idx + 1) % pulseStates.length;
    [playingEl, weatherEl, paceEl].forEach((el) => {
      if (!el) return;
      el.style.transition = "opacity 480ms cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "0";
    });
    setTimeout(() => {
      renderPulse();
      [playingEl, weatherEl, paceEl].forEach((el) => {
        if (!el) return;
        el.style.opacity = "1";
      });
    }, 520);
  }, 8000);

  /* 3. Scroll reveal — opt-in via IntersectionObserver, respects
        prefers-reduced-motion automatically because the CSS only
        applies the hidden state under that media query. */
  const targets = document.querySelectorAll(
    ".section-no, .hero__title, .section-title, .cupping__bean, .cupping__specs, .cupping__notes-body, .menu__item, .letter, .visit__map, .hero__lede"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement?.children || []);
          const localIndex = siblings.indexOf(el);
          el.style.transitionDelay = `${Math.min(localIndex, 6) * 60}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => io.observe(el));
})();
