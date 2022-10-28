import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FeatureSelectors } from '../../shared/state-helper/feature-selectors.enum';
import { RecipeState } from './recipe.state';

const recipeFeature = createFeatureSelector<RecipeState>(FeatureSelectors.Recipe);
const selector = <T>(mapping: (state: RecipeState) => T) => createSelector(recipeFeature, mapping);

export const selectRecipes = selector((state) => state.recipes);
export const selectRecipe = selector((state) => state.recipe);
