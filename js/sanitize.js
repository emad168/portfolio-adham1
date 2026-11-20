/**
 * sanitize.js - Lightweight Security & DOM Sanitization Helper
 * Prevents Cross-Site Scripting (XSS) by safely escaping and sanitizing strings
 * before inserting into dynamic DOM templates or rendering user inputs.
 */

const DOMSanitizer = {
  /**
   * Escape HTML special characters for safe inclusion in templates or innerHTML
   * Converts &, <, >, ", ' to their safe HTML entity representations.
   */
  escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Validates URLs to prevent javascript:, data: or vbscript: injection.
   * Only allows safe http:, https:, mailto:, or relative paths (assets/...).
   */
  sanitizeURL(url) {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    // Allow safe protocols or relative local paths
    if (
      trimmed.startsWith("https://") ||
      trimmed.startsWith("http://") ||
      trimmed.startsWith("mailto:") ||
      trimmed.startsWith("tel:") ||
      trimmed.startsWith("./") ||
      trimmed.startsWith("assets/") ||
      trimmed.startsWith("../")
    ) {
      return this.escapeHTML(trimmed);
    }
    return "";
  },

  /**
   * Safely create a text node or set textContent on an element
   */
  setText(element, text) {
    if (element) {
      element.textContent = text !== null && text !== undefined ? String(text) : "";
    }
  }
};

if (typeof window !== "undefined") {
  window.DOMSanitizer = DOMSanitizer;
}
