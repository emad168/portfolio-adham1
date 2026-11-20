# Adham Sabry — Information Technology & Networking Portfolio

Personal brand portfolio website for **Adham Sabry**, Information Technology Student at Delta Technological University, focused on computer networking fundamentals, CCNA preparation, and building a disciplined foundation for offensive cybersecurity and penetration testing.

Built with **semantic HTML5, modern CSS3, and Vanilla JavaScript**. Operates 100% as a high-performance static website with zero framework dependencies, zero build steps, and zero package installations. Fully secured and optimized for **GitHub Pages**.

---

## 🔒 Security Hardening & Architecture

- **Zero Hardcoded Secrets**: Contains no hardcoded passwords, secret keys, or mock authentication bypasses.
- **XSS Sanitization Engine**: All dynamic DOM insertions utilize `DOMSanitizer` (`js/sanitize.js`) to escape HTML entities and sanitize URLs against script injection vectors.
- **External Link Hardening**: All outgoing links enforce `rel="noopener noreferrer"` to prevent reverse tabnabbing and window leakage.
- **Isolated Admin Route**: The management dashboard is located on a standalone route ([admin.html](admin.html)) and is omitted from public website navigation.
- **Firebase Authentication & Firestore Architecture**: Wired to Google Firebase (`js/firebase-config.js`) for administrative authentication (Email/Password) and authorization via authorized `ADMIN_UID` matching.

---

## 🚀 Live Demo & Deployment Target
- **Platform**: GitHub Pages
- **Live URL Structure**: `https://<your-username>.github.io/<repository-name>/`
- **Supported Browsers**: Chrome, Firefox, Edge, Safari, Opera (Desktop, Tablet & Mobile)

---

## ✨ Features & Capabilities

- **Cybersecurity & Networking Aesthetic**: Dark navy (`#070d1e`) and obsidian canvas with electric cyan (`#00d2ff`) accents and subtle glassmorphism.
- **Dark & Light Mode**: Instant theme switching persisted in `localStorage`.
- **Bilingual Architecture**: English primary interface with complete RTL structure ready for Arabic (`i18n.js`).
- **Scalable Projects Management System**: Filter by category (`Networking`, `Web Development`, `Cybersecurity`, `Academic Projects`, `Other`), view modal details, and handle empty states cleanly.
- **Dual Content Management**:
  - **Method 1 (Source Files)**: Edit clean JavaScript data files inside `js/data/` (`profile.js`, `projects.js`, `skills.js`, etc.).
  - **Method 2 (Admin Dashboard)**: Manage projects, skills, education, and bio visually via `admin.html` with instant `localStorage` preview and **Export projects.js / JSON** capabilities.
- **Interactive Micro-Interactions**: Scroll progress indicator, smooth section reveal animations, back-to-top floating button, active navigation highlighting, and 1-click clipboard email copying.
- **Custom 404 Fallback**: Dedicated cybersecurity-themed `404.html` error page.
- **Replaceable CV Download**: Pre-wired to download `assets/ADHAM_CV.pdf`.

---

## 📁 Project File Structure

```text
Adham-Portfolio/
├── index.html              # Main public portfolio homepage
├── admin.html              # Isolated Admin Management Dashboard
├── 404.html                # Custom 404 error page for GitHub Pages
├── .gitignore              # Git ignore configuration
├── README.md               # Documentation & deployment guide
├── assets/
│   ├── ADHAM_CV.pdf        # Downloadable resume (replaceable)
│   └── images/
│       ├── profile.jpg     # Portrait photo
│       ├── logo.png        # Brand badge icon
│       ├── tafaseel-project.jpg  # Project screenshot
│       └── project-placeholder.svg # Tech fallback graphic
├── css/
│   ├── variables.css       # Theme colors (Dark/Light) & design tokens
│   ├── base.css            # Reset, layout & typography
│   ├── components.css      # Reusable cards, buttons, badges, nav & footer
│   ├── homepage.css        # Hero, about, education, and contact grid
│   ├── projects.css        # Projects filter bar, cards, modal dialog
│   ├── interactions.css    # Animations, scroll progress, theme & RTL
│   └── admin.css           # Admin dashboard styling
└── js/
    ├── sanitize.js         # Security & XSS sanitization helper
    ├── storage.js          # LocalStorage sync & export/import bridge
    ├── firebase-config.js  # Firebase Auth & Firestore architecture
    ├── i18n.js             # Bilingual language engine (EN / AR)
    ├── interactions.js     # Theme toggle, scroll progress, clipboard copy
    ├── projects-manager.js # Projects filter, modal dialog & card renderer
    ├── render.js           # Hardened DOM rendering engine for datasets
    ├── main.js             # Core page controller & event coordinator
    ├── admin.js            # Admin dashboard CRUD & Auth controller
    └── data/
        ├── profile.js      # Personal profile, bio, and contact info
        ├── skills.js       # Verified technical skills & levels
        ├── projects.js     # Centralized projects dataset
        ├── education.js    # University degree & curriculum details
        ├── certifications.js # Verified credentials & in-progress courses
        └── journey.js      # 6-stage educational roadmap
```

---

## 🛠️ Step-by-Step GitHub Pages Deployment Guide

Follow these steps using **Windows** and **VS Code**. No command-line tools or Node.js required.

### Step 1: Create a Brand-New GitHub Repository
1. Log in to [GitHub](https://github.com).
2. In the top right corner, click the **`+`** icon and select **New repository**.
3. Fill in the repository details:
   - **Repository name**: e.g. `portfolio` or `adham-portfolio`.
   - **Description**: `Personal portfolio website for Adham Sabry — Information Technology student specializing in computer networking, CCNA preparation, and cybersecurity.`
   - **Visibility**: Select **Public** (GitHub Pages requires public on free accounts).
   - **Initialize repository**: Leave **Add a README file**, **Add .gitignore**, and **Choose a license** **UNCHECKED** (we already have a complete README and .gitignore).
4. Click **Create repository**.
> *Note: Creating a new repository will never touch or affect your existing repositories.*

---

### Step 2: Upload Project Files to GitHub

#### Option A: Using Git inside VS Code (Recommended)
1. Open your portfolio folder `d:\Adham-Portfolio` in VS Code.
2. Open the built-in terminal (`Ctrl + ~`) and run:
   ```bash
   git init
   git add .
   git commit -m "Production release of Adham Sabry Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

#### Option B: Direct Upload via GitHub Web Interface
1. On your newly created repository page on GitHub, click **uploading an existing file**.
2. Select all files and folders inside `d:\Adham-Portfolio` (`index.html`, `admin.html`, `404.html`, `.gitignore`, `README.md`, `assets/`, `css/`, `js/`) and drag them into the browser.
3. Wait for the upload to finish, type a commit message (e.g. `Production portfolio release`), and click **Commit changes**.

---

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, click the **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Choose `main` and leave the folder as `/ (root)`.
4. Click **Save**.
5. Wait 1 to 2 minutes. Refresh the page until the deployment banner appears:
   > **"Your site is live at `https://<your-username>.github.io/<your-repo-name>/`"**

---

### Step 4: Connecting Firebase Authentication (Admin Setup)
1. Go to [Firebase Console](https://console.firebase.google.com) and create a free project.
2. In **Project Settings**, copy your Web App configuration into `js/firebase-config.js`.
3. In **Authentication** -> **Sign-in method**, enable **Email/Password**.
4. In **Users**, add your admin user email (e.g., `almasryadham601@gmail.com`).
5. Copy your User UID into `ADMIN_UID` in `js/firebase-config.js`.
6. Open your site at `https://<your-username>.github.io/<your-repo-name>/admin.html` and sign in with your admin credentials.

---

## 📄 License
Designed and developed for **Adham Sabry**. All rights reserved.
