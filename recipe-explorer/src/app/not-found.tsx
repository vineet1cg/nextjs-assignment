import Link from "next/link";
import { recipes } from "@/data/recipes";

export default function NotFound() {
  const suggestions = recipes.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span>404 - Recipe or Cuisine Not Found</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Recipe not found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-8">
          The requested recipe path or cuisine category identifier could not be located in the Recipe Explorer index. The slug may have changed or the recipe has not been cataloged yet.
        </p>

        <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-slate-100">
          <Link
            href="/recipes"
            className="px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
          >
            Return to All Recipes
          </Link>
          <Link
            href="/cuisines"
            className="px-5 py-2.5 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Browse Cuisines Directory
          </Link>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Suggested Alternatives from the Notebook
            </h2>
            <span className="text-[11px] text-slate-400">Indexed recently</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestions.map((item) => (
              <Link
                key={item.id}
                href={`/recipes/${item.id}`}
                className="group p-4 rounded-lg border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between bg-slate-50/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {item.cuisine}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-emerald-700 transition-colors">
                      →
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.prepTime}</span>
                  <span>{item.servings}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono space-y-1.5">
          <div className="text-slate-400 font-semibold mb-2 flex items-center justify-between">
            <span>DIAGNOSTIC ROUTER TRACE</span>
            <span className="text-[10px] text-emerald-400 font-normal">HTTP 404 handled gracefully</span>
          </div>
          <div>&gt; Route pattern: /recipes/[id] (unmatched slug)</div>
          <div>&gt; Next.js status: notFound() triggered inside page.tsx</div>
          <div className="text-emerald-400">&gt; HTTP 404 handled gracefully</div>
        </div>
      </div>
    </div>
  );
}
