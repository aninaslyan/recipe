import { ShoppingListState } from './shopping-list.state';

export const ingredients = (state: { shoppingList: ShoppingListState }) => state.shoppingList.ingredients;
