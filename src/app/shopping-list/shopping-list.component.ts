import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private ingredientService: ShoppingListService) {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
