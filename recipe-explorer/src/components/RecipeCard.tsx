import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col">
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-medium bg-white/95 text-slate-700 shadow-2xs border border-slate-200/60 backdrop-blur-xs">
          {recipe.cuisine}
        </span>

        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-medium bg-slate-900/85 text-white backdrop-blur-xs flex items-center gap-1">
          <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {recipe.prepTime}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
            {recipe.difficulty}
          </span>
          <span className="text-[11px] text-slate-400">•</span>
          <span className="text-[11px] text-slate-500">{recipe.category}</span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1.5">
          {recipe.title}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
          {recipe.description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-mono font-medium text-slate-400">
            {recipe.code}
          </span>
          <Link
            href={`/recipes/${recipe.id}`}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>View recipe</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
