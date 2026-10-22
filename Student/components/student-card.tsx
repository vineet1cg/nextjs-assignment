import Link from "next/link";
import type { Student } from "@/lib/types";
import { formatGpa } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { StudentAvatar } from "./student-avatar";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <StudentAvatar name={student.name} />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">
              <Link
                href={`/students/${student.id}`}
                className="hover:text-indigo-600 hover:underline"
              >
                {student.name}
              </Link>
            </h3>
            <p className="truncate text-xs text-slate-500">{student.studentId}</p>
          </div>
        </div>
        <StatusBadge status={student.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
        <div className="col-span-2">
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Department
          </dt>
          <dd className="font-medium text-slate-700">{student.department}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">
            Year
          </dt>
          <dd className="font-medium text-slate-700">
            Year {student.year} &middot; {student.section}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-400">GPA</dt>
          <dd className="font-medium text-slate-700">{formatGpa(student.gpa)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {student.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View profile
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
