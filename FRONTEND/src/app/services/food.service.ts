import { Injectable } from '@angular/core';
import { Food } from '../Shared/models/Food';
import { sample_foods, sample_tags } from '../data';
import { Tag } from '../Shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods
  }

  getAllFoodBySearchTerm(searchTerm: string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getFoodById(foodId:number):Food{
    return this.getAll().find(food => food.id == foodId)?? new Food();
  }

  getAllTags():Tag[]{
    return sample_tags;
  }

  getAllFoodsByTag(tag:string):Food[]{
    return tag == "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }
}
