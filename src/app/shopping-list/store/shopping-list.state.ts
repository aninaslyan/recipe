import { Ingredient } from '../../shared/ingredients.model';

export interface ShoppingListState {
  ingredients: Ingredient[];
}

export const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Flour', 2), new Ingredient('Sugar', 1.5)]
};
