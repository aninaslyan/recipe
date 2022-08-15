import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredients.model';

@Injectable()
export class ShoppingListService {
  // inform our component that a new data is available
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[] }}>
  ) {
  }
}
