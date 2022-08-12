import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShoppingListState } from './shopping-list.state';
import { FeatureSelectors } from '../../shared/state/feature-selectors.enum';

const shoppingListFeature = createFeatureSelector<ShoppingListState>(FeatureSelectors.ShoppingList);
const select = <T>(mapping: (state: ShoppingListState) => T) => createSelector(shoppingListFeature, mapping);

export const selectIngredients = select((shoppingList: ShoppingListState) => shoppingList.ingredients);

