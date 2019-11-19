import { Ingredient } from '../shared/ingredients.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  // inform our component that a new data is available
  ingredientChanged = new EventEmitter<Ingredient[]>();

  constructor() {
  }

  private ingredients = [
    new Ingredient('flour', 2),
    new Ingredient('sugar', 1.5)
  ];

  getIngredients() {
    return this.ingredients.slice(); // remove slice if you want to edit our old ingredient instead of new ingredient (preferred way)
  }

  addIngredient(ingredient) {
    this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
