/**
 * education.js - Complete Academic Data
 * Extracted from official university transcripts
 */

const EDUCATION_DATA = [
  {
    institution: "Delta Technological University",
    institutionAr: "جامعة الدلتا التكنولوجية",
    faculty: "Faculty of Industrial Technology and Energy",
    facultyAr: "كلية تكنولوجيا الصناعة والطاقة",
    program: "Information Technology Program - Network Track",
    programAr: "برنامج تكنولوجيا المعلومات - مسار الشبكات",
    field: "Information Technology",
    location: "Egypt",
    status: "Currently Enrolled - Year 3 (Network Track)",
    statusAr: "مسجل حالياً - السنة الثالثة (مسار الشبكات)",
    qualification: "Higher Intermediate Professional Diploma in Information Technology",
    qualificationAr: "دبلوم فني صناعي - تكنولوجيا المعلومات",
    diplomaDuration: "Two Years (Completed)",
    diplomaDurationAr: "سنتان (مكتمل)",
    overallGrade: "Very Good",
    overallGradeAr: "جيد جداً",
    overallPercentage: "79.15%",
    currentYear: "Third Year - Network Track (2026-2027)",
    currentYearAr: "السنة الثالثة - مسار الشبكات (2026-2027)",
    description: "Pursuing rigorous coursework covering computer networking, system administration, software development fundamentals, cybersecurity, and database engineering at Delta Technological University.",
    descriptionAr: "دراسة منهج أكاديمي شامل يغطي شبكات الحاسوب، إدارة الأنظمة، أساسيات تطوير البرمجيات، الأمن السيبراني، وهندسة قواعد البيانات بجامعة الدلتا التكنولوجية.",
    coreFocus: [
      "Computer Networking & CCNA",
      "Cybersecurity Fundamentals",
      "Programming (Python, C, C++, Java)",
      "Web Development (HTML, CSS, JS, PHP)",
      "Database Management (Oracle SQL)",
      "Operating Systems & Linux",
      "Digital Engineering"
    ],
    coreFocusAr: [
      "شبكات الحاسوب و CCNA",
      "أساسيات الأمن السيبراني",
      "البرمجة (بايثون، سي، سي++، جافا)",
      "تطوير الويب (HTML, CSS, JS, PHP)",
      "إدارة قواعد البيانات (Oracle SQL)",
      "أنظمة التشغيل ولينكس",
      "الهندسة الرقمية"
    ]
  }
];

const ACADEMIC_YEARS_DATA = [
  {
    year: 1,
    title: "First Year",
    titleAr: "السنة الأولى",
    period: "2024 - 2025",
    totalScore: 1189,
    grade: "Good",
    gradeAr: "جيد",
    percentage: "74.31%",
    subjects: [
      { name: "Intro. To Cyber Security", nameAr: "مقدمة في الأمن السيبراني", score: 42, grade: "Very Good", gradeAr: "جيد جداً", category: "cybersecurity" },
      { name: "IT Essentials", nameAr: "أساسيات تكنولوجيا المعلومات", score: 116, grade: "Very Good", gradeAr: "جيد جداً", category: "networking" },
      { name: "Technical English 1", nameAr: "الإنجليزية التقنية 1", score: 106, grade: "Good", gradeAr: "جيد", category: "english" },
      { name: "Mathematics (1)", nameAr: "الرياضيات (1)", score: 96, grade: "Pass", gradeAr: "مقبول", category: "math" },
      { name: "Physics", nameAr: "الفيزياء", score: 101, grade: "Good", gradeAr: "جيد", category: "math" },
      { name: "Programming Essentials in Python", nameAr: "أساسيات البرمجة بلغة بايثون", score: 102, grade: "Good", gradeAr: "جيد", category: "programming" },
      { name: "Programming Essentials in C", nameAr: "أساسيات البرمجة بلغة سي", score: 107, grade: "Good", gradeAr: "جيد", category: "programming" },
      { name: "Cyber Security Essentials", nameAr: "أساسيات الأمن السيبراني", score: 82, grade: "Very Good", gradeAr: "جيد جداً", category: "cybersecurity" },
      { name: "Intro to IoT & Connecting Things", nameAr: "مقدمة في إنترنت الأشياء", score: 124, grade: "Very Good", gradeAr: "جيد جداً", category: "networking" },
      { name: "MS Office", nameAr: "مايكروسوفت أوفيس", score: 70, grade: "Good", gradeAr: "جيد", category: "english" },
      { name: "Technical English II", nameAr: "الإنجليزية التقنية 2", score: 117, grade: "Very Good", gradeAr: "جيد جداً", category: "english" },
      { name: "Mathematics II", nameAr: "الرياضيات (2)", score: 126, grade: "Very Good", gradeAr: "جيد جداً", category: "math" }
    ]
  },
  {
    year: 2,
    title: "Second Year",
    titleAr: "السنة الثانية",
    period: "2025 - 2026",
    totalScore: 1344,
    grade: "Very Good",
    gradeAr: "جيد جداً",
    percentage: "84%",
    subjects: [
      { name: "Linux Essentials", nameAr: "أساسيات لينكس", score: 140, grade: "Excellent", gradeAr: "ممتاز", category: "os" },
      { name: "Programming Essentials in C++", nameAr: "أساسيات البرمجة بلغة سي++", score: 124, grade: "Very Good", gradeAr: "جيد جداً", category: "programming" },
      { name: "Web Programming I", nameAr: "برمجة الويب 1", score: 134, grade: "Excellent", gradeAr: "ممتاز", category: "web" },
      { name: "Introduction to DB", nameAr: "مقدمة في قواعد البيانات", score: 63, grade: "Pass", gradeAr: "مقبول", category: "database" },
      { name: "Digital Engineering", nameAr: "الهندسة الرقمية", score: 129, grade: "Excellent", gradeAr: "ممتاز", category: "engineering" },
      { name: "Operating System", nameAr: "أنظمة التشغيل", score: 77, grade: "Very Good", gradeAr: "جيد جداً", category: "os" },
      { name: "Java Programming", nameAr: "برمجة جافا", score: 131, grade: "Excellent", gradeAr: "ممتاز", category: "programming" },
      { name: "Web Programming II", nameAr: "برمجة الويب 2", score: 112, grade: "Good", gradeAr: "جيد", category: "web" },
      { name: "CCNA R&S1", nameAr: "CCNA R&S1", score: 121, grade: "Very Good", gradeAr: "جيد جداً", category: "networking" },
      { name: "Data Structure", nameAr: "هياكل البيانات", score: 125, grade: "Very Good", gradeAr: "جيد جداً", category: "programming" },
      { name: "Database Programming", nameAr: "برمجة قواعد البيانات", score: 96, grade: "Excellent", gradeAr: "ممتاز", category: "database" },
      { name: "Capstone Design", nameAr: "مشروع التخرج", score: 92, grade: "Excellent", gradeAr: "ممتاز", category: "engineering" }
    ]
  }
];

const UNIVERSITY_SUBJECTS_DATA = [
  // Programming & Software Development
  { id: "prog-python", name: "Programming Essentials in Python", nameAr: "أساسيات البرمجة بلغة بايثون", category: "programming", categoryAr: "البرمجة", grade: "Good", gradeAr: "جيد", score: 102, year: 1, description: "Fundamentals of programming using Python including variables, loops, functions, and data manipulation.", descriptionAr: "أساسيات البرمجة باستخدام بايثون تشمل المتغيرات والحلقات والدوال ومعالجة البيانات.", relatedSkills: ["Python", "Programming Logic", "Problem Solving"], icon: "fab fa-python" },
  { id: "prog-c", name: "Programming Essentials in C", nameAr: "أساسيات البرمجة بلغة سي", category: "programming", categoryAr: "البرمجة", grade: "Good", gradeAr: "جيد", score: 107, year: 1, description: "Core C programming concepts including pointers, memory management, arrays, and structured programming.", descriptionAr: "مفاهيم أساسية في لغة سي تشمل المؤشرات وإدارة الذاكرة والمصفوفات والبرمجة الهيكلية.", relatedSkills: ["C Language", "Memory Management", "Algorithms"], icon: "fas fa-code" },
  { id: "prog-cpp", name: "Programming Essentials in C++", nameAr: "أساسيات البرمجة بلغة سي++", category: "programming", categoryAr: "البرمجة", grade: "Very Good", gradeAr: "جيد جداً", score: 124, year: 2, description: "Object-oriented programming with C++ covering classes, inheritance, polymorphism, and templates.", descriptionAr: "البرمجة كائنية التوجه بلغة سي++ تشمل الأصناف والوراثة وتعدد الأشكال والقوالب.", relatedSkills: ["C++", "OOP", "Data Abstraction"], icon: "fas fa-code" },
  { id: "prog-java", name: "Java Programming", nameAr: "برمجة جافا", category: "programming", categoryAr: "البرمجة", grade: "Excellent", gradeAr: "ممتاز", score: 131, year: 2, description: "Java programming fundamentals including OOP principles, exception handling, collections, and GUI development.", descriptionAr: "أساسيات برمجة جافا تشمل مبادئ البرمجة كائنية التوجه ومعالجة الاستثناءات والمجموعات وتطوير الواجهات.", relatedSkills: ["Java", "OOP", "Exception Handling"], icon: "fab fa-java" },
  { id: "data-struct", name: "Data Structure", nameAr: "هياكل البيانات", category: "programming", categoryAr: "البرمجة", grade: "Very Good", gradeAr: "جيد جداً", score: 125, year: 2, description: "Data structures including arrays, linked lists, stacks, queues, trees, and sorting algorithms.", descriptionAr: "هياكل البيانات تشمل المصفوفات والقوائم المتصلة والمكدسات والطوابير والأشجار وخوارزميات الفرز.", relatedSkills: ["Algorithms", "Problem Solving", "Complexity Analysis"], icon: "fas fa-project-diagram" },

  // Cybersecurity
  { id: "intro-cyber", name: "Intro. To Cyber Security", nameAr: "مقدمة في الأمن السيبراني", category: "cybersecurity", categoryAr: "الأمن السيبراني", grade: "Very Good", gradeAr: "جيد جداً", score: 42, year: 1, description: "Introduction to cybersecurity concepts, threat landscapes, and basic security practices.", descriptionAr: "مقدمة في مفاهيم الأمن السيبراني ومشهد التهديدات وممارسات الأمان الأساسية.", relatedSkills: ["Security Awareness", "Threat Analysis", "Risk Assessment"], icon: "fas fa-shield-alt" },
  { id: "cyber-essentials", name: "Cyber Security Essentials", nameAr: "أساسيات الأمن السيبراني", category: "cybersecurity", categoryAr: "الأمن السيبراني", grade: "Very Good", gradeAr: "جيد جداً", score: 82, year: 1, description: "Essential cybersecurity principles including cryptography, network security, and security policies.", descriptionAr: "مبادئ الأمن السيبراني الأساسية تشمل التشفير وأمن الشبكات وسياسات الأمان.", relatedSkills: ["Cryptography", "Network Security", "Security Policies"], icon: "fas fa-lock" },

  // Networking
  { id: "it-essentials", name: "IT Essentials", nameAr: "أساسيات تكنولوجيا المعلومات", category: "networking", categoryAr: "الشبكات", grade: "Very Good", gradeAr: "جيد جداً", score: 116, year: 1, description: "Comprehensive IT fundamentals covering hardware, software, networking basics, and troubleshooting.", descriptionAr: "أساسيات تكنولوجيا المعلومات الشاملة تغطي العتاد والبرمجيات وأساسيات الشبكات وحل المشكلات.", relatedSkills: ["Hardware", "Software", "Troubleshooting"], icon: "fas fa-desktop" },
  { id: "iot", name: "Intro to IoT & Connecting Things", nameAr: "مقدمة في إنترنت الأشياء", category: "networking", categoryAr: "الشبكات", grade: "Very Good", gradeAr: "جيد جداً", score: 124, year: 1, description: "Introduction to Internet of Things concepts, protocols, sensor networks, and connected device architectures.", descriptionAr: "مقدمة في مفاهيم إنترنت الأشياء والبروتوكولات وشبكات الاستشعار وبنية الأجهزة المتصلة.", relatedSkills: ["IoT Protocols", "Sensors", "Connected Devices"], icon: "fas fa-wifi" },
  { id: "ccna-rs1", name: "CCNA R&S1", nameAr: "CCNA R&S1", category: "networking", categoryAr: "الشبكات", grade: "Very Good", gradeAr: "جيد جداً", score: 121, year: 2, description: "Cisco CCNA Routing and Switching fundamentals including network configuration, IP addressing, and routing protocols.", descriptionAr: "أساسيات التوجيه والتحويل في CCNA من سيسكو تشمل تكوين الشبكات وعنونة IP وبروتوكولات التوجيه.", relatedSkills: ["Cisco IOS", "Routing", "Switching", "IP Addressing"], icon: "fas fa-network-wired" },

  // Web Development
  { id: "web-prog1", name: "Web Programming I", nameAr: "برمجة الويب 1", category: "web", categoryAr: "تطوير الويب", grade: "Excellent", gradeAr: "ممتاز", score: 134, year: 2, description: "Frontend web development with HTML, CSS, and JavaScript for building responsive and interactive web pages.", descriptionAr: "تطوير واجهات الويب الأمامية باستخدام HTML و CSS و JavaScript لبناء صفحات ويب تفاعلية ومتجاوبة.", relatedSkills: ["HTML", "CSS", "JavaScript", "Responsive Design"], icon: "fas fa-globe" },
  { id: "web-prog2", name: "Web Programming II", nameAr: "برمجة الويب 2", category: "web", categoryAr: "تطوير الويب", grade: "Good", gradeAr: "جيد", score: 112, year: 2, description: "Backend web development with PHP, server-side scripting, form processing, and dynamic web applications.", descriptionAr: "تطوير الويب من جانب الخادم باستخدام PHP وبرمجة السكريبتات ومعالجة النماذج وتطبيقات الويب الديناميكية.", relatedSkills: ["PHP", "Server-Side", "Dynamic Web Apps"], icon: "fas fa-server" },

  // Database
  { id: "intro-db", name: "Introduction to DB", nameAr: "مقدمة في قواعد البيانات", category: "database", categoryAr: "قواعد البيانات", grade: "Pass", gradeAr: "مقبول", score: 63, year: 2, description: "Database fundamentals including relational model, SQL queries, normalization, and ER diagrams.", descriptionAr: "أساسيات قواعد البيانات تشمل النموذج العلائقي واستعلامات SQL والتطبيع ومخططات ER.", relatedSkills: ["SQL", "Database Design", "ER Diagrams"], icon: "fas fa-database" },
  { id: "db-prog", name: "Database Programming", nameAr: "برمجة قواعد البيانات", category: "database", categoryAr: "قواعد البيانات", grade: "Excellent", gradeAr: "ممتاز", score: 96, year: 2, description: "Advanced database programming with PL/SQL, stored procedures, triggers, and Oracle database administration.", descriptionAr: "برمجة قواعد البيانات المتقدمة باستخدام PL/SQL والإجراءات المخزنة والمحفزات وإدارة قاعدة بيانات Oracle.", relatedSkills: ["PL/SQL", "Oracle", "Stored Procedures", "Triggers"], icon: "fas fa-database" },

  // Operating Systems & Infrastructure
  { id: "linux", name: "Linux Essentials", nameAr: "أساسيات لينكس", category: "os", categoryAr: "أنظمة التشغيل", grade: "Excellent", gradeAr: "ممتاز", score: 140, year: 2, description: "Linux system administration including CLI operations, file management, permissions, and shell scripting.", descriptionAr: "إدارة أنظمة لينكس تشمل عمليات سطر الأوامر وإدارة الملفات والصلاحيات وبرمجة الشل.", relatedSkills: ["Linux CLI", "Shell Scripting", "System Admin"], icon: "fab fa-linux" },
  { id: "os", name: "Operating System", nameAr: "أنظمة التشغيل", category: "os", categoryAr: "أنظمة التشغيل", grade: "Very Good", gradeAr: "جيد جداً", score: 77, year: 2, description: "Operating system concepts including process management, memory management, file systems, and scheduling.", descriptionAr: "مفاهيم أنظمة التشغيل تشمل إدارة العمليات وإدارة الذاكرة وأنظمة الملفات والجدولة.", relatedSkills: ["Process Management", "Memory Management", "File Systems"], icon: "fas fa-cogs" },

  // Digital Engineering
  { id: "digital-eng", name: "Digital Engineering", nameAr: "الهندسة الرقمية", category: "engineering", categoryAr: "الهندسة", grade: "Excellent", gradeAr: "ممتاز", score: 129, year: 2, description: "Digital logic design including Boolean algebra, combinational and sequential circuits, and digital systems.", descriptionAr: "تصميم المنطق الرقمي يشمل الجبر البولياني والدوائر التوافقية والتتابعية والأنظمة الرقمية.", relatedSkills: ["Digital Logic", "Boolean Algebra", "Circuit Design"], icon: "fas fa-microchip" },
  { id: "capstone", name: "Capstone Design", nameAr: "مشروع التخرج", category: "engineering", categoryAr: "الهندسة", grade: "Excellent", gradeAr: "ممتاز", score: 92, year: 2, description: "Capstone graduation project integrating multiple disciplines into a comprehensive engineering solution.", descriptionAr: "مشروع التخرج الذي يدمج تخصصات متعددة في حل هندسي شامل.", relatedSkills: ["Project Management", "Integration", "Teamwork"], icon: "fas fa-drafting-compass" },

  // Mathematics & Science
  { id: "math1", name: "Mathematics (1)", nameAr: "الرياضيات (1)", category: "math", categoryAr: "الرياضيات والعلوم", grade: "Pass", gradeAr: "مقبول", score: 96, year: 1, description: "Engineering mathematics including algebra, calculus fundamentals, and mathematical reasoning.", descriptionAr: "الرياضيات الهندسية تشمل الجبر وأساسيات التفاضل والتكامل والتفكير الرياضي.", relatedSkills: ["Algebra", "Calculus", "Mathematical Logic"], icon: "fas fa-square-root-alt" },
  { id: "math2", name: "Mathematics II", nameAr: "الرياضيات (2)", category: "math", categoryAr: "الرياضيات والعلوم", grade: "Very Good", gradeAr: "جيد جداً", score: 126, year: 1, description: "Advanced mathematics including statistics, probability, and applied mathematical methods.", descriptionAr: "الرياضيات المتقدمة تشمل الإحصاء والاحتمالات والأساليب الرياضية التطبيقية.", relatedSkills: ["Statistics", "Probability", "Applied Math"], icon: "fas fa-calculator" },
  { id: "physics", name: "Physics", nameAr: "الفيزياء", category: "math", categoryAr: "الرياضيات والعلوم", grade: "Good", gradeAr: "جيد", score: 101, year: 1, description: "Applied physics covering mechanics, electricity, magnetism, and their applications in technology.", descriptionAr: "الفيزياء التطبيقية تغطي الميكانيكا والكهرباء والمغناطيسية وتطبيقاتها في التكنولوجيا.", relatedSkills: ["Mechanics", "Electricity", "Electronics"], icon: "fas fa-atom" },

  // English & Professional Skills
  { id: "tech-eng1", name: "Technical English 1", nameAr: "الإنجليزية التقنية 1", category: "english", categoryAr: "الإنجليزية والمهنية", grade: "Good", gradeAr: "جيد", score: 106, year: 1, description: "Technical English communication skills for IT professionals including technical writing and vocabulary.", descriptionAr: "مهارات التواصل بالإنجليزية التقنية لمتخصصي تكنولوجيا المعلومات تشمل الكتابة التقنية والمفردات.", relatedSkills: ["Technical Writing", "Communication", "IT Vocabulary"], icon: "fas fa-language" },
  { id: "tech-eng2", name: "Technical English II", nameAr: "الإنجليزية التقنية 2", category: "english", categoryAr: "الإنجليزية والمهنية", grade: "Very Good", gradeAr: "جيد جداً", score: 117, year: 1, description: "Advanced technical English including presentation skills, report writing, and professional communication.", descriptionAr: "الإنجليزية التقنية المتقدمة تشمل مهارات العرض وكتابة التقارير والتواصل المهني.", relatedSkills: ["Presentations", "Report Writing", "Professional English"], icon: "fas fa-language" },
  { id: "ms-office", name: "MS Office", nameAr: "مايكروسوفت أوفيس", category: "english", categoryAr: "الإنجليزية والمهنية", grade: "Good", gradeAr: "جيد", score: 70, year: 1, description: "Microsoft Office applications including Word, Excel, PowerPoint, and digital productivity tools.", descriptionAr: "تطبيقات مايكروسوفت أوفيس تشمل وورد وإكسل وباوربوينت وأدوات الإنتاجية الرقمية.", relatedSkills: ["Word", "Excel", "PowerPoint", "Digital Literacy"], icon: "fas fa-file-alt" }
];

if (typeof window !== "undefined") {
  window.EDUCATION_DATA = EDUCATION_DATA;
  window.ACADEMIC_YEARS_DATA = ACADEMIC_YEARS_DATA;
  window.UNIVERSITY_SUBJECTS_DATA = UNIVERSITY_SUBJECTS_DATA;
}
