import { Component , OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';

@Component({
  selector: 'category-edit-dialog',
  templateUrl: 'category-name-dialog-edit.component.html'
})
export class FileNameDialogEditComponent implements OnInit {
  category:  Category = new Category('','','',null);
  //states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;  
  //category: Category;
  
  constructor(private dialogRef: MatDialogRef<FileNameDialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService
              ) {
			  //this.dialogRef.data.category.categoryName = this.data.cat.categoryName;
			  
  }

  ngOnInit() {   
	console.log('edit category ngOnInit*************************************'+this.data.cat.categoryName);
	//this.dialogRef.data.category.categoryName = this.data.cat.categoryName;
    //console.log('edit category dialogRef*************************************'+this.dialogRef.data);
	this.category = this.data.cat;
	
  }

  editCategory() {
  //this.dialogRef.data = this.data.cat;
  console.log('this.data.cat '+this.data.cat.categoryName);
  this.category = this.data.cat;
    this.categoryService.editCategory(this.category).subscribe(
      addCategory => {
        this.dialogRef.close();
      },
      err => {
	  console.log('category name error '+err.message);
      this.errMessage = err.message;
      });
  }
  
  deleteCategory() {
	console.log('deleteCategory '+this.category);
    this.categoryService.deleteCategory(this.category).subscribe(
	 addCategory => {
        this.dialogRef.close();
      },
      err => {
	  console.log('category name error '+err.message);
      this.errMessage = err.message;
      });
  }
  
  }
