import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';

import * as shoppingListActions from './shopping-list.actions';

@Injectable()
export class ShoppingListEffects {

  addIngredients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(shoppingListActions.addIngredients),
      mergeMap(({payload}) => payload.map(ingredient => shoppingListActions.addIngredient(ingredient)))
    );
  });

  constructor(
    private readonly actions$: Actions,
  ) {
  }
}
