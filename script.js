(() => {
  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("siteNav");
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const counts = Array.from(document.querySelectorAll(".count"));
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const i18nEls = Array.from(document.querySelectorAll("[data-i18n]"));
  const metaDescription = document.querySelector('meta[name="description"]');

  const translations = {
    en: {
      metaTitle: "Beyond Code | AI Operational Intelligence Infrastructure",
      metaDescription: "Beyond Code builds AI operational intelligence infrastructure for institutional execution, reporting automation, and faster decisions.",
      brand: { name: "Beyond Code" },
      nav: {
        menu: "Menu",
        about: "About",
        challenge: "Challenge",
        solutions: "Solutions",
        capabilities: "Capabilities",
        process: "Process",
        security: "Security",
        leadership: "Leadership",
        contact: "Contact"
      },
      hero: {
        eyebrow: "What Beyond Code Does",
        title: "Beyond Code builds AI infrastructure for operational execution.",
        lead: "We design operational intelligence systems for institutions to automate reporting, improve visibility, and accelerate executive decision-making.",
        ctaSolutions: "Explore Solutions",
        ctaContact: "Talk to Us",
        ctaDownload: "Download Company Profile (PDF)"
      },
      metric: {
        title: "Operational Results",
        decisionLabel: "Decision preparation time",
        decisionSuffix: "% faster",
        infoLabel: "Information retrieval time",
        infoSuffix: "% faster",
        reportLabel: "Reporting preparation time",
        reportSuffix: "% reduction",
        speedLabel: "Report generation speed",
        speedSuffix: "x increase"
      },
      about: {
        eyebrow: "Who We Are",
        title: "Beyond Code bridges AI ambition and operational reality.",
        body: "We solve the execution gap inside institutions where AI initiatives launch without workflow redesign, governance alignment, or measurable impact.",
        cardTitle: "Built for institutional environments",
        item1: "Workflow-integrated AI systems, not isolated demos",
        item2: "Deployment models aligned to data ownership and security",
        item3: "Operationally grounded architecture for long-term reliability",
        item4: "Measurable impact from day one"
      },
      challenge: {
        eyebrow: "Market Reality",
        title: "The blocker is execution intelligence, not technology access.",
        item1: "Digital tools launched without workflow redesign",
        item2: "Dashboards deployed without governance logic",
        item3: "AI features added without impact accountability",
        item4: "Manual reporting persists despite automation spend"
      },
      solutions: {
        eyebrow: "Solutions",
        title: "Two systems designed to transform execution quality.",
        s1Title: "System 1: Agentic Institutional Intelligence",
        s1Body: "A decision-support layer that connects operations, context, and priorities for faster leadership response.",
        s1Item1: "Reduced manual operational retrieval by 70-90%",
        s1Item2: "Improved institutional responsiveness by up to 60%",
        s1Item3: "Shift from delayed reports to real-time visibility",
        s2Title: "System 2: Policy-Linked Reporting Intelligence",
        s2Body: "An automated reporting framework aligned with institutional policy, compliance, and governance requirements.",
        s2Item1: "Reduced reporting workload by up to 85%",
        s2Item2: "Cut preparation time by up to 80%",
        s2Item3: "Increased generation speed up to 15x"
      },
      cap: {
        eyebrow: "Core Capabilities",
        title: "Architecture, intelligence, automation, and deployment.",
        c1Title: "Intelligence Systems",
        c1Body: "LLM/ML-powered analysis, forecasting, and workflow-aware assistants.",
        c2Title: "Operational Control",
        c2Body: "Real-time monitoring, internal dashboards, and knowledge intelligence systems.",
        c3Title: "Execution Automation",
        c3Body: "Automated reporting, retrieval, and workflow-integrated AI operations.",
        c4Title: "Deployment Models",
        c4Body: "Private cloud, on-premise, and hybrid setups with institution-owned data."
      },
      process: {
        eyebrow: "Delivery Process",
        title: "A four-stage execution model for reliable adoption.",
        p1Title: "Diagnose",
        p1Body: "Assess workflows, reporting structures, and execution gaps.",
        p2Title: "Structure",
        p2Body: "Design architecture, governance logic, and decision pathways.",
        p3Title: "Engineer",
        p3Body: "Build AI systems and intelligence infrastructure around operations.",
        p4Title: "Deploy",
        p4Body: "Integrate, configure, and operationalize with measurable adoption KPIs."
      },
      security: {
        eyebrow: "Security and Ownership",
        title: "Infrastructure control remains with the institution.",
        ownsTitle: "Institution Owns",
        owns1: "Infrastructure and hosting environment",
        owns2: "Institutional systems and access controls",
        owns3: "All institutional data and records",
        owns4: "Deployment model choice: private cloud, on-premise, hybrid",
        providesTitle: "Beyond Code Provides",
        provides1: "AI software architecture and intelligence layers",
        provides2: "System configuration and deployment support",
        provides3: "Operational hardening and governance alignment",
        provides4: "Continuous improvements and maintenance"
      },
      leadership: {
        eyebrow: "Leadership",
        tech: "Technology",
        ceoRole: "Founder & Chief Executive Officer",
        ceoDesc: "Operational Intelligence and Systems Strategist",
        ctoRole: "Chief Technology Officer",
        ctoDesc: "Intelligent Systems and AI Infrastructure Architect"
      },
      contact: {
        eyebrow: "Contact",
        title: "Let’s design your institutional AI execution layer.",
        name: "Full Name",
        company: "Company",
        email: "Work Email",
        usecase: "Use Case",
        submit: "Send Inquiry",
        note: "This opens your email app and prepares a message to our team.",
        location: "Beyond Code, Abu Dhabi, UAE"
      },
      footer: {
        name: "Beyond Code",
        tagline: "AI operational intelligence infrastructure for institutional execution and reporting automation."
      },
      mail: {
        subject: "Institutional AI Inquiry",
        name: "Full Name",
        company: "Company",
        email: "Work Email",
        usecase: "Use Case",
        success: "Draft email opened. If nothing appeared, check your browser email client settings."
      }
    },
    ar: {
      metaTitle: "Beyond Code | بنية ذكاء تشغيلي مدعومة بالذكاء الاصطناعي",
      metaDescription: "تطوّر Beyond Code بنية ذكاء تشغيلي للمؤسسات لتسريع التنفيذ، أتمتة التقارير، ودعم اتخاذ القرار.",
      brand: { name: "Beyond Code" },
      nav: {
        menu: "القائمة",
        about: "من نحن",
        challenge: "التحدي",
        solutions: "الحلول",
        capabilities: "القدرات",
        process: "المنهجية",
        security: "الأمان",
        leadership: "القيادة",
        contact: "تواصل"
      },
      hero: {
        eyebrow: "ماذا تقدّم Beyond Code",
        title: "Beyond Code تبني بنية ذكاء اصطناعي لتنفيذ العمليات.",
        lead: "نصمم أنظمة ذكاء تشغيلي للمؤسسات لأتمتة التقارير، رفع مستوى الرؤية التشغيلية، وتسريع قرارات الإدارة التنفيذية.",
        ctaSolutions: "استعراض الحلول",
        ctaContact: "تواصل معنا",
        ctaDownload: "تحميل ملف الشركة (PDF)"
      },
      metric: {
        title: "نتائج تشغيلية",
        decisionLabel: "وقت تجهيز القرار",
        decisionSuffix: "% أسرع",
        infoLabel: "وقت استرجاع المعلومات",
        infoSuffix: "% أسرع",
        reportLabel: "وقت إعداد التقارير",
        reportSuffix: "% انخفاض",
        speedLabel: "سرعة إنشاء التقارير",
        speedSuffix: "x زيادة"
      },
      about: {
        eyebrow: "من نحن",
        title: "Beyond Code تربط طموح الذكاء الاصطناعي بالواقع التشغيلي.",
        body: "نحل فجوة التنفيذ داخل المؤسسات عندما تُطلق مبادرات الذكاء الاصطناعي بدون إعادة تصميم سير العمل أو مواءمة الحوكمة أو قياس أثر واضح.",
        cardTitle: "مبنيّة لبيئات المؤسسات",
        item1: "أنظمة ذكاء اصطناعي مدمجة في سير العمل وليست عروضاً منفصلة",
        item2: "نماذج نشر متوافقة مع ملكية البيانات والأمان",
        item3: "هندسة تشغيلية موثوقة للاستدامة على المدى الطويل",
        item4: "أثر قابل للقياس منذ اليوم الأول"
      },
      challenge: {
        eyebrow: "واقع السوق",
        title: "العائق هو ذكاء التنفيذ وليس توفر التقنية.",
        item1: "إطلاق أدوات رقمية بدون إعادة تصميم سير العمل",
        item2: "تطبيق لوحات معلومات بدون منطق حوكمة",
        item3: "إضافة خصائص ذكاء اصطناعي بدون مساءلة أثر",
        item4: "استمرار التقارير اليدوية رغم الإنفاق على الأتمتة"
      },
      solutions: {
        eyebrow: "الحلول",
        title: "نظامان مصممان لرفع جودة التنفيذ.",
        s1Title: "النظام 1: ذكاء مؤسسي وكيل",
        s1Body: "طبقة دعم قرار تربط العمليات والسياق والأولويات لتسريع استجابة القيادات.",
        s1Item1: "تقليل الاسترجاع التشغيلي اليدوي بنسبة 70-90%",
        s1Item2: "تحسين استجابة المؤسسة حتى 60%",
        s1Item3: "الانتقال من التقارير المتأخرة إلى رؤية لحظية",
        s2Title: "النظام 2: ذكاء تقارير مرتبط بالسياسات",
        s2Body: "إطار تقارير مؤتمت متوافق مع السياسات المؤسسية والامتثال والحوكمة.",
        s2Item1: "خفض عبء التقارير حتى 85%",
        s2Item2: "تقليص وقت الإعداد حتى 80%",
        s2Item3: "زيادة سرعة الإنشاء حتى 15x"
      },
      cap: {
        eyebrow: "القدرات الأساسية",
        title: "الهندسة، الذكاء، الأتمتة، والنشر.",
        c1Title: "أنظمة الذكاء",
        c1Body: "تحليل وتنبؤ ومساعدون ذكيون مدعومون بـ LLM/ML ومتكاملون مع سير العمل.",
        c2Title: "التحكم التشغيلي",
        c2Body: "مراقبة لحظية، لوحات داخلية، وأنظمة ذكاء معرفي.",
        c3Title: "أتمتة التنفيذ",
        c3Body: "أتمتة التقارير والاسترجاع والعمليات المعتمدة على الذكاء الاصطناعي.",
        c4Title: "نماذج النشر",
        c4Body: "سحابة خاصة، داخل المؤسسة، أو نموذج هجين مع ملكية بيانات للمؤسسة."
      },
      process: {
        eyebrow: "منهجية التسليم",
        title: "منهجية من أربع مراحل لتبنٍّ موثوق.",
        p1Title: "تشخيص",
        p1Body: "تقييم سير العمل، بنية التقارير، وفجوات التنفيذ.",
        p2Title: "هيكلة",
        p2Body: "تصميم البنية، منطق الحوكمة، ومسارات القرار.",
        p3Title: "هندسة",
        p3Body: "بناء أنظمة الذكاء الاصطناعي والبنية التحتية للذكاء التشغيلي.",
        p4Title: "نشر",
        p4Body: "الدمج والتهيئة والتشغيل مع مؤشرات تبنٍّ قابلة للقياس."
      },
      security: {
        eyebrow: "الأمان والملكية",
        title: "التحكم في البنية التحتية يبقى لدى المؤسسة.",
        ownsTitle: "المؤسسة تملك",
        owns1: "البنية التحتية وبيئة الاستضافة",
        owns2: "الأنظمة المؤسسية وضوابط الوصول",
        owns3: "جميع البيانات والسجلات المؤسسية",
        owns4: "خيار نموذج النشر: سحابة خاصة أو داخلية أو هجين",
        providesTitle: "Beyond Code تقدم",
        provides1: "هندسة برمجية وطبقات ذكاء اصطناعي",
        provides2: "تهيئة الأنظمة ودعم النشر",
        provides3: "تعزيز التشغيلي ومواءمة الحوكمة",
        provides4: "تحسينات مستمرة وصيانة"
      },
      leadership: {
        eyebrow: "القيادة",
        tech: "التقنية",
        ceoRole: "المؤسس والرئيس التنفيذي",
        ceoDesc: "استراتيجية الذكاء التشغيلي والأنظمة",
        ctoRole: "الرئيس التنفيذي للتقنية",
        ctoDesc: "معماري أنظمة ذكية وبنية تحتية للذكاء الاصطناعي"
      },
      contact: {
        eyebrow: "تواصل",
        title: "دعنا نبني طبقة تنفيذ ذكاء اصطناعي لمؤسستك.",
        name: "الاسم الكامل",
        company: "اسم الشركة",
        email: "البريد الإلكتروني للعمل",
        usecase: "حالة الاستخدام",
        submit: "إرسال طلب",
        note: "سيتم فتح تطبيق البريد لديك مع رسالة جاهزة لفريقنا.",
        location: "Beyond Code، أبوظبي، الإمارات"
      },
      footer: {
        name: "Beyond Code",
        tagline: "بنية ذكاء تشغيلي بالذكاء الاصطناعي لتنفيذ مؤسسي وأتمتة التقارير."
      },
      mail: {
        subject: "استفسار ذكاء اصطناعي مؤسسي",
        name: "الاسم الكامل",
        company: "الشركة",
        email: "البريد الإلكتروني للعمل",
        usecase: "حالة الاستخدام",
        success: "تم فتح مسودة بريد إلكتروني. إذا لم يظهر شيء، تحقق من إعدادات البريد في المتصفح."
      }
    }
  };

  let currentLang = localStorage.getItem("bc_lang") || document.documentElement.lang || "en";
  if (!translations[currentLang]) {
    currentLang = "en";
  }

  function t(key) {
    const parts = key.split(".");
    let value = translations[currentLang];
    for (const part of parts) {
      value = value ? value[part] : undefined;
    }
    return typeof value === "string" ? value : key;
  }

  function applyTranslations() {
    i18nEls.forEach((el) => {
      const key = el.dataset.i18n;
      if (key) {
        el.textContent = t(key);
      }
    });

    document.title = translations[currentLang].metaTitle;
    if (metaDescription) {
      metaDescription.setAttribute("content", translations[currentLang].metaDescription);
    }

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  function setLanguage(lang) {
    if (!translations[lang]) {
      return;
    }
    currentLang = lang;
    localStorage.setItem("bc_lang", lang);
    applyTranslations();
  }

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

  function setupLanguageSwitch() {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang || "en");
      });
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

      const subject = `${t("mail.subject")} - ${company || "Beyond Code Lead"}`;
      const body = [
        `${t("mail.name")}: ${name}`,
        `${t("mail.company")}: ${company}`,
        `${t("mail.email")}: ${email}`,
        "",
        `${t("mail.usecase")}:`,
        message
      ].join("\n");

      const mailtoUrl = `mailto:info@beyondcode.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (formNote) {
        formNote.textContent = t("mail.success");
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

  applyTranslations();
  toggleHeaderState();
  setupMenu();
  setupLanguageSwitch();
  setupRevealAnimations();
  setupCounters();
  setupSectionHighlight();
  setupContactForm();
  bindEvents();
})();
