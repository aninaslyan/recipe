import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ShoppingListState } from './shopping-list.state';
import { FeatureSelectors } from '../../shared/state/feature-selectors.enum';

const shoppingListFeature = createFeatureSelector<ShoppingListState>(FeatureSelectors.ShoppingList);

export const selectIngredients = createSelector(shoppingListFeature, shoppingList => shoppingList.ingredients);
