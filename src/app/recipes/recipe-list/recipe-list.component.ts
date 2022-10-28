import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectRecipes } from '../store/recipe.selector';
import { AppState } from '../../shared/state-helper/state.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes$ = this.store.select(selectRecipes);

  constructor(private store: Store<AppState>) {}
}
