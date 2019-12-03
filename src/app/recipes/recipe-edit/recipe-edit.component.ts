import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = +params.id;
        this.editMode = params.id !== undefined;
        this.initForm();
      });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      for(const ingredient of recipe.ingredients) {// check the existence of recipe.ingredients
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount)
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient() {
    const form = this.recipeForm.get('ingredients') as FormArray;
    form.push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }
}
