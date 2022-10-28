import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { AppState } from '../shared/state-helper/state.interface';
import { selectRecipes } from './store/recipe.selector';
import * as RecipesActions from './store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<void> {

  recipes$ = this.store.select(selectRecipes);

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService,
    private store: Store<AppState>,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(RecipesActions.fetchRecipes());
  }
}
