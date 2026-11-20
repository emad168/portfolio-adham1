/**
 * education.js - Education Dataset
 */

const EDUCATION_DATA = [
  {
    institution: "Delta Technological University",
    field: "Information Technology",
    location: "Egypt",
    status: "Currently Enrolled / IT Student",
    description: "Pursuing rigorous coursework covering computer networking, system administration, software development fundamentals, and database engineering.",
    coreFocus: [
      "Computer Networking & Protocol Architectures",
      "Operating Systems & IT Hardware Fundamentals",
      "Relational Databases (Oracle SQL)",
      "Web Technologies & Scripting (HTML, CSS, JS, PHP)",
      "Information Security Fundamentals"
    ]
  }
,
  {
    qualification: "Higher Intermediate Professional Diploma in Information Technology",
    institution: "Delta Technological University",
    duration: "Two Years",
    overallGrade: "Very Good",
    percentage: "79.15%"
  }
];

if (typeof window !== "undefined") {
  window.EDUCATION_DATA = EDUCATION_DATA;
}
