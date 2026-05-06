export interface MacroNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface FoodItem {
  name: string;
  portion: string;
  macros: MacroNutrients;
  healthScore: number;
  description: string;
  ingredients: string[];
}

export interface AnalysisResult {
  items: FoodItem[];
  totalMacros: MacroNutrients;
  averageHealthScore: number;
  recommendations: string[];
  healthyAlternatives: string[];
  dietaryNotes: string[];
}

export interface ComparisonResult {
  mealA: AnalysisResult;
  mealB: AnalysisResult;
  verdict: string;
  winner: 'A' | 'B' | 'Equal';
  comparisonPoints: string[];
}

export interface RestaurantSuggestion {
  name: string;
  address: string;
  rating: number;
  healthyOptions: string[];
  distance?: string;
}
