import {Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() clickedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Tiramisu', 'is very tasty', 'https://www.maxpixel.net/static/photo/1x/Menu-Tasty-Cake-Sweet-Food-Tiramisu-Dessert-3338312.jpg'),
    new Recipe('Colorful', 'is not tasty', 'https://images-gmi-pmc.edge-generalmills.com/63b528dc-8beb-4289-96e3-6d8bef0a898d.jpg')
  ];

  ngOnInit(): void {
  }

  onItemClick(recipe: Recipe) {
    this.clickedRecipe.emit(recipe);
  }
}
