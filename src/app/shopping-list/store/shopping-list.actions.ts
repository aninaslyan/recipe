import { createAction } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredients.model';

// for not doing typo in string
export const addIngredient = createAction('[ShoppingList] Add Ingredient', (data: Ingredient) => ({ payload: data }));
