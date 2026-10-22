import Link from "next/link";
import { cuisinesData, recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function CuisinesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div>
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Cuisines</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Culinary Cuisines & Traditions
            </h1>
            <p className="text-sm text-slate-500">
              Explore regional flavor profiles, culinary domains, and traditional pantry foundations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {cuisinesData.map((cuisine) => {
          const featured = recipes.filter(
            (r) =>
              r.cuisine.toLowerCase().includes(cuisine.slug) ||
              (cuisine.slug === "asian" && ["Asian", "Japanese", "Pan-Asian"].includes(r.cuisine)) ||
              (cuisine.slug === "mediterranean" && ["Mediterranean", "Italian"].includes(r.cuisine))
          );

          return (
            <section
              key={cuisine.slug}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      REGIONAL DOMAIN
                    </span>
                    <span className="text-xs text-slate-400">
                      {cuisine.count} Cataloged Formulas
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {cuisine.name}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                    {cuisine.description}
                  </p>
                </div>

                <Link
                  href={`/cuisines/${cuisine.slug}`}
                  className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors self-start shrink-0"
                >
                  Explore Domain →
                </Link>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Sub-Regional Traditions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cuisine.subRegions.map((sub) => (
                    <div
                      key={sub.title}
                      className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                            {sub.recipesCount} RECIPES
                          </span>
                          <span className="text-xs text-slate-400">↗</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">
                          {sub.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          {sub.description}
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span>Focus: {sub.focus}</span>
                        <span className="text-emerald-700 font-medium">Explore →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {featured.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Featured Regional Formulas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {featured.slice(0, 3).map((r) => (
                      <RecipeCard key={r.id} recipe={r} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
