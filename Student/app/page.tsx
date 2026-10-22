import Link from "next/link";
import { StatCard } from "@/components/stat-card";
import { StudentAvatar } from "@/components/student-avatar";
import {
  getAllStudents,
  getDepartments,
  getDirectoryStats,
  getStudentsByDepartment,
} from "@/lib/students";

export default function HomePage() {
  const students = getAllStudents();
  const stats = getDirectoryStats();
  const departments = getDepartments();
  const featured = students.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-700">
          College Student Directory
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Every student, one profile away.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Browse the student roll, filter by department or year, and open a
          profile to see academic record, enrolled courses and contact details.
          Built with the Next.js App Router on top of local dummy data.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/students"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            Browse students
          </Link>
          <Link
            href="/api/students"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            View the JSON API
          </Link>
        </div>
      </section>

      <section aria-label="Directory summary" className="mt-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Students"
            value={stats.totalStudents}
            hint="Records in the directory"
          />
          <StatCard
            label="Departments"
            value={stats.totalDepartments}
            hint="Across every programme"
          />
          <StatCard
            label="Course records"
            value={stats.totalCourses}
            hint="Enrollments tracked"
          />
          <StatCard
            label="Average GPA"
            value={stats.averageGpa}
            hint="On a 10 point scale"
          />
        </div>
      </section>

      <section aria-labelledby="departments-heading" className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              id="departments-heading"
              className="text-xl font-semibold tracking-tight text-slate-900"
            >
              Browse by department
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Jump straight into a filtered directory view.
            </p>
          </div>
          <Link
            href="/students"
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-700 sm:block"
          >
            See all students &rarr;
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => {
            const count = getStudentsByDepartment(department).length;

            return (
              <Link
                key={department}
                href={`/students?department=${encodeURIComponent(department)}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {department}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {count} student{count === 1 ? "" : "s"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mt-14">
        <h2
          id="featured-heading"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          Recently added students
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          A quick look at the newest profiles in the directory.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((student) => (
            <li key={student.id}>
              <Link
                href={`/students/${student.id}`}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <StudentAvatar name={student.name} size="md" />
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {student.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{student.studentId}</p>
                <p className="mt-3 text-xs text-slate-600">
                  {student.department} &middot; Year {student.year}
                </p>
                <span className="mt-4 text-xs font-medium text-indigo-600">
                  View profile &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
