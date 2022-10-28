import { Action, createReducer, on } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import { initialState } from './recipe.state';

const _recipeReducer = createReducer(
  initialState,
  on(RecipeActions.getRecipe, (state, { payload }) => ({
    ...state,
    recipe: state.recipes[payload]
  })),
  on(RecipeActions.setRecipe, (state, { payload }) => ({
    ...state,
    recipes: payload
  })),
  on(RecipeActions.fetchRecipesSuccess, (state, { payload }) => ({
    ...state,
    recipes: payload.map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients ? recipe.ingredients : []
    }))
  }))
);

export function recipeReducer(state, action: Action) {
  return _recipeReducer(state, action);
}
