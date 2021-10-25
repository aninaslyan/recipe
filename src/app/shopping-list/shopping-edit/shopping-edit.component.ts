import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] }}>
  ) {
  }

  onSubmit() {
    const value = this.form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClearForm();
  }

  onDeleteItem() {
    if(this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClearForm();
    }
  }

  onClearForm() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.shoppingListService.startedEditing
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.store.select('shoppingList')
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(shoppingList => {
            this.editedItem = shoppingList.ingredients[index];
            this.form.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
}
