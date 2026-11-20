/**
 * interactions.js - Interactive Controller
 * Manages:
 * - Dark/Light Theme Switching with localStorage persistence
 * - Scroll Progress Indicator
 * - Back to Top Button
 * - Section Scroll Reveal Animations
 * - Copy Email to Clipboard with instant feedback
 */

const PortfolioInteractions = {
  theme: localStorage.getItem("portfolio_theme") || "dark",

  init() {
    this.applyTheme(this.theme);
    this.setupThemeToggle();
    this.setupScrollProgress();
    this.setupBackToTop();
    this.setupScrollReveal();
  },

  /* =========================================================================
     1. Theme Switcher (Dark / Light)
     ========================================================================= */
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
      themeToggleBtn.setAttribute("title", theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme");
      themeToggleBtn.setAttribute("aria-label", "Toggle color theme");
    }
  },

  toggleTheme() {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme);
  },

  setupThemeToggle() {
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.addEventListener("click", () => this.toggleTheme());
    }
  },

  /* =========================================================================
     2. Scroll Progress Bar
     ========================================================================= */
  setupScrollProgress() {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = `${scrolled}%`;
    }, { passive: true });
  },

  /* =========================================================================
     3. Back to Top Button
     ========================================================================= */
  setupBackToTop() {
    const btn = document.getElementById("back-to-top-btn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    }, { passive: true });

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  },

  /* =========================================================================
     4. Section Scroll Reveal Animations
     ========================================================================= */
  setupScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(el => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  },

  /* =========================================================================
     5. Copy Email Button with Real Clipboard Feedback
     ========================================================================= */
  copyEmail(email, buttonEl) {
    if (!navigator.clipboard) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    } else {
      navigator.clipboard.writeText(email);
    }

    // Visual feedback
    if (buttonEl) {
      const originalHTML = buttonEl.innerHTML;
      buttonEl.innerHTML = '<i class="fas fa-check" style="color: #10b981;"></i> Copied!';
      buttonEl.style.borderColor = '#10b981';
      setTimeout(() => {
        buttonEl.innerHTML = originalHTML;
        buttonEl.style.borderColor = '';
      }, 2200);
    }
  }
};

if (typeof window !== "undefined") {
  window.PortfolioInteractions = PortfolioInteractions;
}
