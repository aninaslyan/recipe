import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddClick(evn: Event) {
    evn.preventDefault();
    this.shoppingListService.addIngredient({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    });
  }

  ngOnInit(): void {
  }
}
