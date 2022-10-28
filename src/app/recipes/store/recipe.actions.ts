import { createAction } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { createHTTPActions } from '../../shared/state-helper/state.helpers';

export const getRecipe = createAction('[Recipe] Get Receipt', (id: number) => ({payload: id}));

export const setRecipe = createAction('[Recipe] Set Receipt', (recipes: Recipe[]) => ({payload: recipes}))

export const [fetchRecipes, fetchRecipesSuccess, fetchRecipesError] = createHTTPActions<void, Recipe[]>('[Recipe] Fetch Recipes');
