/**
 * main.js - Core Interactive Controller & Initialization
 * Coordinates section rendering, project management system, navigation tracking, 
 * interactive features, theme toggling, language switcher, and mobile drawer.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Data References (Storage provider checks localStorage overrides first, then falls back to static files)
  const profile = (window.PortfolioStorage) ? window.PortfolioStorage.getProfile() : (window.PROFILE_DATA || null);
  const skills = (window.PortfolioStorage) ? window.PortfolioStorage.getSkills() : (window.SKILLS_DATA || null);
  const projects = (window.PortfolioStorage) ? window.PortfolioStorage.getProjects() : (window.PROJECTS_DATA || null);
  const education = (window.PortfolioStorage) ? window.PortfolioStorage.getEducation() : (window.EDUCATION_DATA || null);
  const certifications = (window.PortfolioStorage) ? window.PortfolioStorage.getCertifications() : (window.CERTIFICATIONS_DATA || null);
  const journey = (window.PortfolioStorage) ? window.PortfolioStorage.getJourney() : (window.JOURNEY_DATA || null);

  // 2. Render Profile, Skills, Education, Certifications & Contact
  if (window.PortfolioRenderer) {
    window.PortfolioRenderer.renderHero(profile);
    window.PortfolioRenderer.renderAbout(profile);
    window.PortfolioRenderer.renderSkills(skills);
    window.PortfolioRenderer.renderEducationAndCertifications(education, certifications);
    window.PortfolioRenderer.renderJourney(journey);
    window.PortfolioRenderer.renderContact(profile);
  }

  // 3. Initialize Scalable Projects Management System
  if (window.ProjectsManager && Array.isArray(projects)) {
    window.ProjectsManager.init(projects);
  }

  // 4. Initialize Interactive Features (Theme, Scroll Progress, Back to Top, Scroll Reveal)
  if (window.PortfolioInteractions) {
    window.PortfolioInteractions.init();
  }

  // 5. Initialize Internationalization (English default with Arabic architecture)
  if (window.I18nManager) {
    window.I18nManager.init();
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        window.I18nManager.toggleLanguage();
      });
    }
  }

  // 6. Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        if (isOpen) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("is-open")) {
          navMenu.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
          const icon = mobileToggle.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      });
    });
  }

  // 7. Navbar Sticky Scrolled State
  const header = document.querySelector(".site-header");
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 8. Active Navigation State Tracking via IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 9. Dynamic Footer Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 10. Console Logging
  console.log(
    "%c[ADHAM SABRY PORTFOLIO]%c Interactive suite active. Dark/Light themes, i18n, & micro-interactions loaded.",
    "color: #00d2ff; font-weight: bold; font-family: monospace; font-size: 13px;",
    "color: #94a3b8; font-family: monospace; font-size: 12px;"
  );
});
