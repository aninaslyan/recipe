import { Component, OnInit, Output } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    new Ingredients('flour', 2),
    new Ingredients('sugar', 1.5)
  ];

  constructor() { }
  onAddIngredient(ingredient) {
      this.ingredients.push(new Ingredients(ingredient.name, ingredient.amount));
  }

  ngOnInit() {
  }

}
