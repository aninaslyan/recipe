import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../shared/state-helper/state.interface';
import * as RecipesActions from './store/recipe.actions';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<void> {

  constructor(
    private recipesService: RecipesService,
    private store: Store<AppState>,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(RecipesActions.fetchRecipes());
  }
}
