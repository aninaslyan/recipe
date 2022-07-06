import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addIngredient } from './store/shopping-list.actions';

@Injectable()
export class ShoppingListService {
  // inform our component that a new data is available
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[] }}>
  ) {
  }

  private ingredients = [
    new Ingredient('Flour', 2),
    new Ingredient('Sugar', 1.5)
  ];

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ingredient => {
      this.store.dispatch(addIngredient(ingredient));
    });
  }
}
