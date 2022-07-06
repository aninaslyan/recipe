import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { initialState } from './shopping-list.state';

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredientSuccess, (state, { payload }) => {
      for(const ing of state.ingredients) {
        if(ing.name.toLowerCase() === payload.name.toLowerCase()) {
          ing.amount = ing.amount + payload.amount;
          return {
            ...state,
            ingredients: [...state.ingredients]
          };
        }
      }
    return {...state, ingredients: [...state.ingredients, payload]}
  })
);

export function shoppingListReducer(state, action: Action) {
  return _shoppingListReducer(state, action);
}
