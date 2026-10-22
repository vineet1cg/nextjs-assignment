"use client";

import { useEffect } from "react";
import Link from "next/link";

interface StudentErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StudentError({ error, reset }: StudentErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-rose-600">
        Error
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
        Could not load this profile
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        The student record failed to load. Please try again.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Try again
        </button>
        <Link
          href="/students"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to directory
        </Link>
      </div>
    </div>
  );
}
