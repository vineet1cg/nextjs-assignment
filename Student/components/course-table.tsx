import type { Course } from "@/lib/types";

interface CourseTableProps {
  courses: Course[];
}

export function CourseTable({ courses }: CourseTableProps) {
  const totalCredits = courses.reduce(
    (total, course) => total + course.credits,
    0,
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900">
          Enrolled courses
        </h2>
        <span className="text-xs text-slate-500">
          {courses.length} courses &middot; {totalCredits} credits
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                Code
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Course
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Semester
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Credits
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {courses.map((course) => (
              <tr key={course.code} className="hover:bg-slate-50/70">
                <td className="px-5 py-3 font-mono text-xs font-medium text-slate-600">
                  {course.code}
                </td>
                <td className="px-5 py-3 font-medium text-slate-900">
                  {course.title}
                </td>
                <td className="px-5 py-3 text-slate-600">{course.semester}</td>
                <td className="px-5 py-3 text-slate-600">{course.credits}</td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex min-w-8 justify-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    {course.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
