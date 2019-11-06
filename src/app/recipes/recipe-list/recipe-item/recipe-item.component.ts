import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() itemClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onItemClick(evn) {
    this.itemClick.emit(); // there is not need to emit an event
  }
}
