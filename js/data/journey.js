/**
 * journey.js - 6-Stage Educational & Career Roadmap
 * Transparently separates current completed foundations and in-progress CCNA studies
 * from planned future milestones and the long-term penetration testing career goal.
 */

const JOURNEY_DATA = [
  {
    step: "01",
    title: "IT Fundamentals",
    category: "Foundation",
    status: "Completed Foundation",
    badgeType: "completed",
    description: "Developed core understanding of computer architecture, operating systems, hardware components, database fundamentals (Oracle SQL), and system diagnostics.",
    skills: ["Computer Architecture", "Hardware Assembly", "Operating Systems", "Oracle SQL", "Troubleshooting Basics"]
  },
  {
    step: "02",
    title: "Networking Fundamentals",
    category: "Foundation",
    status: "Completed Foundation",
    badgeType: "completed",
    description: "Mastered fundamental networking architectures, the 7-layer OSI model, TCP/IP protocol suite, physical cabling standards, and basic packet flow dynamics.",
    skills: ["OSI 7-Layer Model", "TCP/IP Suite", "LAN & Wi-Fi Architecture", "Packet Flow", "IP Addressing Basics"]
  },
  {
    step: "03",
    title: "CCNA",
    category: "Active Focus",
    status: "Currently Studying",
    badgeType: "active-now",
    description: "Active in-depth preparation for Cisco CCNA 200-301. Configuring IPv4/IPv6 VLSM subnetting, Cisco switch VLANs, trunking, inter-VLAN routing, and Packet Tracer network topologies.",
    skills: ["Cisco CCNA Curriculum", "IPv4 / IPv6 Subnetting", "VLANs & Trunking (802.1Q)", "Router Configurations", "Packet Tracer Labs"]
  },
  {
    step: "04",
    title: "Linux Fundamentals",
    category: "Upcoming Milestone",
    status: "Planned Next Step",
    badgeType: "upcoming",
    description: "Scheduled focus on Linux command-line administration, bash shell scripting, system permissions, process management, and networking services in Linux environments.",
    skills: ["Linux CLI Administration", "Bash Shell Scripting", "System Permissions", "Network Config in Linux", "SSH / Services"]
  },
  {
    step: "05",
    title: "Cybersecurity Fundamentals",
    category: "Security Core",
    status: "Planned Learning",
    badgeType: "upcoming",
    description: "Deep dive into defensive security principles, CIA triad, threat vectors, packet capture analysis with Wireshark, firewall configurations, and vulnerability scanning basics.",
    skills: ["Security Architecture", "Wireshark Packet Analysis", "Threat Vectors & CIA Triad", "Firewalls / Access Lists", "Security Hygiene"]
  },
  {
    step: "06",
    title: "Future Goal: Penetration Testing",
    category: "Career Destination",
    status: "Long-Term Career Destination",
    badgeType: "future-goal",
    description: "The definitive career destination. Transitioning verified networking, systems, and programming competencies into professional offensive security, ethical hacking, and penetration testing.",
    skills: ["Offensive Security", "Vulnerability Assessment", "Ethical Hacking Practice", "TryHackMe / HTB Labs", "Professional Security Auditing"]
  }
];

if (typeof window !== "undefined") {
  window.JOURNEY_DATA = JOURNEY_DATA;
}
