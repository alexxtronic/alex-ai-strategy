(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  const setMenuState = (open) => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navMenu.dataset.open = String(open);
    document.body.classList.toggle("menu-open", open);
  };

  navToggle?.addEventListener("click", () => {
    setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) setMenuState(false);
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const rotator = document.querySelector("[data-business-rotator]");
  if (rotator) {
    const words = ["SaaS", "enterprise B2B", "scale-up"];
    let index = 0;
    let intervalId;

    const rotate = () => {
      if (document.hidden || reducedMotion.matches) return;
      rotator.classList.add("is-leaving");
      window.setTimeout(() => {
        index = (index + 1) % words.length;
        rotator.textContent = words[index];
        rotator.classList.remove("is-leaving");
        rotator.classList.add("is-entering");
        requestAnimationFrame(() => rotator.classList.remove("is-entering"));
      }, 280);
    };

    const startRotator = () => {
      window.clearInterval(intervalId);
      if (!reducedMotion.matches) intervalId = window.setInterval(rotate, 3600);
    };

    startRotator();
    reducedMotion.addEventListener?.("change", startRotator);
  }

  const animatedSections = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );
    animatedSections.forEach((section) => revealObserver.observe(section));
  } else {
    animatedSections.forEach((section) => section.classList.add("is-visible"));
  }

  const system = document.querySelector("[data-system-demo]");
  const line = document.querySelector("[data-chart-line]");
  const metric = document.querySelector("[data-count-up]");

  const animateMetric = () => {
    if (!metric || reducedMotion.matches) {
      if (metric) metric.textContent = "+18%";
      return;
    }
    const duration = 1100;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      metric.textContent = `+${Math.round(18 * eased)}%`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const activateSystem = () => {
    system?.classList.add("is-running");
    line?.classList.add("is-drawing");
    animateMetric();
  };

  if (system && "IntersectionObserver" in window && !reducedMotion.matches) {
    const systemObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          activateSystem();
          observer.disconnect();
        }
      },
      { threshold: 0.34 }
    );
    systemObserver.observe(system);
  } else {
    activateSystem();
  }
})();

