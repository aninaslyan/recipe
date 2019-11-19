import { Ingredient } from '../shared/ingredients.model';

export class Recipe {
  name: string;
  description: string;
  imagePath: string;

  constructor(name: string, description: string, imagePath: string, public ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
