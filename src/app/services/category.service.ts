
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Category } from '../category';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class CategoryService {

  categories: Array<Category>;
  categorySubject: BehaviorSubject<Array<Category>>;
  token: any;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.categories = [];
    this.categorySubject = new BehaviorSubject(this.categories);
  }

  fetchCategoriesFromServer() {
   console.log('fetchCategoriesFromServer');
    this.token = this.authService.getBearerToken();	
    return this.http.get<Array<Category>>('http://localhost:8083/api/v1/category/'+this.authService.getLoggedInUser(),
           { headers : new HttpHeaders().set('Authorization', `Bearer ${this.token}`) }).subscribe(
      categories => {
      this.categories = categories;
      this.categorySubject.next(this.categories);
    });
  }

  getCategories(): BehaviorSubject<Array<Category>> {
	  console.log('getCategories');
      return this.categorySubject;
  }

  addCategory(category: Category): Observable<Category> {
  this.token = this.authService.getBearerToken();
  console.log('category bearer token '+this.token);
    return this.http.post<Category>('http://localhost:8083/api/v1/category', category, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        }).pipe(tap( addedCategory => {
          this.categories.push(addedCategory);
          this.categorySubject.next(this.categories);
        }));
  }

  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>('http://localhost:8083/api/v1/category/'+category.id, category, {
      headers : new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap( editedCategory => {
      const categoryObject = this.categories.find(categoryObj => categoryObj.id === editedCategory.id);
      Object.assign(categoryObject , editedCategory);
      this.categorySubject.next(this.categories);
    }));
  }
    
  deleteCategory (category: Category) : Observable<Category>{  
		console.log('delete category'+ category.id);
	    return this.http.delete<Category>('http://localhost:8083/api/v1/category/'+ category.id, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        });
	  	  
  }

  getCategoryById(categoryId): Category {
    const categoryObject = this.categories.find(category => category.id === categoryId);
    return Object.assign({}, categoryObject);
  }
}
