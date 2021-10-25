import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Flour', 2),
    new Ingredient('Sugar', 1.5)
  ]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      const stateIngredients = JSON.parse(JSON.stringify(state.ingredients));

      for(const ing of stateIngredients) {
        if(ing.name.toLowerCase() === action.payload.name.toLowerCase()) {
          ing.amount = ing.amount + action.payload.amount;
          return {
            ...state,
            ingredients: [...stateIngredients]
          };
        }
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
