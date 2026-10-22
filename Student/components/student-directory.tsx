"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Department, Student, StudyYear } from "@/lib/types";
import { DEPARTMENTS, STUDY_YEARS } from "@/lib/types";
import { EmptyState } from "./empty-state";
import { StudentCard } from "./student-card";

interface StudentDirectoryProps {
  students: Student[];
  availableDepartments: Department[];
  availableYears: StudyYear[];
}

export function StudentDirectory({
  students,
  availableDepartments,
  availableYears,
}: StudentDirectoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [department, setDepartment] = useState(
    () => searchParams.get("department") ?? "all",
  );
  const [year, setYear] = useState(() => searchParams.get("year") ?? "all");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return students.filter((student) => {
      const matchesDepartment =
        department === "all" || student.department === department;
      const matchesYear = year === "all" || String(student.year) === year;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.studentId.toLowerCase().includes(normalizedQuery) ||
        student.email.toLowerCase().includes(normalizedQuery) ||
        student.program.toLowerCase().includes(normalizedQuery) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedQuery),
        );

      return matchesDepartment && matchesYear && matchesQuery;
    });
  }, [students, query, department, year]);

  const hasActiveFilters =
    query.trim().length > 0 || department !== "all" || year !== "all";

  function resetFilters() {
    setQuery("");
    setDepartment("all");
    setYear("all");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <label
              htmlFor="student-search"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Search
            </label>
            <input
              id="student-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, roll number, email or skill"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="department-filter"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Department
            </label>
            <select
              id="department-filter"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="all">All departments</option>
              {availableDepartments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year-filter"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
            >
              Year
            </label>
            <select
              id="year-filter"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="all">All years</option>
              {availableYears.map((item) => (
                <option key={item} value={String(item)}>
                  Year {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-900">{filtered.length}</span>{" "}
            of <span className="font-medium text-slate-900">{students.length}</span>{" "}
            students
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No students found"
            description="No student record matches the current search and filters. Try a different keyword or clear the filters."
            action={
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}

export { DEPARTMENTS, STUDY_YEARS };
