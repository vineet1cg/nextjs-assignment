import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { CourseTable } from "@/components/course-table";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { StudentAvatar } from "@/components/student-avatar";
import { getAllStudents, getStudentById } from "@/lib/students";
import { formatDate, formatGpa } from "@/lib/utils";

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

/** Pre-renders one static page per student at build time. */
export function generateStaticParams() {
  return getAllStudents().map((student) => ({ id: student.id }));
}

export async function generateMetadata({
  params,
}: StudentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    return { title: "Student not found" };
  }

  return {
    title: student.name,
    description: `${student.name} — ${student.program}, ${student.department}. Roll number ${student.studentId}.`,
  };
}

export default async function StudentDetailPage({
  params,
}: StudentDetailPageProps) {
  const { id } = await params;
  const student = getStudentById(id);

  // Unknown id -> render the closest not-found boundary.
  if (!student) {
    notFound();
  }

  const totalCredits = student.courses.reduce(
    (total, course) => total + course.credits,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Students", href: "/students" },
          { label: student.name },
        ]}
      />

      <Link
        href="/students"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <span aria-hidden="true">&larr;</span> Back to all students
      </Link>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <StudentAvatar name={student.name} size="xl" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {student.name}
              </h1>
              <StatusBadge status={student.status} />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {student.studentId} &middot; {student.program}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {student.department} &middot; Year {student.year} &middot; Section{" "}
              {student.section}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${student.email}`}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
              >
                Send email
              </a>
              <a
                href={`tel:${student.phone.replace(/\s/g, "")}`}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Academic summary" className="mt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="GPA" value={formatGpa(student.gpa)} hint="Out of 10" />
          <StatCard
            label="Credits earned"
            value={totalCredits}
            hint="Across current courses"
          />
          <StatCard
            label="Courses"
            value={student.courses.length}
            hint="Enrolled this year"
          />
          <StatCard
            label="Enrolled"
            value={formatDate(student.enrolledAt)}
            hint="Joined the programme"
          />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">About</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{student.bio}</p>

            <h3 className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
              Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>

            {student.achievements.length > 0 ? (
              <>
                <h3 className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Achievements
                </h3>
                <ul className="mt-2 space-y-2">
                  {student.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span aria-hidden="true" className="text-indigo-500">
                        •
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          <CourseTable courses={student.courses} />
        </div>

        <aside className="min-w-0 space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Contact details
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Email
                </dt>
                <dd className="mt-0.5 break-all font-medium text-slate-700">
                  <a
                    href={`mailto:${student.email}`}
                    className="hover:text-indigo-600 hover:underline"
                  >
                    {student.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Phone
                </dt>
                <dd className="mt-0.5 font-medium text-slate-700">
                  {student.phone}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Date of birth
                </dt>
                <dd className="mt-0.5 font-medium text-slate-700">
                  {formatDate(student.dateOfBirth)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Guardian</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Name
                </dt>
                <dd className="mt-0.5 font-medium text-slate-700">
                  {student.guardian.name}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Relation
                </dt>
                <dd className="mt-0.5 font-medium text-slate-700">
                  {student.guardian.relation}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400">
                  Phone
                </dt>
                <dd className="mt-0.5 font-medium text-slate-700">
                  {student.guardian.phone}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Address</h2>
            <address className="mt-4 text-sm not-italic leading-6 text-slate-600">
              {student.address.line1}
              <br />
              {student.address.city}, {student.address.state}
              <br />
              {student.address.pincode}
              <br />
              {student.address.country}
            </address>
          </section>
        </aside>
      </div>
    </div>
  );
}
