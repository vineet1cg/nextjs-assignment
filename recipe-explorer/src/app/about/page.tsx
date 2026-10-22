import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">About</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          About Recipe Explorer
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Recipe Explorer is a clean culinary notebook and kitchen companion engineered using Next.js App Router, TypeScript, and modern Tailwind CSS.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Architecture & Next.js Paradigms
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            The project demonstrates core Next.js frontend paradigms suitable for evaluation and examination:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-semibold text-emerald-800">
                /recipes/[id]
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Dynamic Routes
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Static generation and asynchronous params resolution for individual recipe notebooks.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-semibold text-emerald-800">
                /cuisines/[...slug]
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Catch-All Routes
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Multi-segment route handling for nested regional culinary domains and sub-regional styles.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-semibold text-emerald-800">
                RecipeCatalog.tsx
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Client-Side State
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Instant interactive search by title, ingredients, category filtering pills, and sorting.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono font-semibold text-emerald-800">
                not-found.tsx
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Graceful Error Boundaries
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Dedicated 404 handler with contextual recommendations and diagnostic router traces.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/recipes"
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
          >
            Explore Recipes Catalog →
          </Link>
          <span className="text-xs text-slate-400">
            Next.js App Router • React 19 • Tailwind CSS 4
          </span>
        </div>
      </div>
    </div>
  );
}
