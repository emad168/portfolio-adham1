/**
 * firebase-config.js - Firebase Architecture & Authentication Credentials
 * 
 * Provides production-ready Firebase Authentication & Firestore initialization.
 * 
 * INSTRUCTIONS FOR ACTIVATION:
 * 1. Create a free Firebase project at: https://console.firebase.google.com
 * 2. In Project Settings, click 'Add App' (Web </>) and copy your firebaseConfig.
 * 3. Replace the placeholder values in the config object below.
 * 4. In Firebase Console, enable 'Authentication' -> 'Sign-in method' -> 'Email/Password'.
 * 5. Create your admin user (e.g., almasryadham601@gmail.com).
 * 6. Set your Admin UID in ADMIN_UID below so only your user has administrative privileges.
 * 7. In Firestore Database -> Rules, apply:
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /{document=**} {
 *          allow read: if true;
 *          allow write: if request.auth != null && request.auth.uid == "YOUR_ADMIN_UID";
 *        }
 *      }
 *    }
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD1HtU6uolLCDVgIx-jBAIeSZKuEWc2zw8",
  authDomain: "adham-portfolio-dc870.firebaseapp.com",
  projectId: "adham-portfolio-dc870",
  storageBucket: "adham-portfolio-dc870.firebasestorage.app",
  messagingSenderId: "236598227880",
  appId: "1:236598227880:web:766482aa871431dc00239d",
};

// Admin UID Allowed to modify data in Firestore
const ADMIN_UID = "egXHRCZQiaZEaD7tLi6Qig2v1eE3";

const FirebaseService = {
  isConfigured: false,
  auth: null,
  db: null,
  currentUser: null,

  init() {
    if (
      typeof firebase !== "undefined" &&
      FIREBASE_CONFIG.apiKey !== "YOUR_FIREBASE_API_KEY" &&
      FIREBASE_CONFIG.projectId !== "your-project-id"
    ) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.isConfigured = true;
        console.log("%c[FIREBASE AUTH]%c Production backend connected.", "color: #00d2ff; font-weight: bold;", "color: #94a3b8;");
      } catch (e) {
        console.warn("Firebase initialization notice:", e.message);
        this.isConfigured = false;
      }
    } else {
      this.isConfigured = false;
    }
  },

  async login(email, password) {
    if (!this.isConfigured) {
      throw new Error("Firebase configuration keys are pending in js/firebase-config.js. Please fill in your Firebase project credentials.");
    }
    const cred = await this.auth.signInWithEmailAndPassword(email, password);
    this.currentUser = cred.user;
    
    // Check UID if configured
    if (ADMIN_UID !== "YOUR_AUTHORIZED_ADMIN_UID" && cred.user.uid !== ADMIN_UID) {
      await this.auth.signOut();
      throw new Error("Unauthorized user account. Access restricted to portfolio owner UID.");
    }
    return cred.user;
  },

  async logout() {
    if (this.isConfigured && this.auth) {
      await this.auth.signOut();
      this.currentUser = null;
    }
  },

  onAuthStateChanged(callback) {
    if (this.isConfigured && this.auth) {
      this.auth.onAuthStateChanged(user => {
        this.currentUser = user;
        callback(user);
      });
    } else {
      callback(null);
    }
  },

  // Save document to Firestore
  async saveToFirestore(collectionName, docId, data) {
    if (!this.isConfigured || !this.db) {
      throw new Error("Firestore not configured.");
    }
    return this.db.collection(collectionName).doc(docId).set(data);
  },

  // Fetch document from Firestore
  async fetchFromFirestore(collectionName, docId) {
    if (!this.isConfigured || !this.db) {
      return null;
    }
    const doc = await this.db.collection(collectionName).doc(docId).get();
    return doc.exists ? doc.data() : null;
  }
};

if (typeof window !== "undefined") {
  window.FIREBASE_CONFIG = FIREBASE_CONFIG;
  window.ADMIN_UID = ADMIN_UID;
  window.FirebaseService = FirebaseService;
}
