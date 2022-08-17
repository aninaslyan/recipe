import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Ingredient } from '../../shared/ingredients.model';
import { addIngredient, deleteIngredient, editingIngredientIndex, updateIngredient } from '../store/shopping-list.actions';
import { selectIngredients } from '../store/shopping-list.selectors';
import { ShoppingListState } from '../store/shopping-list.state';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  editMode = false;
  editedItem: Ingredient;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private store: Store<{ shoppingList: ShoppingListState }>,
    private actions$: Actions
  ) {
  }

  onSubmit() {
    const value = this.form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient(newIngredient));
    } else {
      this.store.dispatch(addIngredient(newIngredient));
    }
    this.onClearForm();
  }

  onDeleteItem() {
    if (this.editMode) {
      this.store.dispatch(deleteIngredient());
      this.onClearForm();
    }
  }

  onClearForm() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.actions$.pipe(ofType(editingIngredientIndex), takeUntil(this.ngUnsubscribe)).subscribe(({payload}) => {
      this.editMode = true;
      this.store.select(selectIngredients)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(ingredients => {
          this.editedItem = ingredients[payload];
          if (this.editedItem) {
            this.form.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
}
