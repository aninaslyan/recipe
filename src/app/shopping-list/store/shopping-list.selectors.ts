import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShoppingListState } from './shopping-list.state';
import { FeatureSelectors } from '../../shared/state/feature-selectors.enum';

const shoppingListFeature = createFeatureSelector<ShoppingListState>(FeatureSelectors.ShoppingList);
const selector = <T>(mapping: (state: ShoppingListState) => T) => createSelector(shoppingListFeature, mapping);


export const selectIngredients = selector((shoppingList: ShoppingListState) => shoppingList.ingredients);

