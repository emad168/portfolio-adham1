/**
 * i18n.js - Internationalization Engine (English default with ready Arabic architecture)
 * Supports one-click language switching, RTL switching, and dynamic key lookup.
 */

const I18N_DICTIONARY = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.certifications": "Certifications",
    "nav.journey": "Roadmap",
    "nav.contact": "Contact",
    "nav.admin": "Admin",
    "nav.getInTouch": "Get in Touch",

    // Hero Section
    "hero.status": "CURRENT FOCUS: CCNA & NETWORK PROTOCOLS",
    "hero.greeting": "Hi, I'm",
    "hero.role": "Information Technology Student",
    "hero.focus": "Current Focus: Computer Networks & CCNA",
    "hero.intro": "Dedicated Information Technology student at Delta Technological University, actively mastering computer networking fundamentals, Cisco CCNA concepts, and enterprise IT infrastructure. Building a structured technical foundation with the long-term career ambition of progressing into Penetration Testing and offensive security.",
    "hero.btnProjects": "View My Projects",
    "hero.btnContact": "Contact Me",
    "hero.badgeUniversity": "Delta Technological University",
    "hero.badgeCcna": "Cisco CCNA (In Progress)",
    "hero.badgeGoal": "Goal: Penetration Testing",

    // Section Headers
    "section.aboutTag": "Professional Background",
    "section.aboutTitle": "About",
    "section.aboutDesc": "A disciplined approach to understanding systems from the physical cable to the transport layer.",

    "section.skillsTag": "Technical Stack",
    "section.skillsTitle": "Current",
    "section.skillsTitleAccent": "Skills",
    "section.skillsDesc": "Transparently categorizing verified proficiencies and active study areas without exaggerated claims.",

    "section.projectsTag": "Portfolio Showcase",
    "section.projectsTitle": "Featured",
    "section.projectsTitleAccent": "Projects",
    "section.projectsDesc": "Browse through academic projects, practical simulations, and software development exercises. Filter by category below.",

    "section.eduTag": "Qualifications",
    "section.eduTitle": "Education &",
    "section.eduTitleAccent": "Certifications",
    "section.eduDesc": "Academic degree accomplishments combined with formal vendor certifications and active courses.",

    "section.journeyTag": "Career Roadmap",
    "section.journeyTitle": "Learning",
    "section.journeyTitleAccent": "Journey",
    "section.journeyDesc": "The progressive path from IT fundamentals to penetration testing and offensive cybersecurity.",

    "section.contactTag": "Communication",
    "section.contactTitle": "Contact",
    "section.contactTitleAccent": "Me",
    "section.contactDesc": "Have a technical inquiry, networking discussion, or internship opportunity? Reach out directly.",

    // General & Interactive
    "btn.copyEmail": "Copy Email",
    "btn.emailCopied": "Copied to Clipboard!",
    "btn.downloadCv": "Download CV (PDF)",
    "btn.viewProject": "View Details",
    "btn.liveDemo": "Live Demo",
    "btn.github": "GitHub",
    "footer.rights": "All rights reserved.",
    "theme.toggle": "Toggle Theme"
  },

  ar: {
    // Ready structure for full Arabic localization
    "nav.home": "الرئيسية",
    "nav.about": "عني",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.education": "التعليم",
    "nav.certifications": "الشهادات",
    "nav.journey": "المسار التعليمي",
    "nav.contact": "تواصل معي",
    "nav.admin": "لوحة التحكم",
    "nav.getInTouch": "تواصل الآن",

    "hero.status": "التركيز الحالي: CCNA وبروتوكولات الشبكات",
    "hero.greeting": "مرحباً، أنا",
    "hero.role": "طالب تكنولوجيا المعلومات",
    "hero.focus": "التركيز الحالي: شبكات الحاسوب و CCNA",
    "hero.intro": "طالب تكنولوجيا المعلومات بجامعة الدلتا التكنولوجية، أركز حالياً على إتقان أساسيات شبكات الحاسوب وشهادة Cisco CCNA. أسعى لبناء أساس تقني متين بهدف التخصص مستقبلاً في اختبار الاختراق والأمن السيبراني.",
    "hero.btnProjects": "استعراض مشاريعي",
    "hero.btnContact": "تواصل معي",
    "hero.badgeUniversity": "جامعة الدلتا التكنولوجية",
    "hero.badgeCcna": "Cisco CCNA (قيد الدراسة)",
    "hero.badgeGoal": "الهدف: اختبار الاختراق",

    "section.aboutTag": "الخلفية المهنية",
    "section.aboutTitle": "عن",
    "section.aboutDesc": "منهجية منضبطة لفهم الأنظمة بدءاً من الكابل المادي وحتى طبقة النقل.",

    "section.skillsTag": "المهارات التقنية",
    "section.skillsTitle": "المهارات",
    "section.skillsTitleAccent": "الحالية",
    "section.skillsDesc": "تصنيف دقيق للمهارات الحالية ومجالات الدراسة الفعلية دون أي مبالغة.",

    "section.projectsTag": "معرض الأعمال",
    "section.projectsTitle": "أبرز",
    "section.projectsTitleAccent": "المشاريع",
    "section.projectsDesc": "استعرض المشاريع الأكاديمية والمحاكاة العملية والتطبيقات.",

    "section.eduTag": "المؤهلات",
    "section.eduTitle": "التعليم و",
    "section.eduTitleAccent": "الشهادات",
    "section.eduDesc": "المسار الأكاديمي بجامعة الدلتا مع التدريبات والشهادات التقنية.",

    "section.journeyTag": "المسار التدريبي",
    "section.journeyTitle": "رحلة",
    "section.journeyTitleAccent": "التعلم",
    "section.journeyDesc": "المسار التدرجي من أساسيات تكنولوجيا المعلومات وحتى اختبار الاختراق والأمن السيبراني.",

    "section.contactTag": "قنوات التواصل",
    "section.contactTitle": "تواصل",
    "section.contactTitleAccent": "معي",
    "section.contactDesc": "يسعدني التواصل معك لأي استفسار تقني أو فرصة تدريبية أو مشروع أكاديمي.",

    "btn.copyEmail": "نسخ البريد",
    "btn.emailCopied": "تم النسخ بنجاح!",
    "btn.downloadCv": "تحميل السيرة الذاتية (PDF)",
    "btn.viewProject": "عرض التفاصيل",
    "btn.liveDemo": "معاينة مباشرة",
    "btn.github": "جيت هب",
    "footer.rights": "جميع الحقوق محفوظة.",
    "theme.toggle": "تبديل المظهر"
  }
};

const I18nManager = {
  currentLang: localStorage.getItem("portfolio_lang") || "en",

  init() {
    this.applyLanguage(this.currentLang);
  },

  setLanguage(lang) {
    if (!I18N_DICTIONARY[lang]) return;
    this.currentLang = lang;
    localStorage.setItem("portfolio_lang", lang);
    this.applyLanguage(lang);
  },

  toggleLanguage() {
    const nextLang = this.currentLang === "en" ? "ar" : "en";
    this.setLanguage(nextLang);
  },

  t(key) {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.en;
    return dict[key] || key;
  },

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Update language toggle button text
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.innerHTML = `<i class="fas fa-globe"></i> <span>${lang === 'en' ? 'AR' : 'EN'}</span>`;
      langBtn.setAttribute("title", lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية');
    }
  }
};

if (typeof window !== "undefined") {
  window.I18nManager = I18nManager;
}
