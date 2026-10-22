import Link from "next/link";
import { notFound } from "next/navigation";
import { cuisinesData, recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

interface CuisineSlugProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return cuisinesData.map((c) => ({
    slug: [c.slug],
  }));
}

export default async function CuisineSlugPage({ params }: CuisineSlugProps) {
  const { slug } = await params;
  const mainSlug = slug[0];
  const cuisine = cuisinesData.find((c) => c.slug.toLowerCase() === mainSlug.toLowerCase()) || cuisinesData[0];

  if (!cuisine) {
    notFound();
  }

  const regionalRecipes = recipes.filter(
    (r) =>
      r.cuisine.toLowerCase().includes(cuisine.slug) ||
      (cuisine.slug === "asian" && ["Asian", "Japanese", "Pan-Asian"].includes(r.cuisine)) ||
      (cuisine.slug === "mediterranean" && ["Mediterranean", "Italian"].includes(r.cuisine))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/cuisines" className="hover:text-emerald-700 transition-colors">
            Cuisines
          </Link>
          {slug.map((segment, idx) => (
            <span key={segment} className="flex items-center gap-2">
              <span>/</span>
              <span className={idx === slug.length - 1 ? "text-slate-900 font-semibold capitalize" : "text-slate-500 capitalize"}>
                {segment}
              </span>
            </span>
          ))}
        </nav>

        <span className="font-mono text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200">
          &lt;&gt; /cuisines/[...slug]
        </span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                REGIONAL DOMAIN
              </span>
              <span className="text-xs text-slate-400">
                {cuisine.count} Cataloged Formulas
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {cuisine.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {cuisine.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cuisines"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
            >
              Root: All Cuisines
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sub-Regional Traditions
            </h2>
            <span className="text-[11px] text-slate-400">
              {cuisine.subRegions.length} Active Classifications
            </span>
          </div>

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
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {sub.description}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span>Base: {sub.base}</span>
                  <span className="text-emerald-700 font-medium">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured {cuisine.name} Formulas
            </h2>
            <span className="text-[11px] text-slate-400">Validated lab entries</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {regionalRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Pantry Standard
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Foundational Umami Index
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              All regional recipes in Recipe Explorer adhere to pure unadulterated seasonings and natural fermentation.
            </p>
          </div>
          <Link
            href="/about"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 whitespace-nowrap self-start sm:self-auto"
          >
            Read Pantry Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
