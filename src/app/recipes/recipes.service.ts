import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) {
  }

  storeRecipes(recipes: Recipe[]) {
    return this.http.put(environment.apiUrl, recipes);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.apiUrl);
  }
}
