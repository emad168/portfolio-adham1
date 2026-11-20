/**
 * render.js - Data-Driven Component & Section Rendering Engine
 * Hardened with DOMSanitizer, exact path resolution, 2-column certificate grid & project links
 */

const PortfolioRenderer = {
  /**
   * Helper: Return exact image path defined in certificate data
   */
  resolveCertImage(cert) {
    if (!cert) return "";
    return String(cert.image || "");
  },

  /**
   * Helper: Map skill level & custom percentage to styled badge & progress percent
   */
  getSkillInfo(level, customPercent) {
    if (customPercent) {
      let badgeClass = "badge-cyan";
      if (level && (level.includes("Excellent") || level.includes("Certified"))) {
        badgeClass = "badge-green";
      } else if (level && (level.includes("Hands-on") || level.includes("Lab") || level.includes("Project"))) {
        badgeClass = "badge-blue";
      }
      return { badgeClass, percent: customPercent };
    }

    switch (level) {
      case "Learning":
        return { badgeClass: "badge-amber", percent: 45 };
      case "Beginner":
        return { badgeClass: "badge-blue", percent: 55 };
      case "Basic Knowledge":
        return { badgeClass: "badge-cyan", percent: 65 };
      case "Academic Experience":
        return { badgeClass: "badge-green", percent: 75 };
      default:
        return { badgeClass: "badge-cyan", percent: 80 };
    }
  },

  /**
   * Render Hero Section with sanitized inputs
   */
  renderHero(profile) {
    if (!profile) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };

    const nameEl = document.getElementById("hero-name");
    if (nameEl) {
      nameEl.innerHTML = `Hi, I'm <span class="highlight-name">${s.escapeHTML(profile.name)}</span>`;
    }

    const titleEl = document.getElementById("hero-title-role");
    if (titleEl) {
      titleEl.textContent = profile.role || "Information Technology Student";
    }

    const subtitleEl = document.getElementById("hero-subtitle");
    if (subtitleEl) {
      subtitleEl.innerHTML = `<i class="fas fa-network-wired"></i> Current Focus: ${s.escapeHTML(profile.currentFocus || "Computer Networks & CCNA")}`;
    }

    const introEl = document.getElementById("hero-intro");
    if (introEl) {
      introEl.textContent = profile.heroIntro || "";
    }

    const statusBadgeEl = document.getElementById("hero-status-tag");
    if (statusBadgeEl && profile.status) {
      statusBadgeEl.textContent = profile.status.text || "";
    }

    const avatarEl = document.getElementById("hero-avatar");
    if (avatarEl && profile.avatar) {
      avatarEl.src = s.sanitizeURL(profile.avatar.src) || "./assets/images/profile.jpg";
      avatarEl.alt = s.escapeHTML(profile.avatar.alt || "Portrait of Adham Sabry");
    }
  },

  /**
   * Render About Section
   */
  renderAbout(profile) {
    const container = document.getElementById("about-content-area");
    if (!container || !profile || !profile.about) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || '') };

    const paragraphsHtml = (profile.about.paragraphs || []).map(p => `
      <p style="color: var(--text-secondary); line-height: 1.75; margin-bottom: 1rem; font-size: 1rem;">
        ${s.escapeHTML(p)}
      </p>
    `).join("");

    container.innerHTML = `
      <div class="about-grid">
        <div class="about-card-main">
          <div>
            <span class="section-tag"><i class="fas fa-user-check"></i> Authentic Profile</span>
            <h3 style="font-size: 1.45rem; color: var(--text-main); margin: 0.85rem 0 1.25rem;">${s.escapeHTML(profile.about.heading)}</h3>
            ${paragraphsHtml}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
            <span class="badge badge-cyan"><i class="fas fa-university"></i> ${s.escapeHTML(profile.university)}</span>
            <span class="badge badge-blue"><i class="fas fa-book-reader"></i> ${s.escapeHTML(profile.degree)}</span>
            <span class="badge badge-amber"><i class="fas fa-spinner fa-spin" style="font-size: 0.7rem;"></i> ${s.escapeHTML(profile.currentFocus)}</span>
            <span class="badge badge-green"><i class="fas fa-shield-alt"></i> Goal: ${s.escapeHTML(profile.careerGoal)}</span>
          </div>
        </div>

        <div class="about-highlights-list">
          <div class="about-highlight-box">
            <div class="about-highlight-icon"><i class="fas fa-network-wired"></i></div>
            <div class="about-highlight-text">
              <h4>Computer Networks &amp; CCNA</h4>
              <p>Studying routing concepts, switching, IP addressing, and packet dynamics to build a dependable infrastructure foundation.</p>
            </div>
          </div>

          <div class="about-highlight-box">
            <div class="about-highlight-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="about-highlight-text">
              <h4>Penetration Testing Long-Term Goal</h4>
              <p>Approaching cybersecurity with honesty: prioritizing solid systems, protocol, and programming basics before offensive testing.</p>
            </div>
          </div>

          <div class="about-highlight-box">
            <div class="about-highlight-icon"><i class="fas fa-code"></i></div>
            <div class="about-highlight-text">
              <h4>Programming &amp; Database Basics</h4>
              <p>Practical academic experience with Oracle SQL queries, frontend styling (HTML/CSS), and programming logic (JS/PHP).</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render Current Technical Skills Section
   */
  renderSkills(skills) {
    const container = document.getElementById("skills-content-area");
    if (!container || !skills) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || '') };

    const categoriesMap = {};
    skills.forEach(skill => {
      const cat = skill.category || "General";
      if (!categoriesMap[cat]) {
        categoriesMap[cat] = [];
      }
      categoriesMap[cat].push(skill);
    });

    const categoryIcons = {
      "Networking & Infrastructure": "fas fa-network-wired",
      "Cybersecurity": "fas fa-shield-alt",
      "IT & Systems": "fas fa-desktop",
      "Database Management": "fas fa-database",
      "Programming & Development": "fas fa-code",
      "Web Development": "fas fa-laptop-code",
      "AI & Data Analytics": "fas fa-brain",
      "Web & Programming": "fas fa-code"
    };

    const categoriesHtml = Object.keys(categoriesMap).map(categoryName => {
      const items = categoriesMap[categoryName];
      const icon = categoryIcons[categoryName] || "fas fa-terminal";

      return `
        <div class="skill-card">
          <div class="skill-card-header">
            <div class="skill-card-icon"><i class="${icon}"></i></div>
            <h4 class="skill-card-title">${s.escapeHTML(categoryName)}</h4>
          </div>
          <div class="skill-items-list">
            ${items.map(skill => {
              const info = this.getSkillInfo(skill.level, skill.percentage);
              return `
                <div class="skill-item-row" style="flex-direction: column; align-items: stretch; gap: 0.35rem;" title="${s.escapeHTML(skill.description || skill.name)}">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="skill-item-name"><i class="${s.escapeHTML(skill.icon || 'fas fa-check')}" style="margin-right: 0.5rem; color: var(--cyan-primary); font-size: 0.85rem;"></i>${s.escapeHTML(skill.name)}</span>
                    <span class="badge ${info.badgeClass}">${s.escapeHTML(skill.level)}</span>
                  </div>
                  <div class="skill-bar-container">
                    <div class="skill-bar-fill" data-progress="${info.percent}"></div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div class="skills-grid">
        ${categoriesHtml}
      </div>
    `;

    setTimeout(() => {
      document.querySelectorAll(".skill-bar-fill").forEach(bar => {
        const p = bar.getAttribute("data-progress") || "75";
        bar.style.width = `${p}%`;
      });
    }, 150);
  },

  /**
   * Render Projects Section with direct live website button when available (no GitHub link)
   */
  renderProjects(projects) {
    const container = document.getElementById("projects-content-area");
    if (!container) return;

    const listToRender = (projects && projects.length) ? projects : (window.PROJECTS_DATA || []);
    if (!listToRender.length) return;

    const s = window.DOMSanitizer || {
      escapeHTML: str => String(str || ""),
      sanitizeURL: u => String(u || "").trim()
    };
    const isAr = document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";

    container.innerHTML = `
      <div class="projects-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; align-items: stretch;">
        ${listToRender.map(proj => {
          const title = isAr && proj.titleAr ? proj.titleAr : proj.title;
          const desc = isAr && proj.descriptionAr ? proj.descriptionAr : (proj.description || proj.summary || "");
          const rawSiteUrl = proj.liveDemoUrl || proj.demoUrl || proj.demo || proj.link || proj.url || "";
          const safeSiteUrl = rawSiteUrl ? s.sanitizeURL(rawSiteUrl) : "";
          const hasSiteLink = Boolean(safeSiteUrl && safeSiteUrl !== "#");
          const safeImg = proj.image ? s.sanitizeURL(proj.image) : "";

          return `
            <div class="project-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.9rem; height: 100%;">
              <div>
                ${safeImg ? `
                  <div style="width: 100%; height: 160px; overflow: hidden; border-radius: 8px; margin-bottom: 0.85rem; background: #070d1f; border: 1px solid rgba(255,255,255,0.08);">
                    <img src="${s.escapeHTML(safeImg)}" alt="${s.escapeHTML(title || "")}"
                      style="width: 100%; height: 100%; object-fit: cover; object-position: top;"
                      onerror="this.parentElement.style.display='none'">
                  </div>
                ` : ""}

                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.45rem;">
                  <h4 style="margin: 0; color: var(--text-main); font-size: 1.15rem;">${s.escapeHTML(title || "")}</h4>
                  ${proj.status ? `<span class="badge badge-cyan">${s.escapeHTML(proj.status)}</span>` : ""}
                </div>

                ${proj.category ? `
                  <div style="font-size: 0.8rem; color: var(--cyan-primary); font-family: var(--font-mono); margin-bottom: 0.55rem;">
                    ${s.escapeHTML(proj.category)}
                  </div>
                ` : ""}

                ${desc ? `
                  <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; margin: 0;">
                    ${s.escapeHTML(desc)}
                  </p>
                ` : ""}
              </div>

              <div>
                ${Array.isArray(proj.technologies) && proj.technologies.length ? `
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: ${hasSiteLink ? "0.9rem" : "0"};">
                    ${proj.technologies.map(tech => `<span class="badge badge-blue" style="font-size: 0.72rem;">${s.escapeHTML(tech)}</span>`).join("")}
                  </div>
                ` : ""}

                ${hasSiteLink ? `
                  <div style="padding-top: 0.7rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: flex-start;">
                    <a href="${s.escapeHTML(safeSiteUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                      <i class="fas fa-external-link-alt"></i> ${isAr ? "زيارة الموقع" : "Visit Website"}
                    </a>
                  </div>
                ` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  /**
   * Switch preview image inside Certificate Modal (for multi-lecture certificates)
   */
  switchModalImage(imgUrl, thumbEl) {
    const mainImg = document.getElementById("cert-modal-main-img");
    const fullLink = document.getElementById("cert-modal-full-link");
    if (mainImg) mainImg.src = imgUrl;
    if (fullLink) fullLink.href = imgUrl;

    document.querySelectorAll(".cert-gallery-thumb").forEach(el => {
      el.style.borderColor = "rgba(255,255,255,0.15)";
      el.style.opacity = "0.7";
    });
    if (thumbEl) {
      thumbEl.style.borderColor = "#38bdf8";
      thumbEl.style.opacity = "1";
    }
  },

  /**
   * Open Interactive Modal with Full Certificate Image, Gallery & Details
   */
  openCertificateModal(certId) {
    const activeCerts = this._lastRenderedCerts || window.CERTIFICATIONS_DATA || [];
    const cert = activeCerts.find(item => item.id === certId) || (window.CERTIFICATIONS_DATA || []).find(item => item.id === certId);
    if (!cert) return;

    const s = window.DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };
    const isAr = document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";

    const title = isAr && cert.titleAr ? cert.titleAr : cert.title;
    const issuer = isAr && cert.issuerAr ? cert.issuerAr : cert.issuer;
    const summary = isAr && cert.summaryAr ? cert.summaryAr : cert.summary;
    const resolvedPath = this.resolveCertImage(cert);
    const safeImg = resolvedPath ? s.sanitizeURL(resolvedPath) : "";
    const gallery = Array.isArray(cert.gallery) ? cert.gallery : [];

    let modal = document.getElementById("cert-detail-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cert-detail-modal";
      modal.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(5, 10, 24, 0.88); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        padding: 1.25rem; overflow-y: auto;
      `;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="
        background: #0c152e; border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 14px; max-width: 780px; width: 100%;
        padding: 1.5rem; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.65);
        max-height: 90vh; overflow-y: auto; color: var(--text-main, #f1f5f9);
      ">
        <button type="button" onclick="document.getElementById('cert-detail-modal').style.display='none'"
          style="
            position: absolute; top: 1rem; ${isAr ? 'left: 1rem;' : 'right: 1rem;'}
            background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
            color: #fff; width: 34px; height: 34px; border-radius: 50%;
            cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
          " aria-label="Close">&times;</button>

        <div style="margin-bottom: 1rem; padding-${isAr ? 'left' : 'right'}: 2.2rem;">
          <span class="badge badge-green" style="margin-bottom: 0.4rem;">
            <i class="fas fa-check-circle"></i> ${s.escapeHTML(cert.status || 'Completed')}
          </span>
          <h3 style="font-size: 1.35rem; margin: 0.35rem 0;">${s.escapeHTML(title)}</h3>
          <p style="color: var(--cyan-primary, #38bdf8); font-size: 0.92rem; margin: 0;">
            <i class="fas fa-building"></i> ${s.escapeHTML(issuer)}
          </p>
        </div>

        ${safeImg ? `
          <div style="
            background: #060b19; border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px; padding: 0.5rem; margin-bottom: 0.85rem; text-align: center;
          ">
            <img id="cert-modal-main-img" src="${safeImg}" alt="${s.escapeHTML(title)}"
              style="max-width: 100%; max-height: 440px; border-radius: 6px; object-fit: contain;"
              onerror="this.parentElement.innerHTML='<p style=\\'padding:1.5rem;color:#94a3b8;\\'>Image not found at: ${s.escapeHTML(safeImg)}</p>'">
          </div>
        ` : ''}

        ${gallery.length > 1 ? `
          <div style="margin-bottom: 1rem;">
            <div style="font-size: 0.78rem; font-family: var(--font-mono); color: #94a3b8; margin-bottom: 0.45rem;">
              <i class="fas fa-images"></i> ${isAr ? `شهادات المحاضرات (${gallery.length} شهادات):` : `LECTURE CERTIFICATES (${gallery.length} FILES):`}
            </div>
            <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.4rem;">
              ${gallery.map((gPath, idx) => {
                const safeG = s.sanitizeURL(gPath);
                return `
                  <img src="${safeG}" alt="Lecture ${idx + 1}" class="cert-gallery-thumb"
                    onclick="PortfolioRenderer.switchModalImage('${s.escapeHTML(safeG)}', this)"
                    style="
                      width: 72px; height: 50px; object-fit: cover; border-radius: 6px; cursor: pointer;
                      border: 2px solid ${idx === 0 ? '#38bdf8' : 'rgba(255,255,255,0.15)'};
                      opacity: ${idx === 0 ? '1' : '0.7'}; flex-shrink: 0;
                    ">
                `;
              }).join("")}
            </div>
          </div>
        ` : ''}

        <div style="display: flex; flex-wrap: wrap; gap: 1rem; font-family: var(--font-mono); font-size: 0.82rem; color: #94a3b8; margin-bottom: 0.85rem;">
          ${cert.date ? `<span><i class="far fa-calendar-alt"></i> Date: <strong style="color:#fff;">${s.escapeHTML(cert.date)}</strong></span>` : ''}
          ${cert.credentialId ? `<span><i class="fas fa-fingerprint"></i> ID: <strong style="color:#38bdf8;">${s.escapeHTML(cert.credentialId)}</strong></span>` : ''}
          ${cert.grade ? `<span><i class="fas fa-award"></i> Grade: <strong style="color:#4ade80;">${s.escapeHTML(cert.grade)}</strong></span>` : ''}
        </div>

        <p style="color: var(--text-secondary, #cbd5e1); font-size: 0.94rem; line-height: 1.65; margin-bottom: 1rem;">
          ${s.escapeHTML(summary)}
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
          ${(cert.topics || []).map(t => `<span class="badge badge-blue">${s.escapeHTML(t)}</span>`).join("")}
        </div>

        ${safeImg ? `
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <a id="cert-modal-full-link" href="${safeImg}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fas fa-external-link-alt"></i> ${isAr ? 'فتح الصورة بالحجم الكامل' : 'Open Full Image'}
            </a>
          </div>
        ` : ''}
      </div>
    `;

    modal.style.display = "flex";
  },

  /**
   * Render Education & Verified Certifications
   * Full-width Education card on top, 2-column grid of certificates below
   */
  renderEducationAndCertifications(education, certifications) {
    const container = document.getElementById("education-certs-content-area");
    if (!container) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };
    const isAr = document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";

    const listToRender = (certifications && certifications.length) ? certifications : (window.CERTIFICATIONS_DATA || []);
    this._lastRenderedCerts = listToRender;

    const edu = education && education[0] ? education[0] : {};

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Full-Width Education Card on Top -->
        <div class="education-card" style="width: 100%; max-width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <span class="section-tag"><i class="fas fa-university"></i> ${isAr ? 'التعليم الجامعي' : 'University Education'}</span>
              <h4 style="font-size: 1.35rem; color: var(--text-main); margin-top: 0.35rem;">${s.escapeHTML(edu.institution || 'Delta Technological University')}</h4>
              <p style="color: var(--cyan-primary); font-family: var(--font-mono); font-size: 0.95rem; margin-top: 0.2rem;">${s.escapeHTML(edu.field || 'Information Technology - Network Track')}</p>
            </div>
            <span class="badge badge-cyan">${s.escapeHTML(edu.status || 'Year 3 (2026-2027)')}</span>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
            <span>${isAr ? 'الموقع:' : 'Location:'} <strong style="color: var(--text-main);">${s.escapeHTML(edu.location || 'Egypt')}</strong></span>
            ${edu.overallGrade ? `<span>${isAr ? 'التقدير التراكمي:' : 'Cumulative Grade:'} <strong style="color: #4ade80;">${s.escapeHTML(edu.overallGrade)} (${s.escapeHTML(edu.percentage || '79.15%')})</strong></span>` : ''}
          </div>

          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0.5rem 0;">${s.escapeHTML(edu.description || '')}</p>

          <div>
            <div style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--text-muted); margin-bottom: 0.6rem;">
              ${isAr ? 'المواد الدراسية الأساسية:' : 'CORE CURRICULUM SUBJECTS:'}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${(edu.coreFocus || []).map(cf => `<span class="badge badge-cyan">${s.escapeHTML(cf)}</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- Certifications Header -->
        <div>
          <span class="section-tag"><i class="fas fa-certificate"></i> ${isAr ? 'الشهادات والدورات المعتمدة' : 'Verified Certifications & Courses'}</span>
          <p style="font-size: 0.86rem; color: var(--text-muted); margin-top: 0.25rem;">
            ${isAr ? 'اضغط على أي شهادة لعرض الصورة الأصلية والتفاصيل الكاملة.' : 'Click on any certificate to inspect the full image and verification details.'}
          </p>
        </div>

        <!-- 2-Column Certificates Grid Below -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; align-items: stretch;">
          ${listToRender.map(c => {
            const title = isAr && c.titleAr ? c.titleAr : c.title;
            const issuer = isAr && c.issuerAr ? c.issuerAr : c.issuer;
            const summary = isAr && c.summaryAr ? c.summaryAr : c.summary;
            const resolvedPath = this.resolveCertImage(c);
            const safeImg = resolvedPath ? s.sanitizeURL(resolvedPath) : "";
            const safeId = s.escapeHTML(c.id);

            return `
              <div class="cert-card-item" onclick="PortfolioRenderer.openCertificateModal('${safeId}')"
                style="cursor: pointer; transition: transform 0.2s ease, border-color 0.2s ease; display: flex; flex-direction: column; justify-content: space-between; height: 100%;"
                onmouseover="this.style.borderColor='var(--cyan-primary)'; this.style.transform='translateY(-2px)';"
                onmouseout="this.style.borderColor=''; this.style.transform='';">

                <div>
                  ${safeImg ? `
                    <div style="
                      width: 100%; height: 165px; overflow: hidden; border-radius: 8px;
                      margin-bottom: 0.85rem; background: #070d1f; border: 1px solid rgba(255,255,255,0.08);
                      position: relative;
                    ">
                      <img src="${safeImg}" alt="${s.escapeHTML(title)}"
                        style="width: 100%; height: 100%; object-fit: cover; object-position: top;"
                        onerror="this.parentElement.style.display='none'">
                      <span style="
                        position: absolute; bottom: 8px; ${isAr ? 'left: 8px;' : 'right: 8px;'}
                        background: rgba(12, 21, 46, 0.88); color: #38bdf8;
                        padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.75rem;
                        border: 1px solid rgba(56, 189, 248, 0.35);
                      ">
                        <i class="fas fa-search-plus"></i> ${isAr ? 'عرض الشهادة' : 'View Certificate'}
                      </span>
                    </div>
                  ` : ''}

                  <div class="cert-header">
                    <div>
                      <h5 class="cert-title">${s.escapeHTML(title)}</h5>
                      <span class="cert-issuer"><i class="fas fa-building"></i> ${s.escapeHTML(issuer)}</span>
                    </div>
                    <span class="badge badge-green">${s.escapeHTML(c.status)}</span>
                  </div>

                  <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0.5rem 0;">${s.escapeHTML(summary)}</p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.4rem;">
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    ${(c.topics || []).map(t => `<span class="badge badge-blue" style="font-size: 0.72rem;">${s.escapeHTML(t)}</span>`).join("")}
                  </div>
                  <span style="font-size: 0.78rem; color: var(--cyan-primary); font-family: var(--font-mono);">
                    ${isAr ? 'التفاصيل ←' : 'Details →'}
                  </span>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  },

  /**
   * Render 6-Stage Learning Journey Roadmap
   */
  renderJourney(journey) {
    const container = document.getElementById("journey-content-area");
    if (!container || !journey) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div class="roadmap-timeline-wrapper">
        ${(journey || []).map(step => {
          let stageClass = "stage-foundation";
          let badgeClass = "badge-green";

          if (step.badgeType === "active-now") {
            stageClass = "stage-active";
            badgeClass = "badge-amber";
          } else if (step.badgeType === "upcoming") {
            stageClass = "stage-upcoming";
            badgeClass = "badge-blue";
          } else if (step.badgeType === "future-goal") {
            stageClass = "stage-destination";
            badgeClass = "badge-cyan";
          }

          return `
            <div class="roadmap-card ${stageClass}">
              <div class="roadmap-header">
                <span class="roadmap-number">STAGE ${s.escapeHTML(step.step)}</span>
                <span class="badge ${badgeClass}">${s.escapeHTML(step.status)}</span>
              </div>
              <h4 class="roadmap-title">${s.escapeHTML(step.title)}</h4>
              <p class="roadmap-desc">${s.escapeHTML(step.description)}</p>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: auto; padding-top: 0.75rem;">
                ${(step.skills || []).map(sk => `<span class="badge badge-cyan" style="font-size: 0.72rem;">${s.escapeHTML(sk)}</span>`).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  /**
   * Render Professional Contact Section
   */
  renderContact(profile) {
    const container = document.getElementById("contact-content-area");
    if (!container || !profile || !profile.contact) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };

    const contact = profile.contact;
    const safeEmail = s.escapeHTML(contact.email || "almasryadham601@gmail.com");
    const safeLinkedin = s.sanitizeURL(contact.linkedin || "");
    const safeGithub = s.sanitizeURL(contact.github || "");
    const safeWhatsapp = s.sanitizeURL(contact.whatsapp || "");
    const safeLocation = s.escapeHTML(contact.location || "Egypt");

    container.innerHTML = `
      <div class="contact-layout-grid">
        <div class="contact-info-card">
          <div>
            <span class="section-tag"><i class="fas fa-id-badge"></i> Direct Channels</span>
            <h3 style="font-size: 1.45rem; color: var(--text-main); margin: 0.75rem 0 0.5rem;">Connect with Adham</h3>
            <p style="color: var(--text-secondary); font-size: 0.94rem; line-height: 1.6;">
              Feel free to reach out for networking discussions, collaboration opportunities, or technical inquiries.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            <div class="contact-channel-item" style="justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="contact-channel-icon"><i class="fas fa-envelope"></i></div>
                <div class="contact-channel-meta">
                  <span class="contact-channel-label">EMAIL ADDRESS</span>
                  <a href="mailto:${safeEmail}" class="contact-channel-value">${safeEmail}</a>
                </div>
              </div>
              <button type="button" class="copy-email-btn" onclick="PortfolioInteractions.copyEmail('${safeEmail}', this)">
                <i class="far fa-copy"></i> Copy
              </button>
            </div>

            ${safeLinkedin ? `
              <a href="${safeLinkedin}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                <div class="contact-channel-icon"><i class="fab fa-linkedin-in"></i></div>
                <div class="contact-channel-meta">
                  <span class="contact-channel-label">LINKEDIN PROFILE</span>
                  <span class="contact-channel-value">${s.escapeHTML(contact.linkedin.replace("https://", ""))}</span>
                </div>
              </a>
            ` : ''}

            ${safeGithub ? `
              <a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
                <div class="contact-channel-icon"><i class="fab fa-github"></i></div>
                <div class="contact-channel-meta">
                  <span class="contact-channel-label">GITHUB PROFILE</span>
                  <span class="contact-channel-value">${s.escapeHTML(contact.github.replace("https://", ""))}</span>
                </div>
              </a>
            ` : ''}

            <div class="contact-channel-item">
              <div class="contact-channel-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div class="contact-channel-meta">
                <span class="contact-channel-label">LOCATION</span>
                <span class="contact-channel-value">${safeLocation}</span>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;">
            ${safeWhatsapp ? `
              <a href="${safeWhatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                <i class="fab fa-whatsapp"></i> WhatsApp Direct
              </a>
            ` : ''}
            <a href="./assets/ADHAM_CV.pdf" download class="btn btn-outline btn-sm">
              <i class="fas fa-file-download"></i> Download CV (PDF)
            </a>
          </div>
        </div>

        <div class="contact-form-card">
          <h4 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 0.5rem;">Send a Message</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.5rem;">
            Leave a note below regarding networking, internships, or IT inquiries.
          </p>
          <form id="contact-form" onsubmit="event.preventDefault(); alert('Message noted! Thank you for contacting Adham Sabry.');">
            <div class="form-group">
              <label class="form-label">FULL NAME</label>
              <input type="text" class="form-input" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <label class="form-label">EMAIL ADDRESS</label>
              <input type="email" class="form-input" placeholder="your.email@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">SUBJECT</label>
              <input type="text" class="form-input" placeholder="Networking / Internship Inquiry" required>
            </div>
            <div class="form-group">
              <label class="form-label">MESSAGE</label>
              <textarea class="form-textarea" rows="4" placeholder="Your message here..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              <i class="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    `;
  }
};

if (typeof window !== "undefined") {
  window.PortfolioRenderer = PortfolioRenderer;
}