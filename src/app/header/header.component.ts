import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { isAuthenticated } from '../auth/store/auth.selectors';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated$ = this.store.select(isAuthenticated);

  constructor(private recipesService: RecipesService, private authService: AuthService, private store: Store) {
  }

  onSaveData() {
    this.store.dispatch(RecipeActions.storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  onLogOut() {
    this.authService.logOut();
  }
}
