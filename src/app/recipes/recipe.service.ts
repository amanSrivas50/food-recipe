import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Spring Roll',
      'A Chinese snack consisting of a pancake filled with vegetables and sometimes meat, rolled into a cylinder and deep-fried.',
      'https://pull-revisfoodography.netdna-ssl.com/wp-content/uploads/2017/01/veg-spring-roll-main.jpg',
      [
        new Ingredient('Cabbage', 3),
        new Ingredient('Carrot', 1),
        new Ingredient('Capsicum',2),
        new Ingredient('Spring Onion',3)
      ]),
    new Recipe('Misal Pav',
      ' It consists of misal (a spicy curry usually made from moth beans) and pav (a type of Indian bread roll).',
      'https://i.ytimg.com/vi/sk9LvFuEw_0/maxresdefault.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
      new Recipe(
        'Pizza',
        'A dish of Italian origin, consisting of a flat round base of dough baked with a topping of tomatoes and cheese, typically with added meat, fish, or vegetables.',
        'https://cdn.britannica.com/08/177308-131-DFD947AD/Food-Pizza-Basil-Tomato.jpg',
        [
          new Ingredient('Pizza base',1),
          new Ingredient('Cheese',3),
          new Ingredient('Pizza Sauce',2),
          new Ingredient('vegetables',6)
        ]
      )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
