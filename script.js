/* =========================================================
   CloudBoolean Technology — script.js
   Theme toggle · Navbar · Reveals · Counters · EmailJS form
   ========================================================= */

/* ---------- EmailJS configuration ----------
   1. Sign up at https://www.emailjs.com/
   2. Create an Email Service (e.g. Gmail), copy the SERVICE_ID.
   3. Create an Email Template with variables:
        {{name}} {{company}} {{email}} {{phone}} {{service}} {{budget}} {{message}}
      Set its "To Email" to info@cloudboolean.com.
      Copy the TEMPLATE_ID.
   4. In Account → API Keys, copy your PUBLIC KEY.
   5. Paste them below.                                       */
const EMAILJS_PUBLIC_KEY = "ykq77V6YoXO6S1kWm";
const EMAILJS_SERVICE_ID = "service_w73ik9j";
const EMAILJS_TEMPLATE_ID = "template_1ftircf";
const EMAILJS_TEMPLATE_ID_AUTO_REPLY = "template_0u63bmo";

/* ---------- THEME (runs ASAP, before DOMContentLoaded paint) ---------- */
(function initTheme() {
  try {
    const saved = localStorage.getItem("cb-theme");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (sysDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#07091A" : "#2563EB");
  } catch (e) {}
})();

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Theme toggle button ---------- */
  const toggle = document.getElementById("themeToggle");
  const setTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("cb-theme", t);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", t === "dark" ? "#07091A" : "#2563EB");
    toggle?.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };
  toggle?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  /* React to system changes when user hasn't overridden */
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("cb-theme")) setTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Sticky navbar ---------- */
  const nav = document.getElementById("mainNav");
  const top = document.getElementById("toTop");
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
    if (window.scrollY > 400) top.classList.add("show");
    else top.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Close mobile menu on link click */
  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn-primary-grad").forEach((l) => {
    l.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  /* Back-to-top */
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    ".feature, .service-card, .stack, .step, .case, .testimonial, .mvv-item, .trust-list, .contact-info, .contact-form, .hero-copy, .hero-visual, .industry, .model"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll(".stats-section .num");
  const cIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const dur = 1500;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          el.textContent = Math.floor(target * (0.5 - Math.cos(Math.PI * p) / 2));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toString();
        };
        requestAnimationFrame(tick);
        cIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => cIO.observe(c));

  /* ---------- Contact form ---------- */
  if (window.emailjs && EMAILJS_PUBLIC_KEY && !EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    const submit = document.getElementById("cf-submit");
    const spinner = document.getElementById("cf-spinner");
    const success = document.getElementById("cf-success");
    const errorEl = document.getElementById("cf-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      success.classList.add("d-none");
      errorEl.classList.add("d-none");

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      spinner.classList.remove("d-none");
      submit.setAttribute("disabled", "disabled");
      try {
        if (!window.emailjs || EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
          await new Promise((r) => setTimeout(r, 800));
          console.warn("EmailJS not configured. Replace placeholder keys in script.js.");
        } else {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            subject: "New Business Inquiry from CloudBoolean Website",
            to_email: "info@cloudboolean.com",
            name: data.name,
            company: data.company || "—",
            email: data.email,
            phone: data.phone,
            service: data.service,
            budget: data.budget,
            message: data.message,
          });
          //Auto Replly
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_AUTO_REPLY, {
            subject: "Thank You for Contacting CloudBoolean Technology",
            to_email: data.email,
            name: data.name,
            company: data.company || "—",
            email: data.email,
            phone: data.phone,
            service: data.service,
            budget: data.budget,
            message: data.message,
          });
        }
        success.classList.remove("d-none");
        form.reset();
        form.classList.remove("was-validated");
      } catch (err) {
        console.error(err);
        errorEl.classList.remove("d-none");
      } finally {
        spinner.classList.add("d-none");
        submit.removeAttribute("disabled");
      }
    });
  }

  /* Newsletter (visual only) */
  const nl = document.getElementById("newsletterForm");
  if (nl) {
    nl.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = nl.querySelector("button");
      btn.textContent = "Subscribed ✓";
      btn.disabled = true;
    });
  }
});
