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
    const words = ["SaaS", "Enterprise B2B", "Scale-Ups"];
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const width = Math.max(...words.map((word) => word.length));
    const flipDuration = 96;
    const stagger = 34;
    const flipsPerCharacter = 4;
    let currentPhrase = words[0].padEnd(width, " ");
    let index = 0;
    let cycleTimer;
    let animationTimers = [];

    const normalizePhrase = (phrase) => phrase.padEnd(width, " ").slice(0, width);
    const randomCharacter = () => charset[Math.floor(Math.random() * charset.length)];

    const renderTiles = (phrase) => {
      rotator.replaceChildren();
      phrase.split("").forEach((character) => {
        const tile = document.createElement("span");
        tile.className = "split-flap-text__tile";
        tile.setAttribute("aria-hidden", "true");
        tile.innerHTML = `<span class="split-flap-text__half split-flap-text__half--top"><span class="split-flap-text__char">${character === " " ? "&nbsp;" : character}</span></span><span class="split-flap-text__half split-flap-text__half--bottom"><span class="split-flap-text__char">${character === " " ? "&nbsp;" : character}</span></span>`;
        rotator.appendChild(tile);
      });
    };

    const updateTile = (tile, currentCharacter, nextCharacter, finalStep) => {
      const current = currentCharacter === " " ? "&nbsp;" : currentCharacter;
      const next = nextCharacter === " " ? "&nbsp;" : nextCharacter;
      tile.innerHTML = `<span class="split-flap-text__half split-flap-text__half--top"><span class="split-flap-text__char">${current}</span></span><span class="split-flap-text__half split-flap-text__half--bottom"><span class="split-flap-text__char">${next}</span></span>${finalStep ? "" : `<span class="split-flap-text__flap split-flap-text__flap--front"><span class="split-flap-text__char">${current}</span></span><span class="split-flap-text__flap split-flap-text__flap--back"><span class="split-flap-text__char">${next}</span></span>`}`;
    };

    const animateTo = (nextWord) => {
      const targetPhrase = normalizePhrase(nextWord);
      const tiles = [...rotator.children];

      targetPhrase.split("").forEach((targetCharacter, characterIndex) => {
        const fromCharacter = currentPhrase[characterIndex];
        if (fromCharacter === targetCharacter) return;
        const sequence = Array.from({ length: flipsPerCharacter }, randomCharacter).concat(targetCharacter);

        sequence.forEach((nextCharacter, stepIndex) => {
          const timer = window.setTimeout(() => {
            const currentCharacter = stepIndex === 0 ? fromCharacter : sequence[stepIndex - 1];
            const finalStep = stepIndex === sequence.length - 1;
            updateTile(tiles[characterIndex], finalStep ? targetCharacter : currentCharacter, nextCharacter, finalStep);
          }, characterIndex * stagger + stepIndex * flipDuration);
          animationTimers.push(timer);
        });
      });

      currentPhrase = targetPhrase;
    };

    const scheduleRotator = () => {
      window.clearTimeout(cycleTimer);
      if (reducedMotion.matches) {
        currentPhrase = normalizePhrase(words[0]);
        renderTiles(currentPhrase);
        return;
      }
      cycleTimer = window.setTimeout(() => {
        index = (index + 1) % words.length;
        animateTo(words[index]);
        scheduleRotator();
      }, 3600);
    };

    const restartRotator = () => {
      window.clearTimeout(cycleTimer);
      animationTimers.forEach(window.clearTimeout);
      animationTimers = [];
      index = 0;
      currentPhrase = normalizePhrase(words[0]);
      renderTiles(currentPhrase);
      scheduleRotator();
    };

    renderTiles(currentPhrase);
    scheduleRotator();
    reducedMotion.addEventListener?.("change", restartRotator);
  }

  const vertexShader = `#version 300 es
    in vec2 aPosition;
    void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
  `;

  const fragmentShader = `#version 300 es
    precision highp float;
    uniform vec2 uCenter;
    uniform vec2 uHalfSize;
    uniform float uRadius;
    uniform float uAngle;
    uniform float uPx;
    uniform float uIntensity;
    out vec4 fragColor;

    float roundedRect(vec2 point, vec2 bounds, float radius) {
      vec2 offset = abs(point) - bounds + radius;
      return length(max(offset, 0.0)) + min(max(offset.x, offset.y), 0.0) - radius;
    }

    void main() {
      vec2 point = gl_FragCoord.xy - uCenter;
      float distanceToEdge = roundedRect(point, uHalfSize, uRadius);
      vec2 light = vec2(cos(uAngle), sin(uAngle));
      vec2 normal = normalize(point / (uHalfSize * uHalfSize) + 1e-6);
      float phi = acos(clamp(abs(dot(normal, light)), 0.0, 1.0));
      float rim = 1.0 - smoothstep(0.08, 0.86, phi);
      float edge = exp(-pow(distanceToEdge / (1.05 * uPx), 2.0));
      float clampToEdge = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(distanceToEdge));
      float base = (1.0 - smoothstep(0.0, uPx, abs(distanceToEdge))) * 0.3;
      float highlight = edge * rim * clampToEdge * uIntensity;
      vec3 color = vec3(0.23, 0.30, 0.48) * base + vec3(0.82, 0.88, 1.0) * highlight;
      fragColor = vec4(color, clamp(base + highlight, 0.0, 1.0));
    }
  `;

  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  document.querySelectorAll(".button--specular").forEach((button) => {
    const effect = button.querySelector(".button__fx");
    if (!effect || reducedMotion.matches) return;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;
    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program);

    const center = gl.getUniformLocation(program, "uCenter");
    const halfSize = gl.getUniformLocation(program, "uHalfSize");
    const radius = gl.getUniformLocation(program, "uRadius");
    const angleUniform = gl.getUniformLocation(program, "uAngle");
    const pixelRatioUniform = gl.getUniformLocation(program, "uPx");
    const intensity = gl.getUniformLocation(program, "uIntensity");
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let width = 1;
    let height = 1;

    const resize = () => {
      const rect = button.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.ceil((width + 40) * pixelRatio);
      canvas.height = Math.ceil((height + 40) * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(center, (20 + width / 2) * pixelRatio, (20 + height / 2) * pixelRatio);
      gl.uniform2f(halfSize, (width / 2) * pixelRatio, (height / 2) * pixelRatio);
      gl.uniform1f(radius, Math.min(11, height / 2) * pixelRatio);
      gl.uniform1f(pixelRatioUniform, pixelRatio);
    };

    effect.appendChild(canvas);
    button.classList.add("has-webgl-specular");
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(button);
    resize();
    let started = performance.now();

    const render = (now) => {
      if (!document.hidden) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(angleUniform, 2.4 + ((now - started) / 1000) * 0.36);
        gl.uniform1f(intensity, 1.35);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);
  });

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
  let typingReport = document.querySelector("[data-typing-report]");
  if (!typingReport) {
    const legacyDraft = document.querySelector(".draft-copy");
    if (legacyDraft) {
      typingReport = document.createElement("p");
      typingReport.className = "typing-report";
      typingReport.dataset.typingReport = "";
      legacyDraft.dataset.buildReport = "typing-v2";
      legacyDraft.replaceChildren(typingReport);
    }
  }
  const reportCopy = [
    "Content Strategy",
    "Email Workflow Automation",
    "Q2 Strategy Report",
  ].join("\n");
  let reportStarted = false;

  const animateReport = () => {
    if (!typingReport || reportStarted) return;
    reportStarted = true;

    if (reducedMotion.matches) {
      typingReport.textContent = reportCopy;
      return;
    }

    let characterIndex = 0;
    const typeNextCharacter = () => {
      typingReport.textContent = reportCopy.slice(0, characterIndex + 1);
      const character = reportCopy[characterIndex];
      characterIndex += 1;

      if (characterIndex < reportCopy.length) {
        const delay = character === "." ? 170 : character === "\n" ? 90 : 28 + Math.random() * 24;
        window.setTimeout(typeNextCharacter, delay);
        return;
      }

      window.setTimeout(() => {
        characterIndex = 0;
        typeNextCharacter();
      }, 2400);
    };

    typeNextCharacter();
  };

  animateReport();

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
    animateReport();
  };

  if (system && "IntersectionObserver" in window && !reducedMotion.matches) {
    const systemObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          activateSystem();
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    systemObserver.observe(system);
  } else {
    activateSystem();
  }

  const threeExperience = document.querySelector("[data-three-experience]");
  if (threeExperience) {
    let requested = false;
    const loadExperience = () => {
      if (requested) return;
      requested = true;
      import("./three-capability.bundle.js?v=20260820-5").catch(() => {
        threeExperience.classList.add("has-three-error");
      });
    };

    if ("IntersectionObserver" in window) {
      const threeObserver = new IntersectionObserver(
        (entries, observer) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          loadExperience();
          observer.disconnect();
        },
        { rootMargin: "600px 0px", threshold: 0.01 }
      );
      threeObserver.observe(threeExperience);
    } else {
      loadExperience();
    }
  }
})();
