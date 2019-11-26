import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  // inform our component that a new data is available
  ingredientChanged = new Subject<Ingredient[]>();

  constructor() {
  }

  private ingredients = [
    new Ingredient('Flour', 2),
    new Ingredient('Sugar', 1.5)
  ];

  getIngredients() {
    return this.ingredients.slice(); // remove slice if you want to edit our old ingredient instead of new ingredient (preferred way)
  }

  addIngredient(ingredient: Ingredient) {
    // in case the product already exists
    // console.log(ingredient);
    // for (const val of this.ingredients) {
    //   if (val.name === ingredient.name) {
    //     val.amount = ingredient.amount;
    //     return this.ingredientChanged.emit(this.ingredients.slice());
    //   }
    // }

    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
