const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme || (systemTheme.matches ? "dark" : "light");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeIcon.textContent = isDark ? "☀" : "☾";
}

applyTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("portfolio-theme", newTheme);
  applyTheme(newTheme);
});

systemTheme.addEventListener("change", event => {
  if (!localStorage.getItem("portfolio-theme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll([
  ".hero-copy",
  ".system-card",
  ".about-content",
  ".strengths-content",
  ".projects-heading",
  ".project-tile",
  ".project-note",
  ".case-hero > *",
  ".case-section-heading",
  ".case-body",
  "footer > *"
].join(", "));

function initialiseScrollReveal() {
  if (motionPreference.matches || !("IntersectionObserver" in window)) {
    return;
  }

  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach(element => element.classList.add("reveal-item"));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -8% 0px"
  });

  revealTargets.forEach(element => revealObserver.observe(element));

  motionPreference.addEventListener("change", event => {
    if (event.matches) {
      revealObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    }
  }, { once: true });
}

initialiseScrollReveal();
