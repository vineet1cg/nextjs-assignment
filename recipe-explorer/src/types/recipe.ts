export type Difficulty = "Easy" | "Medium" | "Hard";

export interface InstructionStep {
  step: number;
  title: string;
  description: string;
}

export interface Recipe {
  id: string;
  code: string;
  title: string;
  slug: string;
  category: string;
  cuisine: string;
  difficulty: Difficulty;
  prepTime: string;
  cookTimeMinutes: number;
  servings: string;
  description: string;
  entryNumber: string;
  ingredients: string[];
  instructions: InstructionStep[];
  image: string;
  featured?: boolean;
  colorScheme: {
    accent: string;
    bgBadge: string;
    textBadge: string;
  };
}

export interface CuisineCategory {
  name: string;
  slug: string;
  count: number;
  description: string;
  subRegions: {
    title: string;
    recipesCount: number;
    description: string;
    focus: string;
    base: string;
  }[];
}
