/**
 * projects-manager.js - Reusable Project Management & Rendering Engine
 * Hardened with DOMSanitizer to guarantee XSS prevention and safe external link handling.
 */

const ProjectsManager = {
  // Available categories
  categories: ["All", "Networking", "Web Development", "Cybersecurity", "Academic Projects", "Other"],

  // Current active filter
  currentFilter: "All",

  // Local reference to dataset
  projects: [],

  /**
   * Initialize Projects System
   */
  init(projectsData) {
    this.projects = Array.isArray(projectsData) ? projectsData : [];
    this.renderCategoryFilter();
    this.renderProjects();
    this.setupModal();
  },

  /**
   * Set category filter and re-render
   */
  setFilter(category) {
    this.currentFilter = category;
    this.renderCategoryFilter();
    this.renderProjects();
  },

  /**
   * Validate and sanitize project object to avoid missing information errors
   */
  validateProject(project) {
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };
    const rawDemo = project.liveDemoUrl || project.link || project.url || "";

    return {
      id: s.escapeHTML(project.id || `proj-${Math.random().toString(36).substr(2, 9)}`),
      title: s.escapeHTML(project.title || "Untitled Project"),
      description: s.escapeHTML(project.description || "No description provided."),
      category: s.escapeHTML(project.category || "Other"),
      technologies: Array.isArray(project.technologies) ? project.technologies.map(t => s.escapeHTML(t)) : [],
      image: s.sanitizeURL(project.image) || "./assets/images/project-placeholder.svg",
      liveDemoUrl: (typeof rawDemo === "string" && rawDemo.trim().startsWith("http")) ? s.sanitizeURL(rawDemo.trim()) : null,
      status: s.escapeHTML(project.status || "Completed"),
      creationDate: s.escapeHTML(project.creationDate || "Recent"),
      featured: Boolean(project.featured)
    };
  },

  /**
   * Render Category Filter Buttons
   */
  renderCategoryFilter() {
    const filterContainer = document.getElementById("projects-filter-bar");
    if (!filterContainer) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || '') };

    filterContainer.innerHTML = this.categories.map(cat => {
      const isActive = this.currentFilter === cat;
      const count = cat === "All"
        ? this.projects.length
        : this.projects.filter(p => p.category === cat).length;

      return `
        <button
          type="button"
          class="project-filter-btn ${isActive ? 'active' : ''}"
          onclick="ProjectsManager.setFilter('${s.escapeHTML(cat)}')"
          aria-pressed="${isActive}"
        >
          <span>${s.escapeHTML(cat)}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    }).join("");
  },

  /**
   * Render Filtered Projects Grid or Empty State
   */
  renderProjects() {
    const container = document.getElementById("projects-content-area");
    if (!container) return;
    const s = window.DOMSanitizer || { escapeHTML: str => String(str || '') };

    // Filter projects
    const filtered = this.currentFilter === "All"
      ? this.projects
      : this.projects.filter(p => p.category === this.currentFilter);

    // Empty State Check
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="projects-empty-state">
          <div class="empty-icon"><i class="fas fa-folder-open"></i></div>
          <h4 class="empty-title">No Projects in "${s.escapeHTML(this.currentFilter)}"</h4>
          <p class="empty-desc">
            No projects have been added to this category yet. When you complete future ${s.escapeHTML(this.currentFilter.toLowerCase())} labs or exercises, add them to <code>js/data/projects.js</code>.
          </p>
          <button type="button" class="btn btn-outline btn-sm" onclick="ProjectsManager.setFilter('All')">
            <i class="fas fa-redo"></i> View All Projects
          </button>
        </div>
      `;
      return;
    }

    // Render Grid
    container.innerHTML = `
      <div class="projects-grid">
        ${filtered.map(rawProj => {
          const p = this.validateProject(rawProj);

          // Technology tags
          const tagsHtml = p.technologies.map(tech => `
            <span class="badge badge-cyan" style="font-size: 0.72rem;">${tech}</span>
          `).join(" ");

          // View Details Button (Always Available via modal)
          const detailsBtnHtml = `
            <button type="button" class="btn btn-secondary btn-sm" onclick="ProjectsManager.openModal('${p.id}')">
              <i class="fas fa-info-circle"></i> View Project
            </button>
          `;

          // Category Badge Color
          let catBadgeClass = "badge-blue";
          if (p.category === "Networking") catBadgeClass = "badge-cyan";
          if (p.category === "Cybersecurity") catBadgeClass = "badge-amber";
          if (p.category === "Academic Projects") catBadgeClass = "badge-green";

          return `
            <article class="project-card ${p.featured ? 'is-featured' : ''}" id="project-card-${p.id}">
              <div class="project-thumb-box">
                <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='./assets/images/project-placeholder.svg'">
                <div class="project-category-overlay">
                  <span class="badge ${catBadgeClass}">${p.category}</span>
                </div>
                ${p.featured ? '<span class="project-featured-tag"><i class="fas fa-star"></i> Featured</span>' : ''}
              </div>

              <div class="project-body">
                <div class="project-header-row">
                  <h3 class="project-title">${p.title}</h3>
                  <span class="badge badge-amber" style="font-size: 0.7rem;">${p.status}</span>
                </div>

                <p class="project-desc">${p.description}</p>

                <div class="project-tags-wrap">
                  ${tagsHtml}
                </div>

                <div class="project-footer-row">
                  <span class="project-env-tag"><i class="far fa-calendar-alt"></i> ${p.creationDate}</span>
                  <div class="project-card-actions">
                    ${detailsBtnHtml}
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;
  },

  /**
   * Set up Project Details Modal in DOM
   */
  setupModal() {
    if (document.getElementById("project-details-modal")) return;

    const modalHtml = `
      <div id="project-details-modal" class="project-modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="project-modal-dialog">
          <button type="button" class="project-modal-close" onclick="ProjectsManager.closeModal()" aria-label="Close dialog">
            <i class="fas fa-times"></i>
          </button>
          <div id="project-modal-content"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    // Close on backdrop click or escape key
    document.getElementById("project-details-modal").addEventListener("click", (e) => {
      if (e.target.id === "project-details-modal") {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  },

  /**
   * Open Modal with full project details
   */
  openModal(projectId) {
    const rawProj = this.projects.find(p => p.id === projectId);
    if (!rawProj) return;

    const p = this.validateProject(rawProj);
    const modal = document.getElementById("project-details-modal");
    const content = document.getElementById("project-modal-content");
    if (!modal || !content) return;

    const liveDemoLink = p.liveDemoUrl
      ? `<a href="${p.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> View Website</a>`
      : '';

    content.innerHTML = `
      <div class="modal-project-header">
        <span class="badge badge-cyan">${p.category}</span>
        <span class="badge badge-amber">${p.status}</span>
        <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); margin-left: auto;">${p.creationDate}</span>
      </div>

      <h2 style="font-size: 1.6rem; color: #fff; margin: 0.75rem 0 1rem;">${p.title}</h2>

      <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 1.25rem; max-height: 280px; background: #000;">
        <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.src='./assets/images/project-placeholder.svg'">
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.95rem; color: var(--cyan-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">OVERVIEW & DETAILS</h4>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 0.96rem;">${p.description}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; color: var(--cyan-primary); font-family: var(--font-mono); margin-bottom: 0.5rem;">TECHNOLOGIES EMPLOYED</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${p.technologies.map(t => `<span class="badge badge-cyan">${t}</span>`).join("")}
        </div>
      </div>

      ${liveDemoLink ? `
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); align-items: center;">
          ${liveDemoLink}
        </div>
      ` : ''}
    `;

    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  /**
   * Close Modal
   */
  closeModal() {
    const modal = document.getElementById("project-details-modal");
    if (!modal) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
};

if (typeof window !== "undefined") {
  window.ProjectsManager = ProjectsManager;
}