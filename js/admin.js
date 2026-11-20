/**
 * admin.js - Interactive Admin Controller & Operations Engine
 * Hardened with DOMSanitizer, Firebase Auth Sync, Image Optimization, & Path Resolution.
 */

const AdminController = {
  currentTab: "overview",
  isAuthenticated: false,

  init() {
    this.setupFirebaseListeners();
    this.bindSidebarNav();
    this.renderCurrentTab();
    this.setupProjectModal();
    this.setupCertModal();
  },

  setupFirebaseListeners() {
    if (window.FirebaseService) {
      window.FirebaseService.init();
      window.FirebaseService.onAuthStateChanged(user => {
        this.isAuthenticated = Boolean(user);
        const loginContainer = document.getElementById('admin-login-container');
        const dashboard = document.querySelector('.admin-layout');
        if (user && user.uid === ADMIN_UID) {
          if (loginContainer) loginContainer.style.display = 'none';
          if (dashboard) dashboard.style.display = 'flex';
        } else {
          if (loginContainer) loginContainer.style.display = 'flex';
          if (dashboard) dashboard.style.display = 'none';
        }
        this.updateAuthUI(user);
      });
    }
  },

  updateAuthUI(user) {
    const authStatusEl = document.getElementById("admin-auth-status");
    if (authStatusEl) {
      if (user) {
        authStatusEl.innerHTML = `
          <span class="badge badge-green"><i class="fas fa-user-shield"></i> Authenticated Admin (${DOMSanitizer.escapeHTML(user.email)})</span>
          <button class="btn btn-secondary btn-sm" onclick="AdminController.handleLogout()" style="margin-left: 0.5rem;">Logout</button>
        `;
      } else {
        const isFirebaseConfigured = window.FirebaseService && window.FirebaseService.isConfigured;
        authStatusEl.innerHTML = `
          <span class="badge badge-amber"><i class="fas fa-lock"></i> ${isFirebaseConfigured ? 'Admin Login Required' : 'Local Sandbox Mode (Configure Firebase in js/firebase-config.js)'}</span>
          ${isFirebaseConfigured ? '<button class="btn btn-primary btn-sm" onclick="AdminController.openLoginModal()" style="margin-left: 0.5rem;">Sign In</button>' : ''}
        `;
      }
    }
  },

  openLoginModal() {
    let modal = document.getElementById("admin-login-modal");
    if (!modal) {
      const html = `
        <div id="admin-login-modal" class="admin-modal-backdrop is-open">
          <div class="admin-modal-box" style="max-width: 420px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <h3 style="font-size: 1.25rem; color: #fff;"><i class="fas fa-lock" style="color: var(--cyan-primary);"></i> Admin Authentication</h3>
              <button class="project-modal-close" onclick="document.getElementById('admin-login-modal').remove()"><i class="fas fa-times"></i></button>
            </div>
            <form onsubmit="AdminController.handleLogin(event)">
              <div class="form-group">
                <label class="form-label">ADMIN EMAIL</label>
                <input type="email" id="login-email" class="form-input" placeholder="almasryadham601@gmail.com" required>
              </div>
              <div class="form-group">
                <label class="form-label">PASSWORD</label>
                <input type="password" id="login-password" class="form-input" placeholder="••••••••" required>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                <i class="fas fa-sign-in-alt"></i> Sign In to Firebase
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", html);
    } else {
      modal.classList.add("is-open");
    }
  },

  async handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    try {
      await window.FirebaseService.login(email, password);
      this.showToast("Authenticated successfully with Firebase!");
      const modal = document.getElementById("admin-login-modal");
      if (modal) modal.remove();
    } catch (e) {
      this.showToast(e.message, true);
    }
  },

  async handleLogout() {
    try {
      await window.FirebaseService.logout();
      this.showToast("Signed out from Firebase.");
    } catch (e) {
      this.showToast(e.message, true);
    }
  },

  showToast(message, isError = false) {
    let toast = document.getElementById("admin-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "admin-toast";
      toast.className = "admin-toast";
      document.body.appendChild(toast);
    }
    const safeMsg = DOMSanitizer ? DOMSanitizer.escapeHTML(message) : message;
    toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'}" style="color: ${isError ? '#ef4444' : '#10b981'};"></i> <span>${safeMsg}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll(".sidebar-nav-item").forEach(item => {
      if (item.dataset.tab === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    const titleEl = document.getElementById("admin-page-title");
    const titles = {
      overview: "System Overview",
      projects: "Manage Projects",
      skills: "Manage Skills",
      certificates: "Manage Certifications",
      education: "Manage Education",
      about: "Edit About Me",
      contact: "Edit Contact Information",
      settings: "Website Settings & Data Sync"
    };
    if (titleEl) titleEl.textContent = titles[tabId] || "Dashboard";

    const sidebar = document.querySelector(".admin-sidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");

    this.renderCurrentTab();
  },

  bindSidebarNav() {
    document.querySelectorAll(".sidebar-nav-item").forEach(item => {
      item.addEventListener("click", () => {
        this.switchTab(item.dataset.tab);
      });
    });

    const mobileToggle = document.getElementById("admin-sidebar-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        const sidebar = document.querySelector(".admin-sidebar");
        if (sidebar) sidebar.classList.toggle("mobile-open");
      });
    }
  },

  renderCurrentTab() {
    const container = document.getElementById("admin-view-container");
    if (!container) return;

    switch (this.currentTab) {
      case "overview":
        this.renderOverview(container);
        break;
      case "projects":
        this.renderProjectsTab(container);
        break;
      case "skills":
        this.renderSkillsTab(container);
        break;
      case "certificates":
        this.renderCertificatesTab(container);
        break;
      case "education":
        this.renderEducationTab(container);
        break;
      case "about":
        this.renderAboutTab(container);
        break;
      case "contact":
        this.renderContactTab(container);
        break;
      case "settings":
        this.renderSettingsTab(container);
        break;
      default:
        this.renderOverview(container);
    }
  },

  /* =========================================================================
     1. OVERVIEW SECTION
     ========================================================================= */
  renderOverview(container) {
    const profile = PortfolioStorage.getProfile();
    const projects = PortfolioStorage.getProjects();
    const skills = PortfolioStorage.getSkills();
    const certs = PortfolioStorage.getCertifications();
    const hasOverrides = PortfolioStorage.hasLocalOverrides();
    const s = DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div class="admin-notice-banner">
        <i class="fas fa-shield-alt"></i>
        <div class="notice-text">
          <h4>Production Security &amp; Firebase Cloud Architecture</h4>
          <p>
            This admin dashboard is isolated on <code>./admin.html</code> and is completely omitted from the public website navigation. 
            Edits are stored in browser <code>localStorage</code> for immediate previewing and can be exported to your static JS files for GitHub Pages deployment.
          </p>
        </div>
      </div>

      ${hasOverrides ? `
        <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #fbbf24;">
            <i class="fas fa-exclamation-circle"></i> LocalStorage Overrides Active. Each section can be reset independently without wiping other sections.
          </span>
          <button class="btn btn-secondary btn-sm" onclick="AdminController.switchTab('settings')">Manage Resets</button>
        </div>
      ` : ''}

      <div class="admin-metrics-grid">
        <div class="metric-card">
          <div class="metric-icon-box"><i class="fas fa-project-diagram"></i></div>
          <div class="metric-data">
            <h3>${projects.length}</h3>
            <span>Total Projects</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box"><i class="fas fa-laptop-code"></i></div>
          <div class="metric-data">
            <h3>${skills.length}</h3>
            <span>Documented Skills</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box"><i class="fas fa-certificate"></i></div>
          <div class="metric-data">
            <h3>${certs.length}</h3>
            <span>Active Certs / Training</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box"><i class="fas fa-user-shield"></i></div>
          <div class="metric-data">
            <h3 style="font-size: 1.25rem;">Active</h3>
            <span>${s.escapeHTML(profile.currentFocus || "CCNA Studies")}</span>
          </div>
        </div>
      </div>

      <div style="margin-top: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
          <h3 style="font-size: 1.15rem; color: #fff;">Projects Overview</h3>
          <button class="btn btn-primary btn-sm" onclick="AdminController.switchTab('projects')">
            <i class="fas fa-arrow-right"></i> Manage All Projects
          </button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Technologies</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              ${projects.map(p => `
                <tr>
                  <td><strong>${s.escapeHTML(p.title)}</strong></td>
                  <td><span class="badge badge-blue">${s.escapeHTML(p.category)}</span></td>
                  <td><span class="badge badge-amber">${s.escapeHTML(p.status)}</span></td>
                  <td style="font-size: 0.82rem; color: var(--text-secondary);">${(p.technologies || []).slice(0, 3).map(t => s.escapeHTML(t)).join(", ")}${p.technologies && p.technologies.length > 3 ? '...' : ''}</td>
                  <td>${p.featured ? '<span class="badge badge-green">Yes</span>' : '<span style="color: var(--text-muted);">No</span>'}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /* =========================================================================
     2. MANAGE PROJECTS SECTION
     ========================================================================= */
  renderProjectsTab(container) {
    const projects = PortfolioStorage.getProjects();
    const hasProjOverride = PortfolioStorage.hasSectionOverride("projects");
    const s = DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff;">Projects Repository</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Add, edit, or delete portfolio projects. Updates are synced immediately.</p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          ${hasProjOverride ? `
            <button class="btn btn-outline" onclick="AdminController.resetSectionData('projects', 'Projects')">
              <i class="fas fa-undo"></i> Reset Projects Only
            </button>
          ` : ''}
          <button class="btn btn-primary" onclick="AdminController.openProjectModal()">
            <i class="fas fa-plus"></i> Add New Project
          </button>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${projects.map(p => `
              <tr>
                <td style="width: 60px;">
                  <img src="${s.sanitizeURL(p.image) || './assets/images/project-placeholder.svg'}" alt="${s.escapeHTML(p.title)}" style="width: 48px; height: 32px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-subtle);" onerror="this.src='./assets/images/project-placeholder.svg'">
                </td>
                <td>
                  <strong>${s.escapeHTML(p.title)}</strong>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${s.escapeHTML(p.id)}</div>
                </td>
                <td><span class="badge badge-blue">${s.escapeHTML(p.category)}</span></td>
                <td><span class="badge badge-amber">${s.escapeHTML(p.status)}</span></td>
                <td>${p.featured ? '<span class="badge badge-green"><i class="fas fa-star"></i> Featured</span>' : '<span style="color: var(--text-muted); font-size: 0.8rem;">Standard</span>'}</td>
                <td>
                  <div style="display: flex; gap: 0.35rem;">
                    ${p.githubUrl ? '<i class="fab fa-github" title="GitHub Available" style="color: var(--cyan-primary);"></i>' : '<i class="fab fa-github" title="No GitHub" style="color: var(--text-muted); opacity: 0.3;"></i>'}
                    ${p.liveDemoUrl ? '<i class="fas fa-external-link-alt" title="Demo Available" style="color: var(--green-status);"></i>' : '<i class="fas fa-external-link-alt" title="No Demo" style="color: var(--text-muted); opacity: 0.3;"></i>'}
                  </div>
                </td>
                <td>
                  <div class="table-actions">
                    <button class="btn-icon-action" title="Edit Project" onclick="AdminController.openProjectModal('${s.escapeHTML(p.id)}')">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn-icon-action danger" title="Delete Project" onclick="AdminController.deleteProject('${s.escapeHTML(p.id)}')">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  setupProjectModal() {
    if (document.getElementById("admin-project-modal")) return;

    const modalHtml = `
      <div id="admin-project-modal" class="admin-modal-backdrop">
        <div class="admin-modal-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 id="project-modal-form-title" style="font-size: 1.35rem; color: #fff;">Add Project</h3>
            <button class="project-modal-close" onclick="AdminController.closeProjectModal()"><i class="fas fa-times"></i></button>
          </div>

          <form id="project-form" onsubmit="AdminController.saveProject(event)">
            <input type="hidden" id="proj-edit-mode" value="add">
            
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">PROJECT ID (UNIQUE SLUG)</label>
                <input type="text" id="proj-id" class="form-input" placeholder="e.g. ospf-packet-tracer-lab" required>
              </div>

              <div class="form-group">
                <label class="form-label">PROJECT TITLE</label>
                <input type="text" id="proj-title" class="form-input" placeholder="e.g. Multi-Area OSPF Routing Lab" required>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">CATEGORY</label>
                <select id="proj-category" class="form-input">
                  <option value="Networking">Networking</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Academic Projects">Academic Projects</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">STATUS</label>
                <input type="text" id="proj-status" class="form-input" placeholder="e.g. Lab Simulation / Academic Project" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">DESCRIPTION</label>
              <textarea id="proj-description" class="form-textarea" rows="3" placeholder="Detailed project overview..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">TECHNOLOGIES (COMMA SEPARATED)</label>
              <input type="text" id="proj-technologies" class="form-input" placeholder="e.g. Cisco Packet Tracer, OSPF, IPv4 Subnetting" required>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">IMAGE PATH OR FILE</label>
                <input type="text" id="proj-image" class="form-input" placeholder="./assets/images/project-placeholder.svg">
                <input type="file" id="proj-image-file" accept="image/*" style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted);" onchange="AdminController.handleImageUpload(event)">
              </div>

              <div class="form-group">
                <label class="form-label">CREATION DATE / YEAR</label>
                <input type="text" id="proj-date" class="form-input" placeholder="e.g. 2025">
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">GITHUB REPOSITORY URL (OPTIONAL)</label>
                <input type="url" id="proj-github" class="form-input" placeholder="https://github.com/... or leave blank">
              </div>

              <div class="form-group">
                <label class="form-label">LIVE DEMO URL (OPTIONAL)</label>
                <input type="url" id="proj-demo" class="form-input" placeholder="https://... or leave blank">
              </div>
            </div>

            <div class="form-group" style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
              <input type="checkbox" id="proj-featured" style="width: 18px; height: 18px; accent-color: var(--cyan-primary);">
              <label for="proj-featured" style="font-size: 0.9rem; color: #fff; cursor: pointer;">Mark as Featured Project</label>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="AdminController.closeProjectModal()">Cancel</button>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Project</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  },

  handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("proj-image").value = e.target.result;
      AdminController.showToast("Image loaded into project form!");
    };
    reader.readAsDataURL(file);
  },

  openProjectModal(projectId = null) {
    this.setupProjectModal();
    const modal = document.getElementById("admin-project-modal");
    const formTitle = document.getElementById("project-modal-form-title");
    const editModeInput = document.getElementById("proj-edit-mode");

    if (projectId) {
      const projects = PortfolioStorage.getProjects();
      const proj = projects.find(p => p.id === projectId);
      if (!proj) return;

      formTitle.textContent = "Edit Project";
      editModeInput.value = projectId;

      document.getElementById("proj-id").value = proj.id;
      document.getElementById("proj-id").disabled = true;
      document.getElementById("proj-title").value = proj.title || "";
      document.getElementById("proj-category").value = proj.category || "Networking";
      document.getElementById("proj-status").value = proj.status || "Completed";
      document.getElementById("proj-description").value = proj.description || "";
      document.getElementById("proj-technologies").value = (proj.technologies || []).join(", ");
      document.getElementById("proj-image").value = proj.image || "";
      document.getElementById("proj-date").value = proj.creationDate || "";
      document.getElementById("proj-github").value = proj.githubUrl || "";
      document.getElementById("proj-demo").value = proj.liveDemoUrl || "";
      document.getElementById("proj-featured").checked = Boolean(proj.featured);
    } else {
      formTitle.textContent = "Add New Project";
      editModeInput.value = "add";
      document.getElementById("project-form").reset();
      document.getElementById("proj-id").disabled = false;
      document.getElementById("proj-image").value = "./assets/images/project-placeholder.svg";
      document.getElementById("proj-date").value = new Date().getFullYear().toString();
    }

    modal.classList.add("is-open");
  },

  closeProjectModal() {
    const modal = document.getElementById("admin-project-modal");
    if (modal) modal.classList.remove("is-open");
  },

  saveProject(event) {
    event.preventDefault();
    const editMode = document.getElementById("proj-edit-mode").value;
    const projects = PortfolioStorage.getProjects();

    const techString = document.getElementById("proj-technologies").value;
    const techArray = techString.split(",").map(t => t.trim()).filter(Boolean);

    const projectData = {
      id: document.getElementById("proj-id").value.trim(),
      title: document.getElementById("proj-title").value.trim(),
      category: document.getElementById("proj-category").value,
      status: document.getElementById("proj-status").value.trim(),
      description: document.getElementById("proj-description").value.trim(),
      technologies: techArray,
      image: document.getElementById("proj-image").value.trim() || "./assets/images/project-placeholder.svg",
      creationDate: document.getElementById("proj-date").value.trim() || new Date().getFullYear().toString(),
      githubUrl: document.getElementById("proj-github").value.trim(),
      liveDemoUrl: document.getElementById("proj-demo").value.trim(),
      featured: document.getElementById("proj-featured").checked
    };

    if (editMode === "add") {
      if (projects.some(p => p.id === projectData.id)) {
        this.showToast("A project with this ID already exists!", true);
        return;
      }
      projects.unshift(projectData);
      PortfolioStorage.setProjects(projects);
      this.showToast("New project added successfully!");
    } else {
      const index = projects.findIndex(p => p.id === editMode);
      if (index !== -1) {
        projects[index] = projectData;
        PortfolioStorage.setProjects(projects);
        this.showToast("Project updated successfully!");
      }
    }

    this.closeProjectModal();
    this.renderProjectsTab(document.getElementById("admin-view-container"));
  },

  deleteProject(projectId) {
    if (!confirm(`Are you sure you want to delete project '${projectId}'?`)) return;

    let projects = PortfolioStorage.getProjects();
    projects = projects.filter(p => p.id !== projectId);
    PortfolioStorage.setProjects(projects);
    this.showToast("Project deleted.");
    this.renderProjectsTab(document.getElementById("admin-view-container"));
  },

  /* =========================================================================
     3. MANAGE SKILLS SECTION
     ========================================================================= */
  renderSkillsTab(container) {
    const skills = PortfolioStorage.getSkills();
    const hasSkillsOverride = PortfolioStorage.hasSectionOverride("skills");
    const s = DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff;">Technical Skills</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Manage current skill items and honest proficiency levels.</p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          ${hasSkillsOverride ? `
            <button class="btn btn-outline" onclick="AdminController.resetSectionData('skills', 'Skills')">
              <i class="fas fa-undo"></i> Reset Skills Only
            </button>
          ` : ''}
          <button class="btn btn-primary" onclick="AdminController.addSkillPrompt()">
            <i class="fas fa-plus"></i> Add Skill
          </button>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Proficiency Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${skills.map((sk, index) => `
              <tr>
                <td><strong>${s.escapeHTML(sk.name)}</strong></td>
                <td><span class="badge badge-blue">${s.escapeHTML(sk.category)}</span></td>
                <td><span class="badge badge-cyan">${s.escapeHTML(sk.level)}</span></td>
                <td>
                  <div class="table-actions">
                    <button class="btn-icon-action danger" title="Delete Skill" onclick="AdminController.deleteSkill(${index})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  addSkillPrompt() {
    const name = prompt("Enter Skill Name (e.g. Wireshark Packet Analysis):");
    if (!name) return;
    const category = prompt("Enter Category (e.g. Networking & Infrastructure, Cybersecurity):", "Networking & Infrastructure");
    const level = prompt("Enter Level (Hands-on & Academic, Certified, Excellent):", "Hands-on & Academic");

    const skills = PortfolioStorage.getSkills();
    skills.push({
      id: `skill-${Date.now()}`,
      name: name.trim(),
      category: category ? category.trim() : "General IT",
      level: level ? level.trim() : "Hands-on & Academic",
      percentage: 80,
      description: "Added via Admin Dashboard",
      icon: "fas fa-check"
    });
    PortfolioStorage.setSkills(skills);
    this.showToast("Skill added!");
    this.renderSkillsTab(document.getElementById("admin-view-container"));
  },

  deleteSkill(index) {
    const skills = PortfolioStorage.getSkills();
    skills.splice(index, 1);
    PortfolioStorage.setSkills(skills);
    this.showToast("Skill deleted.");
    this.renderSkillsTab(document.getElementById("admin-view-container"));
  },

  /* =========================================================================
     4. MANAGE CERTIFICATIONS SECTION (Preserves exact paths from certifications.js)
     ========================================================================= */
  resolveCertImage(cert) {
    if (!cert) return "./assets/images/project-placeholder.svg";
    const rawImg = String(cert.image || "").trim();
    if (rawImg) return rawImg;
    if (window.PortfolioRenderer && typeof window.PortfolioRenderer.resolveCertImage === "function") {
      return window.PortfolioRenderer.resolveCertImage(cert) || "./assets/images/project-placeholder.svg";
    }
    return "./assets/images/project-placeholder.svg";
  },

  renderCertificatesTab(container) {
    const certs = PortfolioStorage.getCertifications();
    const hasCertsOverride = PortfolioStorage.hasSectionOverride("certifications");
    const s = DOMSanitizer || { escapeHTML: str => String(str || ''), sanitizeURL: u => u };

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h3 style="font-size: 1.25rem; color: #fff;">Certificates &amp; Courses (${certs.length})</h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">Add, edit, or delete certificates and manage their image paths.</p>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          ${hasCertsOverride ? `
            <button class="btn btn-outline" onclick="AdminController.resetSectionData('certifications', 'Certifications')">
              <i class="fas fa-undo"></i> Reset Certificates Only
            </button>
          ` : ''}
          <button class="btn btn-outline" onclick="AdminController.exportCertificationsAsJS()">
            <i class="fas fa-file-code"></i> Download certifications.js
          </button>
          <button class="btn btn-primary" onclick="AdminController.openCertModal()">
            <i class="fas fa-plus"></i> Add Certificate
          </button>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title (EN / AR)</th>
              <th>Issuer</th>
              <th>Date / ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${certs.map((c, index) => {
              const resolvedSrc = this.resolveCertImage(c);
              const isBase64 = String(resolvedSrc || "").startsWith("data:image");
              const displayPath = isBase64 ? "Uploaded Image (Stored Locally)" : (resolvedSrc || "No image path");
              return `
              <tr>
                <td style="width: 65px;">
                  <img src="${s.sanitizeURL(resolvedSrc) || './assets/images/project-placeholder.svg'}" alt="${s.escapeHTML(c.title)}"
                    style="width: 54px; height: 38px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-subtle);"
                    onerror="this.src='./assets/images/project-placeholder.svg'">
                </td>
                <td style="max-width: 280px; overflow: hidden; text-overflow: ellipsis;">
                  <strong>${s.escapeHTML(c.title)}</strong>
                  ${c.titleAr ? `<div style="font-size: 0.8rem; color: var(--cyan-primary);">${s.escapeHTML(c.titleAr)}</div>` : ''}
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.escapeHTML(displayPath)}</div>
                </td>
                <td><span style="font-size: 0.85rem; color: var(--text-secondary);">${s.escapeHTML(c.issuer)}</span></td>
                <td>
                  <div style="font-size: 0.8rem; font-family: var(--font-mono); color: #fff;">${s.escapeHTML(c.date || '-')}</div>
                  ${c.credentialId ? `<div style="font-size: 0.74rem; color: var(--cyan-primary);">ID: ${s.escapeHTML(c.credentialId)}</div>` : ''}
                </td>
                <td><span class="badge badge-green">${s.escapeHTML(c.status || 'Completed')}</span></td>
                <td>
                  <div class="table-actions">
                    <button class="btn-icon-action" title="Edit Certificate" onclick="AdminController.openCertModal(${index})">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn-icon-action danger" title="Delete Certificate" onclick="AdminController.deleteCert(${index})">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `;}).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  setupCertModal() {
    if (document.getElementById("admin-cert-modal")) return;

    const modalHtml = `
      <div id="admin-cert-modal" class="admin-modal-backdrop">
        <div class="admin-modal-box" style="max-width: 680px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <h3 id="cert-modal-form-title" style="font-size: 1.3rem; color: #fff;">Add Certificate</h3>
            <button class="project-modal-close" onclick="AdminController.closeCertModal()"><i class="fas fa-times"></i></button>
          </div>

          <form id="cert-form" onsubmit="AdminController.saveCert(event)">
            <input type="hidden" id="cert-edit-index" value="-1">

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">TITLE (ENGLISH)</label>
                <input type="text" id="cert-title" class="form-input" placeholder="e.g. CCNA & Cybersecurity Training" required>
              </div>
              <div class="form-group">
                <label class="form-label">TITLE (ARABIC)</label>
                <input type="text" id="cert-title-ar" class="form-input" placeholder="البرنامج التدريبي CCNA والأمن السيبراني" dir="rtl">
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">ISSUER (ENGLISH)</label>
                <input type="text" id="cert-issuer" class="form-input" placeholder="e.g. Delta Technological University" required>
              </div>
              <div class="form-group">
                <label class="form-label">ISSUER (ARABIC)</label>
                <input type="text" id="cert-issuer-ar" class="form-input" placeholder="جامعة الدلتا التكنولوجية" dir="rtl">
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">ISSUE DATE</label>
                <input type="text" id="cert-date" class="form-input" placeholder="e.g. 2025-09-18">
              </div>
              <div class="form-group">
                <label class="form-label">CREDENTIAL ID / GRADE (OPTIONAL)</label>
                <input type="text" id="cert-cred-id" class="form-input" placeholder="e.g. 001105 or Excellent (94%)">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">CERTIFICATE IMAGE PATH OR UPLOAD</label>
              <input type="text" id="cert-image" class="form-input" placeholder="./assets/images/certificates/dtu-ccna.jpg">
              <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                <input type="file" id="cert-image-file" accept="image/*" style="font-size: 0.8rem; color: var(--text-muted);" onchange="AdminController.handleCertImageUpload(event)">
                <img id="cert-image-preview" src="" alt="Preview" style="display: none; height: 46px; border-radius: 4px; border: 1px solid var(--cyan-primary);">
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">SUMMARY (ENGLISH)</label>
                <textarea id="cert-summary" class="form-textarea" rows="2" placeholder="Brief description of skills covered..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">SUMMARY (ARABIC)</label>
                <textarea id="cert-summary-ar" class="form-textarea" rows="2" placeholder="وصف مختصر لمحتوى الشهادة..." dir="rtl"></textarea>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">TOPICS (COMMA SEPARATED)</label>
                <input type="text" id="cert-topics" class="form-input" placeholder="CCNA, Network Security, Routing">
              </div>
              <div class="form-group">
                <label class="form-label">STATUS</label>
                <select id="cert-status" class="form-input">
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.25rem;">
              <button type="button" class="btn btn-secondary" onclick="AdminController.closeCertModal()">Cancel</button>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Certificate</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
  },

  handleCertImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1000;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
        document.getElementById("cert-image").value = compressedDataUrl;

        const preview = document.getElementById("cert-image-preview");
        if (preview) {
          preview.src = compressedDataUrl;
          preview.style.display = "block";
        }
        AdminController.showToast("Certificate image optimized & loaded!");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  openCertModal(index = -1) {
    this.setupCertModal();
    const modal = document.getElementById("admin-cert-modal");
    const formTitle = document.getElementById("cert-modal-form-title");
    const indexInput = document.getElementById("cert-edit-index");
    const preview = document.getElementById("cert-image-preview");

    if (index >= 0) {
      const certs = PortfolioStorage.getCertifications();
      const c = certs[index];
      if (!c) return;

      formTitle.textContent = "Edit Certificate";
      indexInput.value = index;

      document.getElementById("cert-title").value = c.title || "";
      document.getElementById("cert-title-ar").value = c.titleAr || "";
      document.getElementById("cert-issuer").value = c.issuer || "";
      document.getElementById("cert-issuer-ar").value = c.issuerAr || "";
      document.getElementById("cert-date").value = c.date || "";
      document.getElementById("cert-cred-id").value = c.credentialId || c.grade || "";
      document.getElementById("cert-image").value = c.image || "";
      document.getElementById("cert-summary").value = c.summary || "";
      document.getElementById("cert-summary-ar").value = c.summaryAr || "";
      document.getElementById("cert-topics").value = (c.topics || []).join(", ");
      document.getElementById("cert-status").value = c.status || "Completed";

      if (c.image && preview) {
        preview.src = c.image;
        preview.style.display = "block";
      } else if (preview) {
        preview.style.display = "none";
      }
    } else {
      formTitle.textContent = "Add New Certificate";
      indexInput.value = "-1";
      document.getElementById("cert-form").reset();
      document.getElementById("cert-image").value = "./assets/images/certificates/";
      if (preview) preview.style.display = "none";
    }

    modal.classList.add("is-open");
  },

  closeCertModal() {
    const modal = document.getElementById("admin-cert-modal");
    if (modal) modal.classList.remove("is-open");
  },

  saveCert(event) {
    event.preventDefault();
    const index = parseInt(document.getElementById("cert-edit-index").value, 10);
    const certs = PortfolioStorage.getCertifications();

    const existing = index >= 0 ? certs[index] : {};
    const titleVal = document.getElementById("cert-title").value.trim();

    const certObj = {
      ...existing,
      id: existing.id || titleVal.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `cert-${Date.now()}`,
      title: titleVal,
      titleAr: document.getElementById("cert-title-ar").value.trim(),
      issuer: document.getElementById("cert-issuer").value.trim(),
      issuerAr: document.getElementById("cert-issuer-ar").value.trim(),
      date: document.getElementById("cert-date").value.trim(),
      credentialId: document.getElementById("cert-cred-id").value.trim(),
      image: document.getElementById("cert-image").value.trim(),
      summary: document.getElementById("cert-summary").value.trim(),
      summaryAr: document.getElementById("cert-summary-ar").value.trim(),
      topics: document.getElementById("cert-topics").value.split(",").map(t => t.trim()).filter(Boolean),
      status: document.getElementById("cert-status").value,
      verified: true
    };

    if (index >= 0) {
      certs[index] = certObj;
      this.showToast("Certificate updated successfully!");
    } else {
      certs.unshift(certObj);
      this.showToast("New certificate added!");
    }

    PortfolioStorage.setCertifications(certs);
    this.closeCertModal();
    this.renderCertificatesTab(document.getElementById("admin-view-container"));
  },

  deleteCert(index) {
    const certs = PortfolioStorage.getCertifications();
    const target = certs[index];
    if (!confirm(`Are you sure you want to delete "${target ? target.title : 'this certificate'}"?`)) return;

    certs.splice(index, 1);
    PortfolioStorage.setCertifications(certs);
    this.showToast("Certificate deleted.");
    this.renderCertificatesTab(document.getElementById("admin-view-container"));
  },

  exportCertificationsAsJS() {
    const certs = PortfolioStorage.getCertifications();
    const content = `/**\n * Certifications & Training Data\n * Exported from Admin Dashboard\n */\n\nconst CERTIFICATIONS_DATA = ${JSON.stringify(certs, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.CERTIFICATIONS_DATA = CERTIFICATIONS_DATA;\n}\n`;
    const blob = new Blob([content], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certifications.js";
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("Downloaded updated certifications.js!");
  },

  /* =========================================================================
     5. MANAGE EDUCATION SECTION
     ========================================================================= */
  renderEducationTab(container) {
    const eduList = PortfolioStorage.getEducation();
    const edu = eduList[0] || {};
    const hasEduOverride = PortfolioStorage.hasSectionOverride("education");
    const s = DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div class="admin-form-card">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.25rem; color: #fff;">Edit Education Information</h3>
          ${hasEduOverride ? `
            <button type="button" class="btn btn-outline btn-sm" onclick="AdminController.resetSectionData('education', 'Education')">
              <i class="fas fa-undo"></i> Reset Education Only
            </button>
          ` : ''}
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Update university details, degree, and focus areas.</p>

        <form onsubmit="AdminController.saveEducation(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">INSTITUTION NAME</label>
              <input type="text" id="edu-inst" class="form-input" value="${s.escapeHTML(edu.institution || '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label">FIELD OF STUDY</label>
              <input type="text" id="edu-field" class="form-input" value="${s.escapeHTML(edu.field || '')}" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">LOCATION</label>
              <input type="text" id="edu-location" class="form-input" value="${s.escapeHTML(edu.location || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">STATUS</label>
              <input type="text" id="edu-status" class="form-input" value="${s.escapeHTML(edu.status || '')}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">CURRICULUM TOPICS (COMMA SEPARATED)</label>
            <input type="text" id="edu-topics" class="form-input" value="${s.escapeHTML((edu.coreFocus || []).join(', '))}">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-save"></i> Save Education Details
          </button>
        </form>
      </div>
    `;
  },

  saveEducation(event) {
    event.preventDefault();
    const edu = {
      institution: document.getElementById("edu-inst").value.trim(),
      field: document.getElementById("edu-field").value.trim(),
      location: document.getElementById("edu-location").value.trim(),
      status: document.getElementById("edu-status").value.trim(),
      description: "Pursuing rigorous coursework covering computer networking, system administration, and software development fundamentals.",
      coreFocus: document.getElementById("edu-topics").value.split(",").map(t => t.trim()).filter(Boolean)
    };
    PortfolioStorage.setEducation([edu]);
    this.showToast("Education details saved!");
  },

  /* =========================================================================
     6. EDIT ABOUT ME SECTION
     ========================================================================= */
  renderAboutTab(container) {
    const profile = PortfolioStorage.getProfile();
    const about = profile.about || { heading: "", paragraphs: [] };
    const hasProfileOverride = PortfolioStorage.hasSectionOverride("profile");
    const s = DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div class="admin-form-card">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.25rem; color: #fff;">Edit About Me Profile</h3>
          ${hasProfileOverride ? `
            <button type="button" class="btn btn-outline btn-sm" onclick="AdminController.resetSectionData('profile', 'Profile & About')">
              <i class="fas fa-undo"></i> Reset Profile Only
            </button>
          ` : ''}
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Modify the narrative intro and paragraphs shown on the portfolio.</p>

        <form onsubmit="AdminController.saveAbout(event)">
          <div class="form-group">
            <label class="form-label">ABOUT SECTION HEADING</label>
            <input type="text" id="about-heading" class="form-input" value="${s.escapeHTML(about.heading || '')}" required>
          </div>

          <div class="form-group">
            <label class="form-label">HERO BRIEF INTRODUCTION</label>
            <textarea id="about-hero-intro" class="form-textarea" rows="3" required>${s.escapeHTML(profile.heroIntro || '')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">PARAGRAPH 1 (BACKGROUND)</label>
            <textarea id="about-p1" class="form-textarea" rows="3">${s.escapeHTML(about.paragraphs[0] || '')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">PARAGRAPH 2 (CURRENT CCNA LEARNING FOCUS)</label>
            <textarea id="about-p2" class="form-textarea" rows="3">${s.escapeHTML(about.paragraphs[1] || '')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">PARAGRAPH 3 (PENETRATION TESTING LONG-TERM GOAL)</label>
            <textarea id="about-p3" class="form-textarea" rows="3">${s.escapeHTML(about.paragraphs[2] || '')}</textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-save"></i> Save About Information
          </button>
        </form>
      </div>
    `;
  },

  saveAbout(event) {
    event.preventDefault();
    const profile = PortfolioStorage.getProfile();
    profile.heroIntro = document.getElementById("about-hero-intro").value.trim();
    profile.about = {
      heading: document.getElementById("about-heading").value.trim(),
      paragraphs: [
        document.getElementById("about-p1").value.trim(),
        document.getElementById("about-p2").value.trim(),
        document.getElementById("about-p3").value.trim()
      ]
    };
    PortfolioStorage.setProfile(profile);
    this.showToast("About Me updated!");
  },

  /* =========================================================================
     7. EDIT CONTACT INFORMATION SECTION
     ========================================================================= */
  renderContactTab(container) {
    const profile = PortfolioStorage.getProfile();
    const contact = profile.contact || {};
    const hasProfileOverride = PortfolioStorage.hasSectionOverride("profile");
    const s = DOMSanitizer || { escapeHTML: str => String(str || '') };

    container.innerHTML = `
      <div class="admin-form-card">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.25rem; color: #fff;">Edit Contact Information</h3>
          ${hasProfileOverride ? `
            <button type="button" class="btn btn-outline btn-sm" onclick="AdminController.resetSectionData('profile', 'Profile & Contact')">
              <i class="fas fa-undo"></i> Reset Profile Only
            </button>
          ` : ''}
        </div>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Update your email, social profile links, and direct communication channels.</p>

        <form onsubmit="AdminController.saveContact(event)">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">EMAIL ADDRESS</label>
              <input type="email" id="contact-email" class="form-input" value="${s.escapeHTML(contact.email || '')}" required>
            </div>
            <div class="form-group">
              <label class="form-label">PHONE / WHATSAPP</label>
              <input type="text" id="contact-phone" class="form-input" value="${s.escapeHTML(contact.phone || '')}">
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">LINKEDIN URL</label>
              <input type="url" id="contact-linkedin" class="form-input" value="${s.escapeHTML(contact.linkedin || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">GITHUB PROFILE URL</label>
              <input type="url" id="contact-github" class="form-input" value="${s.escapeHTML(contact.github || '')}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">LOCATION</label>
            <input type="text" id="contact-location" class="form-input" value="${s.escapeHTML(contact.location || '')}">
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">
            <i class="fas fa-save"></i> Save Contact Channels
          </button>
        </form>
      </div>
    `;
  },

  saveContact(event) {
    event.preventDefault();
    const profile = PortfolioStorage.getProfile();
    profile.contact = {
      email: document.getElementById("contact-email").value.trim(),
      phone: document.getElementById("contact-phone").value.trim(),
      whatsapp: `https://wa.me/${(document.getElementById("contact-phone").value || '').replace(/[^0-9]/g, '')}`,
      linkedin: document.getElementById("contact-linkedin").value.trim(),
      github: document.getElementById("contact-github").value.trim(),
      location: document.getElementById("contact-location").value.trim()
    };
    PortfolioStorage.setProfile(profile);
    this.showToast("Contact details saved!");
  },

  /* =========================================================================
     8. WEBSITE SETTINGS & DATA SYNC SECTION
     ========================================================================= */
  renderSettingsTab(container) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        <div class="admin-notice-banner">
          <i class="fas fa-sync-alt"></i>
          <div class="notice-text">
            <h4>Content Management Methods Explained</h4>
            <p>
              <strong>Method 1: Direct File Editing:</strong> Open <code>js/data/certifications.js</code> or <code>js/data/projects.js</code> in VS Code and edit the data objects directly.<br><br>
              <strong>Method 2: Admin Dashboard (Forms):</strong> Make edits using the forms here. Edits are stored in your browser's <code>localStorage</code> and reflected live on your site. You can download updated <code>.js</code> files at any time.
            </p>
          </div>
        </div>

        <div class="admin-form-card">
          <h4 style="font-size: 1.15rem; color: #fff; margin-bottom: 0.5rem;">Export Data</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Download your current modifications to place into your project source files.
          </p>

          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <button class="btn btn-primary" onclick="AdminController.exportCertificationsAsJS()">
              <i class="fas fa-certificate"></i> Download Updated certifications.js
            </button>
            <button class="btn btn-primary" onclick="PortfolioStorage.exportProjectsAsJS()">
              <i class="fas fa-file-code"></i> Download Updated projects.js
            </button>
            <button class="btn btn-outline" onclick="PortfolioStorage.exportAllAsJSON()">
              <i class="fas fa-download"></i> Export Full JSON Backup
            </button>
          </div>
        </div>

        <div class="admin-form-card">
          <h4 style="font-size: 1.15rem; color: #fff; margin-bottom: 0.5rem;">Import Data from Backup</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Upload an exported JSON backup file to restore all saved information.
          </p>

          <input type="file" id="import-json-file" accept=".json" style="margin-bottom: 1rem; color: var(--text-secondary);">
          <br>
          <button class="btn btn-secondary" onclick="AdminController.handleImportJSON()">
            <i class="fas fa-file-import"></i> Restore from JSON
          </button>
        </div>

        <div class="admin-form-card" style="border-color: rgba(239, 68, 68, 0.3);">
          <h4 style="font-size: 1.15rem; color: #ef4444; margin-bottom: 0.5rem;">Reset All Local Dashboard Changes</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Clears browser <code>localStorage</code> overrides across <strong>all</strong> sections at once and returns them to <code>js/data/</code>. Use section-specific reset buttons inside each tab if you only want to reset one part.
          </p>

          <button class="btn btn-secondary" style="border-color: rgba(239, 68, 68, 0.5); color: #ef4444;" onclick="AdminController.resetData()">
            <i class="fas fa-trash-restore"></i> Reset All Sections to Source Files
          </button>
        </div>
      </div>
    `;
  },

  handleImportJSON() {
    const fileInput = document.getElementById("import-json-file");
    const file = fileInput ? fileInput.files[0] : null;
    if (!file) {
      this.showToast("Please select a JSON file first.", true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = PortfolioStorage.importFromJSON(e.target.result);
      if (res.success) {
        this.showToast("JSON Data Restored Successfully!");
        this.renderCurrentTab();
      } else {
        this.showToast(res.message, true);
      }
    };
    reader.readAsText(file);
  },

  resetSectionData(section, label = section) {
    if (!confirm(`Reset only "${label}" to its source file in js/data/? All other sections and uploaded images will remain untouched.`)) return;
    const ok = PortfolioStorage.resetSection(section);
    if (ok) {
      this.showToast(`Reset "${label}" to source file.`);
      this.renderCurrentTab();
    }
  },

  resetData() {
    if (!confirm("Are you sure you want to discard local edits across ALL sections and reset to the original files in js/data/?")) return;
    PortfolioStorage.resetToDefaults();
    this.showToast("Reset completed. Using static data files.");
    this.renderCurrentTab();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AdminController.init();
});