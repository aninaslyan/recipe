import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { selectRecipe } from '../store/recipe.selector';
import { AppState } from '../../shared/state-helper/state.interface';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe$ = this.store.select(selectRecipe);

  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as UntypedFormArray).controls;
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store<AppState>) {
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
    const recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      this.recipe$.subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        for (const ingredient of recipe.ingredients) {// check the existence of recipe.ingredients
          recipeIngredients.push(
            new UntypedFormGroup({
              name: new UntypedFormControl(ingredient.name, Validators.required),
              amount: new UntypedFormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/(^[1-9]+[0-9]*$)|(^[1-9].[0-9]*$)/)
              ])
            })
          );
        }
      });
    }

    this.recipeForm = new UntypedFormGroup({
      name: new UntypedFormControl(recipeName, Validators.required),
      imagePath: new UntypedFormControl(recipeImagePath, Validators.required),
      description: new UntypedFormControl(recipeDescription, Validators.required),
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
    if(this.editMode) {
      this.store.dispatch(RecipeActions.updateRecipe(this.id, newRecipe));
    } else {
      this.store.dispatch(RecipeActions.addRecipe(newRecipe));
    }
    this.onNavigateClick();
  }

  onAddIngredient() {
    const form = this.recipeForm.get('ingredients') as UntypedFormArray;
    form.push(
      new UntypedFormGroup({
        name: new UntypedFormControl(null, Validators.required),
        amount: new UntypedFormControl(null, [
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
    const input = this.recipeForm.get('ingredients') as UntypedFormArray;
    input.removeAt(index);
  }
}
