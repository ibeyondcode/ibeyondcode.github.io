(() => {
  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("siteNav");
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const counts = Array.from(document.querySelectorAll(".count"));
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  function toggleHeaderState() {
    if (!header) {
      return;
    }
    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  function closeMenu() {
    if (!menuBtn || !nav) {
      return;
    }
    menuBtn.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }

  function setupMenu() {
    if (!menuBtn || !nav) {
      return;
    }

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  function setupRevealAnimations() {
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => io.observe(el));
  }

  function setupCounters() {
    if (!counts.length) {
      return;
    }

    const seen = new WeakSet();

    const animate = (el) => {
      if (seen.has(el)) {
        return;
      }

      seen.add(el);
      const target = Number(el.dataset.target || 0);
      const duration = 1000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        el.textContent = String(Math.floor(target * progress));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = String(target);
        }
      };

      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counts.forEach(animate);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counts.forEach((el) => io.observe(el));
  }

  function setupSectionHighlight() {
    const sections = navLinks
      .map((link) => {
        const id = link.getAttribute("href");
        if (!id || !id.startsWith("#")) {
          return null;
        }
        const section = document.querySelector(id);
        return section ? { link, section } : null;
      })
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections.forEach(({ link }) => link.classList.remove("active"));
            const match = sections.find(({ section }) => section === entry.target);
            if (match) {
              match.link.classList.add("active");
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(({ section }) => io.observe(section));
  }

  function setupContactForm() {
    if (!contactForm) {
      return;
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const subject = `Institutional AI Inquiry - ${company || "New Lead"}`;
      const body = [
        `Full Name: ${name}`,
        `Company: ${company}`,
        `Work Email: ${email}`,
        "",
        "Use Case:",
        message
      ].join("\n");

      const mailtoUrl = `mailto:info@beyondcode.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (formNote) {
        formNote.textContent = "Draft email opened. If nothing appeared, check your browser email client settings.";
      }
    });
  }

  function bindEvents() {
    window.addEventListener("scroll", toggleHeaderState, { passive: true });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
    document.addEventListener("click", (event) => {
      if (!nav || !menuBtn) {
        return;
      }
      const clickInside = nav.contains(event.target) || menuBtn.contains(event.target);
      if (!clickInside) {
        closeMenu();
      }
    });
  }

  toggleHeaderState();
  setupMenu();
  setupRevealAnimations();
  setupCounters();
  setupSectionHighlight();
  setupContactForm();
  bindEvents();
})();
