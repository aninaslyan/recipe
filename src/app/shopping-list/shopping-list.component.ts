import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private ingredientService: ShoppingListService, private loggingService: LoggingService) {
  }

  onEditItem(index: number) {
    this.ingredientService.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this.ingredientService.getIngredients();
    this.subscription = this.ingredientService.ingredientChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });

    this.loggingService.printLog('Hello from ShoppingList component ngOnInit');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
