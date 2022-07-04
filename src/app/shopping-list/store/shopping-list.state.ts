import { Ingredient } from '../../shared/ingredients.model';

interface ShoppingListState {
  ingredients: Ingredient[];
}

export const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Flour', 2), new Ingredient('Sugar', 1.5)]
};
