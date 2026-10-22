import { Suspense } from "react";
import type { Metadata } from "next";
import { StudentDirectory } from "@/components/student-directory";
import { GridSkeleton } from "@/components/skeletons";
import {
  getAllStudents,
  getDepartments,
  getSortedYears,
} from "@/lib/students";

export const metadata: Metadata = {
  title: "Students",
  description:
    "Browse the full student roll. Filter by name, roll number, department or year.",
};

export default function StudentsPage() {
  const students = getAllStudents();
  const departments = getDepartments();
  const years = getSortedYears();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Student directory
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          {students.length} student records across {departments.length}{" "}
          departments. Use the filters to narrow the list, then open a profile
          for the full academic record.
        </p>
      </div>

      <div className="mt-8">
        <Suspense fallback={<GridSkeleton />}>
          <StudentDirectory
            students={students}
            availableDepartments={departments}
            availableYears={years}
          />
        </Suspense>
      </div>
    </div>
  );
}
