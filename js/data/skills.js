/**
 * Technical Skills Data
 * Structured for PortfolioRenderer & AdminController
 */

const SKILLS_DATA = [
  // 1. Networking & Infrastructure
  {
    id: "skill-ccna-routing-switching",
    name: "CCNA Routing & Switching Fundamentals",
    category: "Networking & Infrastructure",
    level: "In Progress",
    percentage: 78,
    description: "IPv4/IPv6 subnetting, VLANs, trunking, static/dynamic routing concepts, and Packet Tracer lab simulations.",
    icon: "fas fa-network-wired"
  },
  {
    id: "skill-osi-tcpip",
    name: "OSI Model & TCP/IP Protocols",
    category: "Networking & Infrastructure",
    level: "Academic Experience",
    percentage: 82,
    description: "Packet encapsulation, ARP, DHCP, DNS, ICMP, HTTP/HTTPS, and troubleshooting network layers.",
    icon: "fas fa-project-diagram"
  },
  {
    id: "skill-network-troubleshooting",
    name: "Network Troubleshooting & CLI Labs",
    category: "Networking & Infrastructure",
    level: "Hands-on & Academic",
    percentage: 75,
    description: "Hands-on lab configuration, interface diagnostics, routing tables, and connectivity verification.",
    icon: "fas fa-terminal"
  },

  // 2. Cybersecurity
  {
    id: "skill-cyber-defense-basics",
    name: "Cybersecurity & Defense Foundations",
    category: "Cybersecurity",
    level: "Certified",
    percentage: 76,
    description: "Threat awareness, digital identity protection, common attack vectors, and security best practices.",
    icon: "fas fa-shield-alt"
  },
  {
    id: "skill-network-security-concepts",
    name: "Network Security & Forensics Basics",
    category: "Cybersecurity",
    level: "Learning",
    percentage: 68,
    description: "Foundational concepts in access control, secure traffic principles, and digital forensics awareness.",
    icon: "fas fa-user-secret"
  },

  // 3. IT & Systems
  {
    id: "skill-windows-server-ad",
    name: "Windows Server & Active Directory",
    category: "IT & Systems",
    level: "Hands-on & Academic",
    percentage: 74,
    description: "Virtual lab deployment on VMware, user/group administration, IP configuration, and core system roles.",
    icon: "fas fa-server"
  },
  {
    id: "skill-virtualization-os",
    name: "Virtualization (VMware) & OS Administration",
    category: "IT & Systems",
    level: "Hands-on & Academic",
    percentage: 80,
    description: "Managing virtual machines, disk partitions, system utilities, and Windows 11/Server environments.",
    icon: "fas fa-desktop"
  },

  // 4. Database Management
  {
    id: "skill-oracle-sql",
    name: "Oracle SQL & Relational Databases",
    category: "Database Management",
    level: "Academic Experience",
    percentage: 77,
    description: "Writing SQL queries, joins, constraints, schema design, and relational database normalization.",
    icon: "fas fa-database"
  },

  // 5. Programming & Development
  {
    id: "skill-html-css-js",
    name: "HTML5, CSS3 & JavaScript",
    category: "Programming & Development",
    level: "Hands-on & Academic",
    percentage: 78,
    description: "Responsive layouts, DOM manipulation, localStorage state handling, and interactive UI components.",
    icon: "fas fa-code"
  },
  {
    id: "skill-php-programming-logic",
    name: "PHP & Programming Logic",
    category: "Programming & Development",
    level: "Academic Experience",
    percentage: 72,
    description: "Server-side fundamentals, form handling, control structures, and academic web project logic.",
    icon: "fas fa-file-code"
  },

  // 6. AI & Data Analytics
  {
    id: "skill-ai-tools-data",
    name: "Applied AI Tools & Excel Data Analysis",
    category: "AI & Data Analytics",
    level: "Certified",
    percentage: 80,
    description: "Using generative AI for workflow productivity, structured prompting, and data organization in Excel.",
    icon: "fas fa-brain"
  }
];

if (typeof window !== "undefined") {
  window.SKILLS_DATA = SKILLS_DATA;
}