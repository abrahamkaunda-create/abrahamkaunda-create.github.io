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

const caseStudyImages = document.querySelectorAll(".case-figure img");

function initialiseImageLightbox() {
  if (!caseStudyImages.length || typeof HTMLDialogElement === "undefined") {
    return;
  }

  const lightbox = document.createElement("dialog");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-label", "Expanded project image");
  lightbox.innerHTML = `
    <div class="image-lightbox-shell">
      <div class="image-lightbox-toolbar">
        <span class="image-lightbox-title">Project evidence</span>
        <div class="image-lightbox-controls" aria-label="Image controls">
          <button type="button" data-lightbox-zoom-out aria-label="Zoom out">−</button>
          <button type="button" data-lightbox-reset aria-label="Reset zoom">100%</button>
          <button type="button" data-lightbox-zoom-in aria-label="Zoom in">+</button>
          <button class="image-lightbox-close" type="button" data-lightbox-close aria-label="Close image viewer">×</button>
        </div>
      </div>
      <div class="image-lightbox-stage">
        <div class="image-lightbox-canvas">
          <img class="image-lightbox-image" alt="">
        </div>
      </div>
      <p class="image-lightbox-caption"></p>
      <span class="image-lightbox-status" aria-live="polite"></span>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxStage = lightbox.querySelector(".image-lightbox-stage");
  const lightboxCanvas = lightbox.querySelector(".image-lightbox-canvas");
  const lightboxImage = lightbox.querySelector(".image-lightbox-image");
  const lightboxCaption = lightbox.querySelector(".image-lightbox-caption");
  const lightboxStatus = lightbox.querySelector(".image-lightbox-status");
  const resetButton = lightbox.querySelector("[data-lightbox-reset]");
  const zoomOutButton = lightbox.querySelector("[data-lightbox-zoom-out]");
  const zoomInButton = lightbox.querySelector("[data-lightbox-zoom-in]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");

  let zoomLevel = 1;
  let previouslyFocusedElement = null;

  function updateZoom(nextZoom, announce = true) {
    zoomLevel = Math.min(4, Math.max(1, nextZoom));
    const percentage = Math.round(zoomLevel * 100);

    lightboxCanvas.style.setProperty("--image-zoom", zoomLevel);
    resetButton.textContent = `${percentage}%`;
    zoomOutButton.disabled = zoomLevel === 1;
    zoomInButton.disabled = zoomLevel === 4;

    if (announce) {
      lightboxStatus.textContent = `Image zoom ${percentage} percent`;
    }
  }

  function openLightbox(image) {
    const figure = image.closest(".case-figure");
    const caption = figure?.querySelector("figcaption")?.textContent.trim() || image.alt;

    previouslyFocusedElement = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption;
    updateZoom(1, false);
    lightboxStage.scrollTo(0, 0);
    document.body.classList.add("lightbox-open");
    lightbox.showModal();
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.close();
  }

  caseStudyImages.forEach(image => {
    const figure = image.closest(".case-figure");
    const caption = figure?.querySelector("figcaption")?.textContent.trim();
    const label = caption ? `Open larger image: ${caption}` : "Open larger project image";

    figure?.classList.add("lightbox-enabled");
    image.classList.add("lightbox-trigger");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", label);

    image.addEventListener("click", () => openLightbox(image));
    image.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  zoomOutButton.addEventListener("click", () => updateZoom(zoomLevel - 0.25));
  zoomInButton.addEventListener("click", () => updateZoom(zoomLevel + 0.25));
  resetButton.addEventListener("click", () => {
    updateZoom(1);
    lightboxStage.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  closeButton.addEventListener("click", closeLightbox);

  lightboxStage.addEventListener("wheel", event => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    event.preventDefault();
    updateZoom(zoomLevel + (event.deltaY < 0 ? 0.25 : -0.25));
  }, { passive: false });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxStatus.textContent = "";
    previouslyFocusedElement?.focus();
  });
}

initialiseImageLightbox();
