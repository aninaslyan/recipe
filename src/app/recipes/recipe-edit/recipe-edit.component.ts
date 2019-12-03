import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
  }

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

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      for (const ingredient of recipe.ingredients) {// check the existence of recipe.ingredients
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/(^[1-9]+[0-9]*$)|(^[1-9].[0-9]*$)/)
            ])
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients,
    );
    if(this.editMode) {// this.recipeForm.value
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onNavigateClick();
  }

  onAddIngredient() {
    const form = this.recipeForm.get('ingredients') as FormArray;
    form.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/(^[1-9]+[0-9]*$)|(^[1-9].[0-9]*$)/)
        ])
      })
    );
  }

  onNavigateClick() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number) {
    const input = this.recipeForm.get('ingredients') as FormArray;
    input.removeAt(index);
  }
}
