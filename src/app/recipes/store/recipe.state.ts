import { Recipe } from '../recipe.model';

export interface RecipeState {
  recipes:  Recipe[];
  recipe: Recipe
}

export const initialState: RecipeState = {
  recipes: [],
  recipe: null
}
