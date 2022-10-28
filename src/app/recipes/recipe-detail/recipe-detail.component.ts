import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { addIngredients } from '../../shopping-list/store/shopping-list.actions';
import { AppState } from '../../shared/state-helper/state.interface';
import { getRecipe } from '../store/recipe.actions';
import { selectRecipe } from '../store/recipe.selector';
import { Ingredient } from '../../shared/ingredients.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe$ = this.store.select(selectRecipe);

  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private actions$: Actions,
  ) {
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(addIngredients(ingredients));
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.actions$.pipe(ofType(RecipeActions.fetchRecipesSuccess), take(1)).subscribe(() => {
          this.store.dispatch(getRecipe(this.id));
        })
      });
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
