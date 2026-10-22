import Link from "next/link";

export default function StudentNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
        404
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
        Student not found
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        We could not find a student with that profile. The record may have been
        removed, or the link may be incorrect.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/students"
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Back to directory
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
