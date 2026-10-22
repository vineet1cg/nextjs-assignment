import { NextResponse, type NextRequest } from "next/server";
import {
  filterStudents,
  getAllStudents,
  getDirectoryStats,
} from "@/lib/students";
import { DEPARTMENTS, STUDY_YEARS } from "@/lib/types";

/**
 * Simple read-only JSON backend for the directory.
 *
 * GET /api/students?q=diya&department=Computer%20Science&year=3
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const query = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "all";
  const year = searchParams.get("year") ?? "all";

  const invalidDepartment =
    department !== "all" &&
    !DEPARTMENTS.includes(department as (typeof DEPARTMENTS)[number]);

  const invalidYear =
    year !== "all" && !STUDY_YEARS.includes(Number(year) as 1 | 2 | 3 | 4);

  if (invalidDepartment || invalidYear) {
    return NextResponse.json(
      {
        error: "Invalid filter value",
        details: {
          department: invalidDepartment ? `Unknown department "${department}"` : null,
          year: invalidYear ? `Unknown year "${year}"` : null,
        },
      },
      { status: 400 },
    );
  }

  const students = filterStudents({
    query,
    department: department as (typeof DEPARTMENTS)[number] | "all",
    year: (year === "all" ? "all" : Number(year)) as 1 | 2 | 3 | 4 | "all",
  });

  return NextResponse.json({
    count: students.length,
    total: getAllStudents().length,
    stats: getDirectoryStats(),
    filters: { q: query, department, year },
    students,
  });
}
