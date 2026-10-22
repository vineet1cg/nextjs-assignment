import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById, getAllRecipes } from "@/data/recipes";
import IngredientsList from "@/components/IngredientsList";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-6 pb-4 border-b border-slate-200">
        <nav className="flex items-center gap-2">
          <Link href="/recipes" className="hover:text-emerald-700 transition-colors">
            Recipes
          </Link>
          <span>/</span>
          <span className="text-slate-600">{recipe.cuisine}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">{recipe.title}</span>
        </nav>

        <Link
          href="/recipes"
          className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>← Back to recipes</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              {recipe.entryNumber}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Culinary Notebook
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {recipe.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
            {recipe.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 border-t border-slate-100">
            <div>
              <span className="text-slate-400">Cuisine:</span>{" "}
              <span className="text-slate-800 font-semibold">{recipe.cuisine}</span>
            </div>
            <span>•</span>
            <div>
              <span className="text-slate-400">Prep time:</span>{" "}
              <span className="text-slate-800 font-semibold">{recipe.prepTime}</span>
            </div>
            <span>•</span>
            <div>
              <span className="text-slate-400">Difficulty:</span>{" "}
              <span className="text-slate-800 font-semibold">{recipe.difficulty}</span>
            </div>
            <span>•</span>
            <div>
              <span className="text-slate-400">Servings:</span>{" "}
              <span className="text-slate-800 font-semibold">{recipe.servings}</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
          <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>FIG 1.0 — Plated Prep</span>
            <span>1080×810</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <IngredientsList
            ingredients={recipe.ingredients}
            servings={recipe.servings}
          />
        </div>

        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Methodology & Execution
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {recipe.instructions.length} Sequential Steps
            </span>
          </div>

          <ol className="space-y-6">
            {recipe.instructions.map((step) => (
              <li
                key={step.step}
                className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
              >
                <span className="shrink-0 w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-mono font-bold">
                  0{step.step}
                </span>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Execution verified in home test kitchen</span>
            </div>
            <Link
              href="/recipes/new"
              className="text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              Edit formulation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
