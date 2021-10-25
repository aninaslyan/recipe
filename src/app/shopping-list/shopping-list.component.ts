import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private ingredientService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] }}>,
  ) {
  }

  onEditItem(index: number) {
    this.ingredientService.startedEditing.next(index);
  }

  ngOnInit() {
    // to select a part of your state (select state inside shoppingList key)
    // returns an Observable
    // no need to manage ngrx subscription (removed this.subscription) - BUT it's advised to unsubscribe manually
    this.ingredients = this.store.select('shoppingList');

    this.loggingService.printLog('Hello from ShoppingList component ngOnInit');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
