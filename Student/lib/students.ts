import type {
  Department,
  DirectoryFilters,
  DirectoryStats,
  Student,
  StudyYear,
} from "./types";

/**
 * Dummy dataset for the directory. It is intentionally kept in a single module
 * so that every route reads from the same source of truth instead of each
 * component hard-coding its own copy of the data.
 */
export const students: Student[] = [
  {
    id: "aarav-sharma",
    studentId: "STU-2023-014",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    phone: "+91 98200 11223",
    department: "Computer Science",
    program: "B.Tech Computer Science",
    year: 3,
    section: "CS-A",
    status: "active",
    gpa: 8.94,
    dateOfBirth: "2004-03-14",
    enrolledAt: "2023-06-18",
    address: {
      line1: "42, Nehru Nagar",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411014",
    },
    guardian: {
      name: "Rajesh Sharma",
      relation: "Father",
      phone: "+91 98200 55443",
    },
    bio: "Backend engineering enthusiast who enjoys building distributed systems and writing about database internals. Leads the campus open-source club.",
    skills: ["TypeScript", "PostgreSQL", "Docker", "Go"],
    courses: [
      { code: "CS301", title: "Database Management Systems", credits: 4, grade: "A", gradePoint: 9.2, semester: "Sem 5" },
      { code: "CS305", title: "Operating Systems", credits: 4, grade: "A", gradePoint: 9.0, semester: "Sem 5" },
      { code: "CS312", title: "Web Engineering", credits: 3, grade: "A+", gradePoint: 9.6, semester: "Sem 6" },
      { code: "CS318", title: "Computer Networks", credits: 3, grade: "A", gradePoint: 8.8, semester: "Sem 6" },
      { code: "MA201", title: "Discrete Mathematics", credits: 3, grade: "B+", gradePoint: 8.2, semester: "Sem 5" },
    ],
    achievements: [
      "Winner — Smart India Hackathon 2025 (regional track)",
      "Maintainer of the college coding club website",
    ],
  },
  {
    id: "diya-patel",
    studentId: "STU-2023-027",
    name: "Diya Patel",
    email: "diya.patel@college.edu",
    phone: "+91 97650 44321",
    department: "Computer Science",
    program: "B.Tech Computer Science",
    year: 3,
    section: "CS-A",
    status: "active",
    gpa: 9.21,
    dateOfBirth: "2004-07-02",
    enrolledAt: "2023-06-18",
    address: {
      line1: "7, Sunrise Apartments",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      pincode: "380015",
    },
    guardian: {
      name: "Meera Patel",
      relation: "Mother",
      phone: "+91 97650 90876",
    },
    bio: "Front-end specialist with a strong interest in design systems and accessibility. Runs a weekly study group for data structures.",
    skills: ["React", "TypeScript", "Figma", "Accessibility"],
    courses: [
      { code: "CS301", title: "Database Management Systems", credits: 4, grade: "A+", gradePoint: 9.6, semester: "Sem 5" },
      { code: "CS305", title: "Operating Systems", credits: 4, grade: "A", gradePoint: 9.1, semester: "Sem 5" },
      { code: "CS312", title: "Web Engineering", credits: 3, grade: "A+", gradePoint: 9.7, semester: "Sem 6" },
      { code: "CS320", title: "Human Computer Interaction", credits: 3, grade: "A+", gradePoint: 9.5, semester: "Sem 6" },
      { code: "MA201", title: "Discrete Mathematics", credits: 3, grade: "A", gradePoint: 8.9, semester: "Sem 5" },
    ],
    achievements: [
      "Best Student of the Department — 2024-25",
      "Campus accessibility audit lead",
    ],
  },
  {
    id: "rohan-verma",
    studentId: "STU-2022-009",
    name: "Rohan Verma",
    email: "rohan.verma@college.edu",
    phone: "+91 99300 77654",
    department: "Computer Science",
    program: "B.Tech Computer Science",
    year: 4,
    section: "CS-B",
    status: "active",
    gpa: 8.41,
    dateOfBirth: "2003-01-19",
    enrolledAt: "2022-07-04",
    address: {
      line1: "18, Gandhi Road",
      city: "Indore",
      state: "Madhya Pradesh",
      country: "India",
      pincode: "452001",
    },
    guardian: {
      name: "Sunil Verma",
      relation: "Father",
      phone: "+91 99300 22310",
    },
    bio: "Final-year student preparing for graduate studies in computer science. Internship experience in backend development at a fintech startup.",
    skills: ["Java", "Spring Boot", "Kafka", "SQL"],
    courses: [
      { code: "CS401", title: "Software Engineering", credits: 4, grade: "A", gradePoint: 8.9, semester: "Sem 7" },
      { code: "CS415", title: "Cloud Computing", credits: 3, grade: "A", gradePoint: 8.7, semester: "Sem 8" },
      { code: "CS422", title: "Machine Learning", credits: 3, grade: "B+", gradePoint: 8.2, semester: "Sem 8" },
      { code: "CS430", title: "Project Work", credits: 6, grade: "A", gradePoint: 8.8, semester: "Sem 8" },
    ],
    achievements: [
      "Pre-placement offer — backend engineer at a fintech startup",
      "Department merit list — top 5",
    ],
  },
  {
    id: "ananya-iyer",
    studentId: "STU-2024-031",
    name: "Ananya Iyer",
    email: "ananya.iyer@college.edu",
    phone: "+91 90030 22145",
    department: "Electronics",
    program: "B.Tech Electronics & Communication",
    year: 2,
    section: "EC-A",
    status: "active",
    gpa: 8.75,
    dateOfBirth: "2005-05-08",
    enrolledAt: "2024-07-01",
    address: {
      line1: "3, Temple Street",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641001",
    },
    guardian: {
      name: "Lakshmi Iyer",
      relation: "Mother",
      phone: "+91 90030 88741",
    },
    bio: "Curious about signal processing and embedded systems. Builds small robotics projects in the department lab every weekend.",
    skills: ["C", "Embedded C", "MATLAB", "Signal Processing"],
    courses: [
      { code: "EC201", title: "Analog Circuits", credits: 4, grade: "A", gradePoint: 9.0, semester: "Sem 3" },
      { code: "EC207", title: "Signals & Systems", credits: 4, grade: "A", gradePoint: 8.8, semester: "Sem 3" },
      { code: "EC214", title: "Microcontrollers", credits: 3, grade: "A+", gradePoint: 9.5, semester: "Sem 4" },
      { code: "PH102", title: "Engineering Physics", credits: 3, grade: "B+", gradePoint: 8.1, semester: "Sem 2" },
    ],
    achievements: ["Winner — Inter-department Line Follower Contest"],
  },
  {
    id: "vivaan-mehta",
    studentId: "STU-2022-045",
    name: "Vivaan Mehta",
    email: "vivaan.mehta@college.edu",
    phone: "+91 98111 30210",
    department: "Electronics",
    program: "B.Tech Electronics & Communication",
    year: 4,
    section: "EC-B",
    status: "on_leave",
    gpa: 7.92,
    dateOfBirth: "2003-11-27",
    enrolledAt: "2022-07-04",
    address: {
      line1: "221, Ring Road",
      city: "Surat",
      state: "Gujarat",
      country: "India",
      pincode: "395002",
    },
    guardian: {
      name: "Pooja Mehta",
      relation: "Mother",
      phone: "+91 98111 66092",
    },
    bio: "Currently on a semester break for a research internship at an electronics manufacturing unit. Interested in VLSI design.",
    skills: ["Verilog", "VLSI", "PCB Design", "Python"],
    courses: [
      { code: "EC401", title: "VLSI Design", credits: 4, grade: "A", gradePoint: 8.8, semester: "Sem 7" },
      { code: "EC415", title: "Communication Systems", credits: 3, grade: "B+", gradePoint: 8.0, semester: "Sem 8" },
      { code: "EC430", title: "Project Work", credits: 6, grade: "B+", gradePoint: 8.0, semester: "Sem 8" },
    ],
    achievements: ["Academic leave granted — industry internship 2026"],
  },
  {
    id: "ishita-nair",
    studentId: "STU-2024-052",
    name: "Ishita Nair",
    email: "ishita.nair@college.edu",
    phone: "+91 94470 11832",
    department: "Electronics",
    program: "B.Sc Electronics",
    year: 2,
    section: "EC-A",
    status: "active",
    gpa: 9.02,
    dateOfBirth: "2005-09-11",
    enrolledAt: "2024-07-01",
    address: {
      line1: "9, Marine Drive",
      city: "Kochi",
      state: "Kerala",
      country: "India",
      pincode: "682031",
    },
    guardian: {
      name: "Suresh Nair",
      relation: "Father",
      phone: "+91 94470 55290",
    },
    bio: "Topper of the semester with an aptitude for lab work and documentation. Plans to pursue research in semiconductor physics.",
    skills: ["Python", "Semiconductors", "LabVIEW", "LaTeX"],
    courses: [
      { code: "EC201", title: "Analog Circuits", credits: 4, grade: "A+", gradePoint: 9.6, semester: "Sem 3" },
      { code: "EC207", title: "Signals & Systems", credits: 4, grade: "A+", gradePoint: 9.5, semester: "Sem 3" },
      { code: "EC220", title: "Digital Electronics", credits: 3, grade: "A", gradePoint: 9.0, semester: "Sem 4" },
      { code: "CH101", title: "Engineering Chemistry", credits: 3, grade: "A", gradePoint: 8.9, semester: "Sem 2" },
    ],
    achievements: ["University rank holder — 1st in Electronics"],
  },
  {
    id: "kabir-singh",
    studentId: "STU-2023-061",
    name: "Kabir Singh",
    email: "kabir.singh@college.edu",
    phone: "+91 78770 33445",
    department: "Mechanical",
    program: "B.Tech Mechanical Engineering",
    year: 3,
    section: "ME-A",
    status: "active",
    gpa: 8.33,
    dateOfBirth: "2004-12-05",
    enrolledAt: "2023-06-18",
    address: {
      line1: "55, Model Town",
      city: "Ludhiana",
      state: "Punjab",
      country: "India",
      pincode: "141001",
    },
    guardian: {
      name: "Gurpreet Singh",
      relation: "Father",
      phone: "+91 78770 90123",
    },
    bio: "Member of the Formula student team and a part-time machine shop assistant. Enjoys CAD design and fabrication work.",
    skills: ["SolidWorks", "AutoCAD", "FEA", "Fabrication"],
    courses: [
      { code: "ME301", title: "Thermodynamics", credits: 4, grade: "A", gradePoint: 8.9, semester: "Sem 5" },
      { code: "ME307", title: "Machine Design", credits: 4, grade: "B+", gradePoint: 8.0, semester: "Sem 6" },
      { code: "ME312", title: "CAD / CAM", credits: 3, grade: "A", gradePoint: 8.8, semester: "Sem 6" },
      { code: "ME315", title: "Fluid Mechanics", credits: 3, grade: "B+", gradePoint: 8.1, semester: "Sem 5" },
    ],
    achievements: ["Runner-up — National Formula Student India"],
  },
  {
    id: "meera-krishnan",
    studentId: "STU-2022-073",
    name: "Meera Krishnan",
    email: "meera.krishnan@college.edu",
    phone: "+91 90875 62018",
    department: "Mechanical",
    program: "B.Tech Mechanical Engineering",
    year: 4,
    section: "ME-B",
    status: "active",
    gpa: 8.88,
    dateOfBirth: "2003-08-21",
    enrolledAt: "2022-07-04",
    address: {
      line1: "12, Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600002",
    },
    guardian: {
      name: "Krishnan Raman",
      relation: "Father",
      phone: "+91 90875 14390",
    },
    bio: "Working on a thermal analysis project for a solar dryer prototype as part of her final year capstone.",
    skills: ["ANSYS", "MATLAB", "CAD", "Thermal Analysis"],
    courses: [
      { code: "ME401", title: "Advanced Thermodynamics", credits: 4, grade: "A", gradePoint: 9.0, semester: "Sem 7" },
      { code: "ME408", title: "Machine Design", credits: 4, grade: "A", gradePoint: 8.9, semester: "Sem 7" },
      { code: "ME430", title: "Project Work", credits: 6, grade: "A", gradePoint: 8.8, semester: "Sem 8" },
    ],
    achievements: ["Best project presentation — final year demo day"],
  },
  {
    id: "arjun-reddy",
    studentId: "STU-2024-088",
    name: "Arjun Reddy",
    email: "arjun.reddy@college.edu",
    phone: "+91 91000 76543",
    department: "Mechanical",
    program: "B.Tech Mechanical Engineering",
    year: 1,
    section: "ME-A",
    status: "active",
    gpa: 7.64,
    dateOfBirth: "2006-04-30",
    enrolledAt: "2024-07-01",
    address: {
      line1: "8, Banjara Hills",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      pincode: "500034",
    },
    guardian: {
      name: "Ravi Reddy",
      relation: "Father",
      phone: "+91 91000 43210",
    },
    bio: "First-year student finding his footing in engineering fundamentals. Plays football for the inter-college team.",
    skills: ["C", "Mathematics", "CAD Drafting"],
    courses: [
      { code: "ME101", title: "Engineering Graphics", credits: 3, grade: "B+", gradePoint: 8.0, semester: "Sem 1" },
      { code: "ME105", title: "Engineering Mechanics", credits: 4, grade: "B", gradePoint: 7.4, semester: "Sem 1" },
      { code: "MA101", title: "Engineering Mathematics I", credits: 4, grade: "B+", gradePoint: 8.1, semester: "Sem 1" },
    ],
    achievements: ["Best all-rounder — first year sports meet"],
  },
  {
    id: "sneha-joshi",
    studentId: "STU-2023-094",
    name: "Sneha Joshi",
    email: "sneha.joshi@college.edu",
    phone: "+91 90280 55123",
    department: "Management",
    program: "BBA",
    year: 3,
    section: "MG-A",
    status: "active",
    gpa: 8.57,
    dateOfBirth: "2004-02-17",
    enrolledAt: "2023-06-20",
    address: {
      line1: "31, FC Road",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411005",
    },
    guardian: {
      name: "Alka Joshi",
      relation: "Mother",
      phone: "+91 90280 77891",
    },
    bio: "Marketing enthusiast with a strong record in college events. Interned with a regional retail brand during her third year.",
    skills: ["Marketing", "Excel", "Content Writing", "Analytics"],
    courses: [
      { code: "MB301", title: "Marketing Management", credits: 4, grade: "A", gradePoint: 8.9, semester: "Sem 5" },
      { code: "MB305", title: "Business Analytics", credits: 3, grade: "A", gradePoint: 8.7, semester: "Sem 6" },
      { code: "MB310", title: "Consumer Behaviour", credits: 3, grade: "A", gradePoint: 8.8, semester: "Sem 6" },
      { code: "AC201", title: "Financial Accounting", credits: 4, grade: "B+", gradePoint: 8.0, semester: "Sem 5" },
    ],
    achievements: ["Head of marketing — annual college fest"],
  },
  {
    id: "rahul-joshi",
    studentId: "STU-2022-103",
    name: "Rahul Joshi",
    email: "rahul.joshi@college.edu",
    phone: "+91 98920 44321",
    department: "Management",
    program: "BBA",
    year: 4,
    section: "MG-B",
    status: "graduated",
    gpa: 7.86,
    dateOfBirth: "2003-06-09",
    enrolledAt: "2022-07-06",
    address: {
      line1: "14, Station Road",
      city: "Nashik",
      state: "Maharashtra",
      country: "India",
      pincode: "422001",
    },
    guardian: {
      name: "Vinay Joshi",
      relation: "Father",
      phone: "+91 98920 10928",
    },
    bio: "Placed as a business development associate at a logistics company. Completed the final semester while working part-time.",
    skills: ["Sales", "Negotiation", "CRM", "Financial Modelling"],
    courses: [
      { code: "MB401", title: "Strategic Management", credits: 4, grade: "B+", gradePoint: 8.1, semester: "Sem 7" },
      { code: "MB408", title: "Entrepreneurship", credits: 3, grade: "B", gradePoint: 7.7, semester: "Sem 8" },
      { code: "MB430", title: "Internship Project", credits: 6, grade: "B+", gradePoint: 8.0, semester: "Sem 8" },
    ],
    achievements: ["Graduated with distinction — batch 2022-26"],
  },
  {
    id: "priya-nandakumar",
    studentId: "STU-2024-117",
    name: "Priya Nandakumar",
    email: "priya.nandakumar@college.edu",
    phone: "+91 89264 30007",
    department: "Management",
    program: "B.Com",
    year: 1,
    section: "MG-A",
    status: "on_leave",
    gpa: 8.05,
    dateOfBirth: "2006-10-23",
    enrolledAt: "2024-07-08",
    address: {
      line1: "6, Beach Road",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600001",
    },
    guardian: {
      name: "Nandakumar Rajan",
      relation: "Father",
      phone: "+91 89264 71238",
    },
    bio: "On a medical leave following a sports injury. Continuing coursework with recorded sessions in the meantime.",
    skills: ["Accounting", "Excel", "Tally"],
    courses: [
      { code: "AC101", title: "Financial Accounting", credits: 4, grade: "A", gradePoint: 8.7, semester: "Sem 1" },
      { code: "MA101", title: "Business Mathematics", credits: 3, grade: "B+", gradePoint: 8.0, semester: "Sem 1" },
      { code: "EC101", title: "Business Environment", credits: 3, grade: "A", gradePoint: 8.5, semester: "Sem 2" },
    ],
    achievements: ["College athletics — 200m silver medal"],
  },
];

export function getAllStudents(): Student[] {
  return students;
}

export function getStudentById(id: string): Student | undefined {
  return students.find((student) => student.id === id);
}

export function getDepartments(): Department[] {
  return Array.from(new Set(students.map((student) => student.department)));
}

export function getStudentsByDepartment(department: Department): Student[] {
  return students.filter((student) => student.department === department);
}

export function filterStudents({
  query = "",
  department = "all",
  year = "all",
}: DirectoryFilters = {}): Student[] {
  const normalizedQuery = query.trim().toLowerCase();

  return students.filter((student) => {
    const matchesDepartment =
      department === "all" || student.department === department;

    const matchesYear = year === "all" || student.year === year;

    const matchesQuery =
      normalizedQuery.length === 0 ||
      student.name.toLowerCase().includes(normalizedQuery) ||
      student.studentId.toLowerCase().includes(normalizedQuery) ||
      student.email.toLowerCase().includes(normalizedQuery) ||
      student.program.toLowerCase().includes(normalizedQuery) ||
      student.department.toLowerCase().includes(normalizedQuery) ||
      student.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery));

    return matchesDepartment && matchesYear && matchesQuery;
  });
}

export function getDirectoryStats(): DirectoryStats {
  const totalCourses = students.reduce(
    (total, student) => total + student.courses.length,
    0,
  );
  const averageGpa =
    students.reduce((total, student) => total + student.gpa, 0) / students.length;

  return {
    totalStudents: students.length,
    totalDepartments: getDepartments().length,
    totalCourses,
    averageGpa: Number(averageGpa.toFixed(2)),
  };
}

export function getSortedYears(): StudyYear[] {
  return Array.from(new Set(students.map((student) => student.year))).sort();
}
