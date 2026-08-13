const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentYear = document.querySelector("[data-current-year]");

if (currentYear) currentYear.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme || (systemTheme.matches ? "dark" : "light");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  themeColor?.setAttribute("content", isDark ? "#0b121c" : "#f5f5f7");
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
  ".atlas-heading",
  ".atlas-shell",
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

  lightbox.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    }
  });

  lightbox.addEventListener("cancel", event => {
    event.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
    lightboxStatus.textContent = "";
    previouslyFocusedElement?.focus();
  });
}

initialiseImageLightbox();

const projectAtlas = document.querySelector("[data-project-atlas]");

function initialiseProjectAtlas() {
  if (!projectAtlas) {
    return;
  }

  const atlasAreas = {
    data: {
      index: "01",
      label: "Data",
      title: "Data that can be questioned, not just displayed.",
      description: "Validated preparation and honest evaluation make the model’s trade-offs visible.",
      skills: ["Python", "pandas", "DuckDB SQL", "scikit-learn", "Streamlit"],
      projects: [
        {
          type: "Documented project",
          title: "Predictive Maintenance Analytics",
          summary: "Synthetic AI4I 2020 data · validated pipeline · imbalanced classification",
          links: [
            ["Open dashboard", "https://abrahamkaunda-predictive-maintenance.streamlit.app/"],
            ["View source", "https://github.com/abrahamkaunda-create/predictive-maintenance-analytics"]
          ]
        }
      ]
    },
    software: {
      index: "02",
      label: "Software",
      title: "Small tools built around clear, testable logic.",
      description: "Reusable logic, validation and testing keep each interface understandable.",
      skills: ["Python", "JavaScript", "HTML/CSS", "Streamlit", "Unit testing"],
      projects: [
        {
          type: "Interactive application",
          title: "Incident Replay Lab",
          summary: "React and TypeScript · deterministic detection rules · replay controls · 27 tests",
          links: [
            ["Read case study", "incident-replay-lab.html"],
            ["Open live lab", "https://abrahamkaunda-create.github.io/incident-replay-lab/"],
            ["View source", "https://github.com/abrahamkaunda-create/incident-replay-lab"]
          ]
        },
        {
          type: "Live application",
          title: "IT Operations Toolkit",
          summary: "IPv4 calculator · log analyser · transparent P1–P4 prioritiser · 30 unit tests",
          links: [
            ["Open toolkit", "https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/"],
            ["View source", "https://github.com/abrahamkaunda-create/it-operations-toolkit"]
          ]
        },
        {
          type: "Web project",
          title: "Personal Portfolio Website",
          summary: "Semantic HTML · responsive CSS · vanilla JavaScript · GitHub Pages",
          links: [
            ["View source", "https://github.com/abrahamkaunda-create/abrahamkaunda-create.github.io"]
          ]
        }
      ]
    },
    systems: {
      index: "03",
      label: "Systems",
      title: "Infrastructure understood through configuration and evidence.",
      description: "Documented labs connect identity, policy and access with practical support work.",
      skills: ["Windows Server", "Active Directory", "Group Policy", "PowerShell", "SMB/NTFS"],
      projects: [
        {
          type: "Event analysis lab",
          title: "Incident Replay Lab",
          summary: "Synthetic Windows events · authentication detections · incident workflow · audit history",
          links: [
            ["Read case study", "incident-replay-lab.html"],
            ["Open live lab", "https://abrahamkaunda-create.github.io/incident-replay-lab/"],
            ["View source", "https://github.com/abrahamkaunda-create/incident-replay-lab"]
          ]
        },
        {
          type: "Evidence-led case study",
          title: "Windows Active Directory Lab",
          summary: "AD DS · DNS · Group Policy · role-based file access · PowerShell provisioning",
          links: [
            ["Review evidence", "windows-ad-lab.html"],
            ["View source", "https://github.com/abrahamkaunda-create/windows-ad-lab"]
          ]
        },
        {
          type: "Support application",
          title: "IT Operations Toolkit",
          summary: "Reusable support utilities · input validation · deterministic outputs · unit testing",
          links: [
            ["Open toolkit", "https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/"]
          ]
        }
      ]
    },
    networking: {
      index: "04",
      label: "Networking",
      title: "Network behaviour traced from addressing to policy.",
      description: "Addressing, services and access controls are connected through practical tests.",
      skills: ["TCP/IP", "DNS/DHCP", "NAT", "pfSense", "Firewall policy"],
      projects: [
        {
          type: "Security simulation",
          title: "Incident Replay Lab",
          summary: "Synthetic pfSense events · scan detection · firewall anomaly · explainable severity",
          links: [
            ["Read case study", "incident-replay-lab.html"],
            ["Open live lab", "https://abrahamkaunda-create.github.io/incident-replay-lab/"],
            ["View source", "https://github.com/abrahamkaunda-create/incident-replay-lab"]
          ]
        },
        {
          type: "Evidence-led case study",
          title: "pfSense Network Security Lab",
          summary: "DHCP · DNS · NAT · firewall policy · multi-WAN · WireGuard retrospective",
          links: [
            ["Review evidence", "pfsense-project.html"]
          ]
        },
        {
          type: "Networking utility",
          title: "IPv4 Subnet Calculator",
          summary: "CIDR validation · network and broadcast addresses · usable host ranges · edge cases",
          links: [
            ["Open toolkit", "https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/"],
            ["View source", "https://github.com/abrahamkaunda-create/it-operations-toolkit"]
          ]
        }
      ]
    }
  };

  const nodes = [...projectAtlas.querySelectorAll("[data-atlas-node]")];
  const connectors = [...projectAtlas.querySelectorAll("[data-atlas-connector]")];
  const detail = projectAtlas.querySelector(".atlas-detail");
  const status = projectAtlas.querySelector("[data-atlas-status]");
  const domain = projectAtlas.querySelector("[data-atlas-domain]");
  const title = projectAtlas.querySelector("[data-atlas-title]");
  const description = projectAtlas.querySelector("[data-atlas-description]");
  const skills = projectAtlas.querySelector("[data-atlas-skills]");
  const projects = projectAtlas.querySelector("[data-atlas-projects]");

  function createAtlasLink(label, href) {
    const link = document.createElement("a");
    const arrow = document.createElement("span");

    link.href = href;
    link.append(document.createTextNode(`${label} `));
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.appendChild(arrow);

    if (/^https?:/i.test(href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    return link;
  }

  function renderAtlasArea(areaName) {
    const area = atlasAreas[areaName];

    nodes.forEach(node => {
      const isActive = node.dataset.atlasNode === areaName;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    connectors.forEach(connector => {
      connector.classList.toggle("is-active", connector.dataset.atlasConnector === areaName);
    });

    status.textContent = `${area.label} selected`;
    domain.textContent = `${area.index} / ${area.label}`;
    title.textContent = area.title;
    description.textContent = area.description;

    skills.replaceChildren(...area.skills.map(skill => {
      const item = document.createElement("span");
      item.textContent = skill;
      return item;
    }));

    projects.replaceChildren(...area.projects.map((project, index) => {
      const article = document.createElement("article");
      const projectType = document.createElement("p");
      const projectTitle = document.createElement("h4");
      const projectSummary = document.createElement("span");
      const projectLinks = document.createElement("div");

      projectType.textContent = `${String(index + 1).padStart(2, "0")} / ${project.type}`;
      projectTitle.textContent = project.title;
      projectSummary.textContent = project.summary;
      projectLinks.className = "atlas-links";
      projectLinks.replaceChildren(...project.links.map(link => createAtlasLink(link[0], link[1])));
      article.append(projectType, projectTitle, projectSummary, projectLinks);
      return article;
    }));

    if (!motionPreference.matches) {
      detail.classList.remove("is-switching");
      void detail.offsetWidth;
      detail.classList.add("is-switching");
    }
  }

  nodes.forEach((node, index) => {
    node.addEventListener("click", () => renderAtlasArea(node.dataset.atlasNode));
    node.addEventListener("keydown", event => {
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 :
        ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 0;

      if (!direction && !["Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const targetIndex = event.key === "Home" ? 0 :
        event.key === "End" ? nodes.length - 1 :
          (index + direction + nodes.length) % nodes.length;
      nodes[targetIndex].focus();
      nodes[targetIndex].click();
    });
  });

  detail.addEventListener("animationend", () => detail.classList.remove("is-switching"));
}

initialiseProjectAtlas();
