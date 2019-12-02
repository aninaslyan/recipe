import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  // inform our component that a new data is available
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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
    for(const ing of this.ingredients) {
      if(ing.name.toLowerCase() === ingredient.name.toLowerCase()) {
        ing.amount = ing.amount + ingredient.amount;
        return this.ingredientChanged.next(this.ingredients.slice());
      }
    }
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
}
