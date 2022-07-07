import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeChanges = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tiramisu',
  //     'Is very tasty',
  //     'https://img.taste.com.au/gYVkZU8s/w720-h480-cfill-q80/taste/2018/07/july-18_no-cook-tiramisu-cake-138984-1.jpg',
  //     [
  //       new Ingredient('Cheese', 8),
  //       new Ingredient('Cookie', 2),
  //       new Ingredient('Milk', 1),
  //       new Ingredient('Flour', 8)
  //     ]
  //   ),
  //   new Recipe(
  //     'Colorful',
  //     'is not tasty',
  //     'https://images-gmi-pmc.edge-generalmills.com/63b528dc-8beb-4289-96e3-6d8bef0a898d.jpg',
  //     [
  //       new Ingredient('Color', 3),
  //       new Ingredient('Flour', 1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Mikado',
  //     'Chocolate cake',
  //     'http://recipes777.info/wp-content/uploads/2016/12/xCyMZSgKL9Q.jpg"',
  //     [
  //       new Ingredient('Milk', 2),
  //       new Ingredient('Chocolate', 1)
  //     ]
  //   )
  // ];

  getRecipes() {
    return this.recipes.slice(); // copying
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanges.next(this.recipes.slice());
  }
}
