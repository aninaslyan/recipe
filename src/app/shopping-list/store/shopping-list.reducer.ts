import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { initialState } from './shopping-list.state';

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, {payload}) => {
    const ingredients = JSON.parse(JSON.stringify(state.ingredients));

    for (const ing of ingredients) {
      if (ing.name.toLowerCase() === payload.name.toLowerCase()) {
        ing.amount = ing.amount + payload.amount;
        return {
          ...state,
          ingredients
        };
      }
    }
    return {...state, ingredients: [...ingredients, payload]};
  }),
  on(ShoppingListActions.deleteIngredient, (state, {payload}) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ingredient, index) => index !== payload)
    }
  }),
  on(ShoppingListActions.updateIngredient, (state, {payload}) => {
    const ingredients = [...state.ingredients];
    ingredients[payload.index] = payload.newIngredient;
    return {
      ...state,
      ingredients
    }
  })
);

export function shoppingListReducer(state, action: Action) {
  return _shoppingListReducer(state, action);
}
