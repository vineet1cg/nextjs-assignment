"use client";

import { useState, useMemo } from "react";
import { Recipe } from "@/types/recipe";
import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import RecipeGrid from "./RecipeGrid";

interface RecipeCatalogProps {
  initialRecipes: Recipe[];
  initialCategory?: string;
}

export default function RecipeCatalog({
  initialRecipes,
  initialCategory = "All",
}: RecipeCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("recent");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {
      All: initialRecipes.length,
    };

    initialRecipes.forEach((recipe) => {
      counts[recipe.category] = (counts[recipe.category] || 0) + 1;
    });

    const categoryList = [
      "All",
      "Quick Meals (<25m)",
      "Plant-Based",
      "Baking & Grains",
      "Soups & Stews",
    ];

    return categoryList
      .filter((cat) => cat === "All" || counts[cat] > 0)
      .map((cat) => ({
        name: cat,
        count: counts[cat] || 0,
      }));
  }, [initialRecipes]);

  const filteredRecipes = useMemo(() => {
    let result = [...initialRecipes];

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (recipe) => recipe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(q) ||
          recipe.cuisine.toLowerCase().includes(q) ||
          recipe.category.toLowerCase().includes(q) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    if (sortBy === "time-asc") {
      result.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [initialRecipes, selectedCategory, searchQuery, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing {filteredRecipes.length} of {initialRecipes.length} recipes
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </span>
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={handleReset}
            className="text-emerald-700 hover:underline font-medium cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      <RecipeGrid
        recipes={filteredRecipes}
        emptyMessage={`No recipes found for the selected filters. Try choosing "All" or adjusting your search.`}
        onReset={handleReset}
      />
    </div>
  );
}
