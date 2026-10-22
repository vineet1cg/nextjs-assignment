import { NextResponse, type NextRequest } from "next/server";
import { getStudentById } from "@/lib/students";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/students/[id] -> a single student record, or 404 when the id is
 * not part of the directory.
 */
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    return NextResponse.json(
      { error: "Student not found", id },
      { status: 404 },
    );
  }

  return NextResponse.json(student);
}
