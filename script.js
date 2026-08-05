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
