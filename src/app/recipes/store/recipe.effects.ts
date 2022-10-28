import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import * as RecipesActions from './recipe.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DataStorageService } from '../../shared/data-storage.service';
import { fetchRecipesSuccess } from './recipe.actions';

@Injectable()
export class RecipeEffects {

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.dataStorageService.fetchRecipes().pipe(
          map(response => fetchRecipesSuccess('', response)),
          catchError(error  => of(RecipesActions.fetchRecipesError(error)))
        );
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly dataStorageService: DataStorageService) {
  }

}
