(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;

  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  const header = document.getElementById("top-header");
  const skillsCanvas = document.getElementById("skillsCanvas");
  const skillsCenter = document.getElementById("skillsCenter");
  const carousels = Array.from(document.querySelectorAll("[data-carousel]"));
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = gsap.utils.toArray(".section");
  const carouselAnchorMap = new Map();
  let lastY = window.scrollY;

  const updateHeaderState = () => {
    const currentY = window.scrollY;

    if (header) {
      header.classList.toggle("is-scrolled", currentY > 34);

      if (window.innerWidth > 820) {
        const scrollingDown = currentY > lastY;
        header.classList.toggle("is-hidden", scrollingDown && currentY > 220);
      } else {
        header.classList.remove("is-hidden");
      }
    }

    lastY = currentY;
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  const getHeaderOffset = () => {
    return header ? header.offsetHeight + 12 : 88;
  };

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    link.addEventListener("click", (event) => {
      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      event.preventDefault();
      const carouselTarget = carouselAnchorMap.get(targetId);
      const scrollTarget = carouselTarget ? carouselTarget.section : target;

      if (carouselTarget) {
        carouselTarget.moveTo();
      }

      if (lenis) {
        lenis.scrollTo(scrollTarget, {
          offset: -getHeaderOffset(),
          duration: 1.1
        });
      } else {
        const top = scrollTarget.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
        window.scrollTo({ top, behavior: "smooth" });
      }
    });

    ScrollTrigger.create({
      trigger: target,
      start: "top 45%",
      end: "bottom 45%",
      onEnter: () => setActiveNav(targetId),
      onEnterBack: () => setActiveNav(targetId)
    });
  });

  function setActiveNav(activeId) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === activeId);
    });
  }

  gsap.to(".blob-1", {
    xPercent: 7,
    yPercent: -6,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".blob-2", {
    xPercent: -6,
    yPercent: 8,
    duration: 21,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".blob-3", {
    xPercent: 5,
    yPercent: -7,
    duration: 23,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.utils.toArray(".parallax").forEach((shape) => {
    const depth = Number(shape.dataset.depth || 10);

    gsap.to(shape, {
      yPercent: -depth,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.15
      }
    });
  });

  initializeRibbonProgress();
  initializeSolutionCarousels();
  initializeSkillsCanvas();

  sections.forEach((section) => {
    const isReverse = section.classList.contains("reverse");
    const main = section.querySelector(".section-main");
    const side = section.querySelector(".section-side");
    const staggered = section.querySelectorAll(".stagger");

    ScrollTrigger.create({
      trigger: section,
      start: "top 68%",
      end: "bottom 35%",
      onEnter: () => section.classList.add("is-active"),
      onLeave: () => section.classList.remove("is-active"),
      onEnterBack: () => section.classList.add("is-active"),
      onLeaveBack: () => section.classList.remove("is-active")
    });

    if (main) {
      gsap.from(main, {
        x: isReverse ? 38 : -38,
        autoAlpha: 0,
        duration: 0.92,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (side) {
      gsap.from(side, {
        x: isReverse ? -38 : 38,
        autoAlpha: 0,
        duration: 0.92,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%"
        }
      });
    }

    if (staggered.length) {
      gsap.from(staggered, {
        y: 20,
        autoAlpha: 0,
        duration: 0.62,
        stagger: 0.038,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 82%"
        }
      });
    }

    const flowPath = section.querySelectorAll(".flow-svg path");

    flowPath.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        }
      });
    });
  });

  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const state = { value: 0 };

    counter.textContent = `0${suffix}`;

    gsap.to(state, {
      value: target,
      duration: 1.65,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = `${Math.floor(state.value)}${suffix}`;
      },
      onComplete: () => {
        counter.textContent = `${target}${suffix}`;
      },
      scrollTrigger: {
        trigger: counter.closest(".section") || counter,
        start: "top 78%",
        once: true
      }
    });
  });

  document.querySelectorAll(".metric-bar").forEach((metricBar) => {
    const fill = metricBar.querySelector("span");
    const progress = Number(metricBar.dataset.progress || 0);

    if (!fill) {
      return;
    }

    gsap.to(fill, {
      width: `${Math.max(0, Math.min(100, progress))}%`,
      duration: 1.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: metricBar.closest(".section") || metricBar,
        start: "top 80%",
        once: true
      }
    });
  });

  function initializeRibbonProgress() {
    document.querySelectorAll(".ribbon-progress").forEach((ring) => {
      const target = Math.max(0, Math.min(100, Number(ring.dataset.progress || 0)));
      const state = { value: 0 };
      ring.style.setProperty("--progress", "0%");

      gsap.to(state, {
        value: target,
        duration: 1.15,
        ease: "power2.out",
        onUpdate: () => {
          ring.style.setProperty("--progress", `${state.value}%`);
        },
        scrollTrigger: {
          trigger: ring.closest(".section") || ring,
          start: "top 82%",
          once: true
        }
      });
    });
  }

  function initializeSolutionCarousels() {
    carousels.forEach((carousel) => {
      const track = carousel.querySelector(".carousel-track");
      const cards = Array.from(carousel.querySelectorAll(".solution-card"));
      const prevBtn = carousel.querySelector(".carousel-arrow.prev");
      const nextBtn = carousel.querySelector(".carousel-arrow.next");
      let index = 0;
      let timer = null;

      if (!track || cards.length <= 1) {
        if (prevBtn) {
          prevBtn.style.display = "none";
        }
        if (nextBtn) {
          nextBtn.style.display = "none";
        }
        return;
      }

      const move = (nextIndex) => {
        index = (nextIndex + cards.length) % cards.length;
        track.style.transform = `translateX(-${index * 100}%)`;
      };

      cards.forEach((card, cardIndex) => {
        if (card.id) {
          carouselAnchorMap.set(`#${card.id}`, {
            section: carousel.closest(".section") || card,
            moveTo: () => move(cardIndex)
          });
        }
      });

      const stop = () => {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
      };

      const start = () => {
        stop();
        timer = window.setInterval(() => {
          move(index + 1);
        }, 4200);
      };

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          move(index - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          move(index + 1);
        });
      }

      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);
      carousel.addEventListener("focusin", stop);
      carousel.addEventListener("focusout", start);
      carousel.addEventListener("pointerdown", stop);
      carousel.addEventListener("pointerup", start);

      start();

      if (window.location.hash) {
        const hashTarget = carouselAnchorMap.get(window.location.hash);
        if (hashTarget) {
          hashTarget.moveTo();
        }
      }
    });
  }

  function initializeSkillsCanvas() {
    if (!skillsCanvas || !skillsCenter) {
      return;
    }

    const iconPool = [
      "assets/images/icon-intelligence.svg",
      "assets/images/icon-automation.svg",
      "assets/images/icon-infrastructure.svg",
      "assets/images/icon-leadership.svg"
    ];
    const defaultLabel = skillsCenter.textContent.trim();
    const techSkills = [
      "Python",
      "Django",
      "Flask",
      "PyTorch AI infrastructure",
      "MongoDB",
      "Elasticsearch",
      "Vector database infrastructure",
      "Docker",
      "Kubernetes",
      "AWS Cloud Infrastructure",
      "AWS S3",
      "AWS Lambda",
      "Google Cloud Platform",
      "Redis"
    ];
    const uniqueSkills = Array.from(new Set(techSkills));
    let floatingTweens = [];
    let resizeTimer = null;

    if (!uniqueSkills.length) {
      return;
    }

    const shuffle = (input) => {
      const arr = input.slice();
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const setCenter = (label) => {
      skillsCenter.textContent = label;
      gsap.fromTo(skillsCenter, { autoAlpha: 0.45 }, { autoAlpha: 1, duration: 0.2, overwrite: true });
    };

    const clearCenter = () => {
      skillsCenter.textContent = defaultLabel;
    };

    const renderCards = () => {
      floatingTweens.forEach((tween) => tween.kill());
      floatingTweens = [];
      skillsCanvas.querySelectorAll(".skill-card").forEach((card) => card.remove());
      clearCenter();

      const rect = skillsCanvas.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 260);
      const cardW = window.innerWidth <= 480 ? 124 : window.innerWidth <= 820 ? 136 : 164;
      const cardH = window.innerWidth <= 480 ? 44 : 48;
      const maxCards = Math.max(10, Math.floor((width * height) / (cardW * cardH * 2.25)));
      const names = shuffle(uniqueSkills).slice(0, Math.min(uniqueSkills.length, maxCards));
      const placed = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const centerRadius = Math.min(width, height) * 0.18;
      const spacing = Math.max(86, Math.min(154, cardW * 0.76));

      names.forEach((skill, index) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "skill-card";
        card.dataset.skill = skill;
        card.innerHTML = `<img src="${iconPool[index % iconPool.length]}" alt="" aria-hidden="true"><span>${skill}</span>`;

        let x = 0;
        let y = 0;
        let found = false;

        for (let attempt = 0; attempt < 220; attempt += 1) {
          x = Math.random() * (width - cardW);
          y = Math.random() * (height - cardH);
          const cx = x + cardW / 2;
          const cy = y + cardH / 2;
          const awayFromCenter = Math.hypot(cx - centerX, cy - centerY) > centerRadius;
          const awayFromOthers = placed.every((point) => Math.hypot(point.x - cx, point.y - cy) > spacing);

          if (awayFromCenter && awayFromOthers) {
            found = true;
            break;
          }
        }

        if (!found) {
          const cols = Math.max(2, Math.floor(width / (cardW + 18)));
          const col = index % cols;
          const row = Math.floor(index / cols);
          x = 12 + col * ((width - cardW - 24) / Math.max(cols - 1, 1));
          y = 14 + row * (cardH + 10);
        }

        placed.push({ x: x + cardW / 2, y: y + cardH / 2 });
        card.style.left = `${Math.max(4, Math.min(x, width - cardW - 4))}px`;
        card.style.top = `${Math.max(4, Math.min(y, height - cardH - 4))}px`;
        gsap.set(card, { rotate: gsap.utils.random(-8, 8, 0.1) });

        card.addEventListener("mouseenter", () => {
          setCenter(skill);
          card.classList.add("is-active");
        });
        card.addEventListener("mouseleave", () => {
          clearCenter();
          card.classList.remove("is-active");
        });
        card.addEventListener("focus", () => setCenter(skill));
        card.addEventListener("blur", () => clearCenter());
        card.addEventListener("click", () => {
          setCenter(skill);
          card.classList.add("is-active");
          window.setTimeout(() => card.classList.remove("is-active"), 700);
        });

        skillsCanvas.appendChild(card);

        floatingTweens.push(
          gsap.to(card, {
            x: gsap.utils.random(-11, 11, 0.1),
            y: gsap.utils.random(-10, 10, 0.1),
            duration: gsap.utils.random(3.2, 6, 0.1),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: gsap.utils.random(0, 1.5, 0.1)
          })
        );
      });
    };

    renderCards();
    skillsCanvas.addEventListener("mouseleave", clearCenter);
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(renderCards, 220);
    });
  }
})();
