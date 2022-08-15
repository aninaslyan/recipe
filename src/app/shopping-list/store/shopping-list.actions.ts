import { createAction } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredients.model';

// for not doing typo in string
export const addIngredient = createAction('[ShoppingList] Add Ingredient', (data: Ingredient) => ({ payload: data }));
export const addIngredients = createAction('[ShoppingList] Add Ingredients', (data: Ingredient[]) => ({ payload: data }));
export const deleteIngredient = createAction('[ShoppingList] Delete Ingredient', (index: number) => ({ payload: index }));
export const updateIngredient = createAction('[ShoppingList] Update Ingredient', (index: number, newIngredient: Ingredient) => ({ payload: {index, newIngredient} }));
