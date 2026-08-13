const studioProjects = document.querySelectorAll(".studio-project");

if (studioProjects.length) {
  const reduceStudioMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceStudioMotion.matches || !("IntersectionObserver" in window)) {
    studioProjects.forEach(project => project.classList.add("is-visible"));
  } else {
    const studioObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        studioObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    studioProjects.forEach(project => studioObserver.observe(project));
  }
}
