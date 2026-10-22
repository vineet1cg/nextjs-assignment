"use client";

import { useState } from "react";

interface IngredientsListProps {
  ingredients: string[];
  servings: string;
}

export default function IngredientsList({
  ingredients,
  servings,
}: IngredientsListProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [scale, setScale] = useState(1);

  const toggleCheck = (index: number) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Ingredients</h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {ingredients.length} items
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs py-2 px-3 bg-slate-50 rounded-md border border-slate-100">
        <span className="font-medium text-slate-700">Yield: {servings}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Scale:</span>
          <button
            type="button"
            onClick={() => setScale(scale === 1 ? 2 : 1)}
            className="font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs cursor-pointer"
          >
            {scale}.0x
          </button>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {ingredients.map((item, index) => {
          const isDone = checked[index];
          return (
            <li
              key={index}
              onClick={() => toggleCheck(index)}
              className="flex items-start gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={!!isDone}
                onChange={() => {}}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span
                className={`text-sm leading-relaxed ${
                  isDone
                    ? "line-through text-slate-400"
                    : "text-slate-700 font-normal"
                }`}
              >
                {item}
                {scale > 1 && (
                  <span className="ml-2 text-xs font-medium text-emerald-600">
                    (x{scale})
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>Tip: Check off items as you mis-en-place.</span>
      </div>
    </div>
  );
}
