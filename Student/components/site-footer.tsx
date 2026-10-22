import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          Student Directory — a Next.js App Router demo built with local dummy
          data.
        </p>
        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/students" className="hover:text-slate-900">
            Students
          </Link>
          <Link href="/api/students" className="hover:text-slate-900">
            API
          </Link>
        </nav>
      </div>
    </footer>
  );
}
