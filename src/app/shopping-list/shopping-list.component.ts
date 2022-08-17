import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from '../logging.service';
import { selectIngredients } from './store/shopping-list.selectors';
import { editingIngredientIndex } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  // to select a part of your state (select state inside shoppingList key)
  // returns an Observable
  // no need to manage ngrx subscription (removed this.subscription) - BUT it's advised to unsubscribe manually
  ingredients$ = this.store.select(selectIngredients);

  constructor(
    private loggingService: LoggingService,
    private store: Store, // <{ shoppingList: { ingredients: Ingredient[] }}>
  ) {
  }

  onEditItem(index: number) {
    this.store.dispatch(editingIngredientIndex(index));
  }

  ngOnInit() {
    this.loggingService.printLog('Hello from ShoppingList component ngOnInit');
  }
}
