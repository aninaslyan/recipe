import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {}

  private recipes: Recipe[] = [
    new Recipe('Tiramisu', 'is very tasty', 'https://www.maxpixel.net/static/photo/1x/Menu-Tasty-Cake-Sweet-Food-Tiramisu-Dessert-3338312.jpg'),
    new Recipe('Colorful', 'is not tasty', 'https://images-gmi-pmc.edge-generalmills.com/63b528dc-8beb-4289-96e3-6d8bef0a898d.jpg')
  ];

  getRecipes() {
    return this.recipes.slice(); // copying
  }
}
