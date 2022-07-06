import { Ingredient } from '../../shared/ingredients.model';
import { createHTTPActions } from '../../shared/state/state.helpers';

// for not doing typo
export const [addIngredient, addIngredientSuccess, addIngredientError] = createHTTPActions<Ingredient, {name: string, amount: number}>('[ShoppingList] Add Ingredient');
