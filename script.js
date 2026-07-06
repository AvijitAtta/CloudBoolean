// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Countdown — 45 days from first visit (persisted)
(function () {
  const KEY = 'cb_launch_date';
  let target = localStorage.getItem(KEY);
  if (!target) {
    target = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();
    localStorage.setItem(KEY, target);
  }
  const targetTime = new Date(target).getTime();

  const el = {
    d: document.getElementById('days'),
    h: document.getElementById('hours'),
    m: document.getElementById('minutes'),
    s: document.getElementById('seconds'),
  };

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  function tick() {
    const diff = targetTime - Date.now();
    if (diff <= 0) {
      el.d.textContent = el.h.textContent = el.m.textContent = el.s.textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    el.d.textContent = pad(days);
    el.h.textContent = pad(hours);
    el.m.textContent = pad(mins);
    el.s.textContent = pad(secs);
  }
  tick();
  setInterval(tick, 1000);
})();

// Scroll reveal
const revealEls = document.querySelectorAll('.service-card, .contact-card, .section-title, .hero-title');
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// Smooth scroll handled by CSS; collapse mobile nav after click
document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navMenu');
    if (nav.classList.contains('show')) new bootstrap.Collapse(nav).hide();
  });
});
