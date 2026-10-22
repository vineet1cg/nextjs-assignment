export const DEPARTMENTS = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Management",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export const STUDY_YEARS = [1, 2, 3, 4] as const;

export type StudyYear = (typeof STUDY_YEARS)[number];

export const STUDENT_STATUSES = ["active", "on_leave", "graduated"] as const;

export type StudentStatus = (typeof STUDENT_STATUSES)[number];

export interface Course {
  /** Course code, e.g. "CS301". */
  code: string;
  title: string;
  credits: number;
  /** Letter grade earned in the course. */
  grade: string;
  /** Numeric grade point used to compute the GPA. */
  gradePoint: number;
  semester: string;
}

export interface StudentAddress {
  line1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Guardian {
  name: string;
  relation: string;
  phone: string;
}

export interface Student {
  /** URL slug used by the dynamic route `/students/[id]`. */
  id: string;
  /** College roll number, e.g. "STU-2023-014". */
  studentId: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  /** Degree being pursued, e.g. "B.Tech Computer Science". */
  program: string;
  year: StudyYear;
  section: string;
  status: StudentStatus;
  /** Grade point average on a 10 point scale. */
  gpa: number;
  dateOfBirth: string;
  enrolledAt: string;
  address: StudentAddress;
  guardian: Guardian;
  bio: string;
  skills: string[];
  courses: Course[];
  achievements: string[];
}

export interface DirectoryFilters {
  query?: string;
  department?: Department | "all";
  year?: StudyYear | "all";
}

export interface DirectoryStats {
  totalStudents: number;
  totalDepartments: number;
  totalCourses: number;
  averageGpa: number;
}
