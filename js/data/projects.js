/**
 * projects.js - Centralized Projects Dataset & Management System
 *
 * Scalable and reusable project repository.
 * Add, edit, delete, or update projects here without modifying any HTML.
 *
 * Supported Project Schema:
 * - id: String (Unique identifier, e.g. "tafaseel-ecommerce")
 * - title: String (Project title)
 * - description: String (Detailed project overview)
 * - category: "Networking" | "Web Development" | "Cybersecurity" | "Academic Projects" | "Other"
 * - technologies: Array of Strings (e.g. ["HTML", "CSS", "JavaScript"])
 * - image: String (Path to screenshot or placeholder e.g. "assets/images/tafaseel-project.jpg")
 * - link: String (Optional general project link)
 * - githubUrl: String (Real URL or empty string "" if not available)
 * - liveDemoUrl: String (Real URL or empty string "" if not available)
 * - status: String (e.g. "Academic Project", "Lab Simulation", "In Progress")
 * - creationDate: String (e.g. "2024" or "2024-05")
 * - featured: Boolean (true | false)
 */

const PROJECTS_DATA = [
  // 1. Initial Real Project: Tafaseel
  {
    id: "tafaseel-ecommerce",
    title: "Tafaseel",
    description: "A frontend web application for selling antiques and handmade home decor products, featuring interactive catalog browsing, product detail views, and client-side shopping features.",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "assets/images/tafaseel-project.jpg",
    link: "",
    githubUrl: "",
    liveDemoUrl: "https://emad168.github.io/tafaseel.com/",
    status: "Academic Project",
    creationDate: "2024",
    featured: true
  },

  // 2. Real Academic Lab Prototype: Smart Elevator System
  {
    id: "smart-elevator-system",
    title: "Smart Elevator Prototype",
    description: "An academic hardware-software project utilizing microcontroller control, floor position sensors, obstacle detection safety mechanisms, and an OLED feedback display.",
    category: "Academic Projects",
    technologies: ["Microcontrollers", "Sensors", "Hardware Integration", "C/C++ Logic"],
    image: "assets/images/project-placeholder.svg",
    link: "",
    githubUrl: "",
    liveDemoUrl: "",
    status: "Academic Project",
    creationDate: "2024",
    featured: false
  },

  // 3. Example Project Demonstrating How to Add Future Networking Labs
  // (Follow this structure when adding future Packet Tracer or CCNA exercises)
  {
    id: "ccna-vlan-routing-lab",
    title: "VLAN Segmentation & Router-on-a-Stick Lab",
    description: "Example simulation lab created in Cisco Packet Tracer to practice inter-VLAN routing, trunking protocols (802.1Q), and sub-interface IP addressing for departmental isolation.",
    category: "Networking",
    technologies: ["Cisco Packet Tracer", "VLANs", "802.1Q Trunking", "IPv4 Subnetting", "Inter-VLAN Routing"],
    image: "assets/images/project-placeholder.svg",
    link: "",
    githubUrl: "",
    liveDemoUrl: "",
    status: "Lab Simulation",
    creationDate: "2025",
    featured: true
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}