import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { AppState } from './state-helper/state.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private store: Store<AppState>) {
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.apiUrl);
  }
}
