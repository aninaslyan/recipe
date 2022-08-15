import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { initialState } from './shopping-list.state';

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, {payload}) => {
    const modifiedState = JSON.parse(JSON.stringify(state));
    for (const ing of modifiedState.ingredients) {
      if (ing.name.toLowerCase() === payload.name.toLowerCase()) {
        ing.amount = ing.amount + payload.amount;
        return {
          ...state,
          ingredients: [...modifiedState.ingredients]
        };
      }
    }
    return {...state, ingredients: [...state.ingredients, payload]};
  }),
  on(ShoppingListActions.deleteIngredient, (state, {payload}) => {
    const modifiedState = JSON.parse(JSON.stringify(state));
    modifiedState.ingredients.splice(payload, 1);
    return {
      ...state,
      ingredients: modifiedState.ingredients
    }
  }),
  on(ShoppingListActions.updateIngredient, (state, {payload}) => {
    const modifiedState = JSON.parse(JSON.stringify(state));
    modifiedState.ingredients[payload.index] = payload.newIngredient;
    return {
      ...state,
      ingredients: modifiedState.ingredients
    }
  })
);

export function shoppingListReducer(state, action: Action) {
  return _shoppingListReducer(state, action);
}
