import Link from "next/link";
import { recipes } from "@/data/recipes";
import RecipeCatalog from "@/components/RecipeCatalog";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">Recipes</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            All recipes
          </h1>
          <p className="text-sm text-slate-500">
            Browse everyday culinary formulas and kitchen staples by cuisine and prep time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs self-start sm:self-auto">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Showing {recipes.length} notebook entries</span>
        </div>
      </div>

      <RecipeCatalog initialRecipes={recipes} />

      <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>Page 1 of 1 — {recipes.length} formulas total</p>
        <div className="flex items-center gap-1">
          <button
            disabled
            className="px-3 py-1.5 rounded border border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 rounded bg-emerald-700 text-white font-medium">
            1
          </span>
          <button
            disabled
            className="px-3 py-1.5 rounded border border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
