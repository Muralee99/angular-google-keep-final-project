import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';


/** @title Select with multiple selection */
@Component({
  selector: 'category-select',
  templateUrl: 'category-select.component.html',
  styleUrls: [],
})
export class CategorySelectComponent {

    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    public categoryList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    categories : Array<Category>;
    categoriesSelected : Array<Category>;
    errMessage: String;

    toppingLevelChangeAction(topping_level) {
        console.log('toppingLevelChangeAction'+topping_level);
        this.categoryList = topping_level;
        console.log('categoryList '+this.categoryList);
    }

    returnCategories(): string[]{
        return this.categoryList;
    }

  constructor(private categoryService: CategoryService){
   /* categoryService.getCategories().subscribe(
        data => this.categories = data,
        err => {
          this.errMessage = err.message;
          console.log('category-component log '+err.error.message);
        }); */
  }

  ngOnInit(){
    
  }
 
}
