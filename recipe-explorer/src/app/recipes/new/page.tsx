"use client";

import { useState } from "react";
import Link from "next/link";

interface IngredientRow {
  id: number;
  qty: string;
  name: string;
}

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("Asian");
  const [prepTime, setPrepTime] = useState("25");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { id: 1, qty: "400g", name: "Extra-firm tofu, drained and pressed" },
    { id: 2, qty: "2 tbsp", name: "Toasted sesame oil" },
    { id: 3, qty: "1 tbsp", name: "Fresh grated ginger root" },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now(), qty: "", name: "" },
    ]);
  };

  const removeIngredient = (id: number) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const updateIngredient = (id: number, field: "qty" | "name", val: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs text-slate-500">
        <nav className="flex items-center gap-2">
          <Link href="/recipes" className="hover:text-emerald-700">
            Explorer
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">New Recipe Draft</span>
        </nav>
        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
          Unsaved Changes
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Recipe
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter recipe parameters, ingredients, and sequential preparation instructions for the culinary index.
        </p>
      </div>

      <form onSubmit={handlePublish} className="space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
            Recipe Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sesame Ginger Tofu Rice Bowl"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cuisine *
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Asian">Asian</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="European">European</option>
                <option value="Japanese">Japanese</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Latin American">Latin American</option>
                <option value="Middle Eastern">Middle Eastern</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                required
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Difficulty Level *
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of flavor profile and key technique..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Ingredients List
              </h2>
              <p className="text-xs text-slate-400">
                Define quantities, units, and ingredient naming.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {ingredients.length} Items Added
            </span>
          </div>

          <div className="space-y-3">
            {ingredients.map((ing) => (
              <div key={ing.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={ing.qty}
                  onChange={(e) => updateIngredient(ing.id, "qty", e.target.value)}
                  placeholder="Qty (e.g. 400g)"
                  className="w-32 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
                />
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => updateIngredient(ing.id, "name", e.target.value)}
                  placeholder="Ingredient name and preparation"
                  className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-hidden focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(ing.id)}
                  className="text-slate-400 hover:text-red-500 text-lg px-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="w-full py-2.5 border border-dashed border-slate-300 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors"
          >
            + Add Row
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Link
            href="/recipes"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Cancel & Return
          </Link>
          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="text-xs text-emerald-600 font-semibold">
                Recipe published locally!
              </span>
            )}
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors shadow-2xs cursor-pointer"
            >
              Publish Recipe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
