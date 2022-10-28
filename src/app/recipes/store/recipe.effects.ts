import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../shared/state-helper/state.interface';
import { selectRecipes } from './recipe.selector';
import { RecipesService } from '../recipes.service';

@Injectable()
export class RecipeEffects {

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.recipesService.fetchRecipes().pipe(
          map(response => RecipesActions.fetchRecipesSuccess('', response)),
          catchError(error  => of(RecipesActions.fetchRecipesError(error)))
        );
      })
    );
  });

  storeRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.storeRecipes),
      // merge value from another observable to this
      withLatestFrom(this.store.select(selectRecipes)),
      switchMap(([, recipes]) => {
        return this.recipesService.storeRecipes(recipes).pipe(
          catchError(error  => of(RecipesActions.storeRecipesError(error)))
        );
      })
    );
  }, {dispatch: false});

  constructor(private readonly actions$: Actions, private readonly recipesService: RecipesService, private store: Store<AppState>) {
  }

}
