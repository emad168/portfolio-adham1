/**
 * storage.js - Centralized Data Provider & Local Storage Synchronizer
 *
 * Bridges Method 1 (Direct JavaScript Data Files) & Method 2 (Admin Dashboard LocalStorage)
 *
 * Architecture:
 * - Checks localStorage for user-modified datasets.
 * - If found, uses the locally saved version (allowing live preview of dashboard edits).
 * - If not found, falls back cleanly to the static data files in js/data/.
 * - Provides export/import/reset capabilities per section or globally.
 */

const STORAGE_KEYS = {
  PROFILE: "adham_portfolio_profile_v1",
  SKILLS: "adham_portfolio_skills_v1",
  PROJECTS: "adham_portfolio_projects_v1",
  EDUCATION: "adham_portfolio_education_v1",
  CERTIFICATIONS: "adham_portfolio_certifications_v1",
  JOURNEY: "adham_portfolio_journey_v1"
};

const SECTION_KEY_MAP = {
  profile: STORAGE_KEYS.PROFILE,
  skills: STORAGE_KEYS.SKILLS,
  projects: STORAGE_KEYS.PROJECTS,
  education: STORAGE_KEYS.EDUCATION,
  certifications: STORAGE_KEYS.CERTIFICATIONS,
  journey: STORAGE_KEYS.JOURNEY
};

const PortfolioStorage = {
  /**
   * Deep clone helper to prevent direct mutation of static dataset globals
   */
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Get Profile Data (Local Override > Static Data File)
   */
  getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error for profile:", e);
    }
    return this.clone(window.PROFILE_DATA || {});
  },

  setProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  /**
   * Get Skills Data
   */
  getSkills() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error for skills:", e);
    }
    return this.clone(window.SKILLS_DATA || []);
  },

  setSkills(skills) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  },

  /**
   * Get Projects Data
   */
  getProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error for projects:", e);
    }
    return this.clone(window.PROJECTS_DATA || []);
  },

  setProjects(projects) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  /**
   * Get Education Data
   */
  getEducation() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error for education:", e);
    }
    return this.clone(window.EDUCATION_DATA || []);
  },

  setEducation(education) {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  },

  /**
   * Get Certifications Data directly from static js/data/certifications.js
   */
  getCertifications() {
    return this.clone(window.CERTIFICATIONS_DATA || []);
  },

  setCertifications(certifications) {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications));
  },

  /**
   * Get Learning Journey Data
   */
  getJourney() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOURNEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Storage read error for journey:", e);
    }
    return this.clone(window.JOURNEY_DATA || []);
  },

  setJourney(journey) {
    localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(journey));
  },

  /**
   * Check if any local overrides exist in localStorage
   */
  hasLocalOverrides() {
    return Object.values(STORAGE_KEYS).some(key => Boolean(localStorage.getItem(key)));
  },

  /**
   * Check if a specific section has a local override
   */
  hasSectionOverride(section) {
    const key = SECTION_KEY_MAP[String(section || "").toLowerCase()];
    return key ? Boolean(localStorage.getItem(key)) : false;
  },

  /**
   * Export all datasets as a single downloadable JSON backup
   */
  exportAllAsJSON() {
    const backup = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      author: "Adham Sabry",
      data: {
        profile: this.getProfile(),
        skills: this.getSkills(),
        projects: this.getProjects(),
        education: this.getEducation(),
        certifications: this.getCertifications(),
        journey: this.getJourney()
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `adham_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  /**
   * Export specific dataset as a copy-ready JS file content (e.g. for projects.js)
   */
  exportProjectsAsJS() {
    const projects = this.getProjects();
    const jsContent = `/**\n * projects.js - Exported from Admin Dashboard\n * Generated: ${new Date().toLocaleString()}\n */\n\nconst PROJECTS_DATA = ${JSON.stringify(projects, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.PROJECTS_DATA = PROJECTS_DATA;\n}\n`;

    const dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "projects.js");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  /**
   * Import all datasets from an uploaded JSON file
   */
  importFromJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      const data = parsed.data || parsed;

      if (data.profile) this.setProfile(data.profile);
      if (data.skills) this.setSkills(data.skills);
      if (data.projects) this.setProjects(data.projects);
      if (data.education) this.setEducation(data.education);
      if (data.certifications) this.setCertifications(data.certifications);
      if (data.journey) this.setJourney(data.journey);

      return { success: true, message: "Data imported successfully!" };
    } catch (e) {
      return { success: false, message: "Invalid JSON file structure: " + e.message };
    }
  },

  /**
   * Reset a single section to its static data file without touching other sections
   */
  resetSection(section) {
    const key = SECTION_KEY_MAP[String(section || "").toLowerCase()];
    if (!key) return false;
    localStorage.removeItem(key);
    return true;
  },

  /**
   * Reset all data to original static files (clear localStorage)
   */
  resetToDefaults() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
};

if (typeof window !== "undefined") {
  window.PortfolioStorage = PortfolioStorage;
}