import { createAction } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredients.model';

export const addIngredient = createAction(
  '[ShoppingList] Add Ingredient',
  (data: Ingredient) => ({ payload: data })
);

export const addIngredients = createAction(
  '[ShoppingList] Add Ingredients',
  (data: Ingredient[]) => ({ payload: data })
);

export const deleteIngredient = createAction(
  '[ShoppingList] Delete Ingredient'
);

export const updateIngredient = createAction(
  '[ShoppingList] Update Ingredient',
  (newIngredient: Ingredient) => ({ payload: newIngredient })
);

export const editingIngredientIndex = createAction(
  '[ShoppingList] Editing Ingredient',
  (editingItemIndex: number) => ({ payload: editingItemIndex })
);
