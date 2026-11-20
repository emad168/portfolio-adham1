/**
 * profile.js - Personal Profile Dataset
 * Easily edit personal info, bio, and social placeholders in this single file.
 */

const PROFILE_DATA = {
  name: "Adham Sabry",
  role: "Information Technology Student",
  university: "Delta Technological University",
  degree: "Information Technology",
  currentFocus: "Computer Networks & CCNA",
  careerGoal: "Penetration Testing & Cybersecurity",

  // Live status badge
  status: {
    text: "Studying CCNA & Networking Fundamentals",
    isOnline: true
  },

  // Hero Introduction
  heroIntro: "I am an Information Technology student at Delta Technological University, actively developing my technical knowledge in computer networking, programming, and cybersecurity. I am currently studying CCNA to build a disciplined infrastructure foundation, with the long-term career ambition of specializing in Penetration Testing.",

  // Detailed About Me text
  about: {
    heading: "Building Strong Technical Foundations in Networking & Security",
    paragraphs: [
      "I am an Information Technology student at Delta Technological University with a strong interest in how computing systems, networks, and applications communicate and remain secure. My current academic and self-directed journey centers on gaining practical competence in computer networking, systems infrastructure, and essential programming fundamentals.",
      "Right now, I am actively preparing for the Cisco Certified Network Associate (CCNA) certification. I believe that deeply understanding network topologies, packet dynamics, routing protocols, and subnetting is the most crucial requirement before addressing higher-level security assessments.",
      "My definitive long-term career destination is Penetration Testing and Offensive Cybersecurity. I recognize that true security proficiency requires patience, ethical responsibility, and methodical technical depth. Every topic I study today—from network protocols to web mechanics and database queries—is a deliberate step toward achieving that professional goal."
    ]
  },

  // Contact Information (Easy to edit & update placeholders)
  contact: {
    email: "almasryadham601@gmail.com",       // Editable placeholder or active email
    linkedin: "https://linkedin.com/in/adham-sabry", // Editable placeholder
    github: "https://github.com/adhamsabry",         // Editable placeholder
    location: "Egypt",
    whatsapp: "https://wa.me/2001097606276",         // Direct channel
    phone: "+20 109 760 6276"
  },

  // Portrait Photo Location
  avatar: {
    src: "assets/images/profile.jpg",
    alt: "Portrait of Adham Sabry"
  }
};

if (typeof window !== "undefined") {
  window.PROFILE_DATA = PROFILE_DATA;
}
