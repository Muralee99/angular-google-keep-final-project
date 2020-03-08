import { Component } from '@angular/core';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { FileNameDialogAddComponent } from './category-name-dialog-add.component';
import { FileNameDialogEditComponent } from './category-name-dialog-edit.component';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { MatDialogConfig } from "@angular/material";

import { filter } from 'rxjs/operators';

@Component({
  selector: 'material-app',
  templateUrl: 'category-component.component.html'
})
export class CategoryComponent {
  version = VERSION;
  category: Category = new Category('', '', '', null);
  categoryNames: Array<Category>;
  errMessage: string;
  error: string;



  fileNameDialogAddRef: MatDialogRef<FileNameDialogAddComponent>;
  fileNameDialogEditRef: MatDialogRef<FileNameDialogEditComponent>;

  constructor(private dialog: MatDialog,
    private categoryService: CategoryService) {
    this.categoryService.fetchCategoriesFromServer();

    this.categoryService.getCategories().subscribe(
      data =>
        this.categoryNames = data,
      err => {
        this.errMessage = err.message;
        console.log('category-component log ' + err.error.message);
      });
  }

  addCategory() {
    console.log('category-component openFileDialog');
    this.categoryService.getCategories().subscribe(
      data => this.categoryNames = data,
      err => {
        this.errMessage = err.message;
        console.log('category-component log ' + err.error.message);
      });

    console.log('category list ' + this.categoryNames.length);

    this.fileNameDialogAddRef = this.dialog.open(FileNameDialogAddComponent, {
      data: {

      }
    });
  }

  editCategory(file?) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      cat: file
    };

    console.log('category-component edit category');
    this.categoryService.getCategories().subscribe(
      data => this.categoryNames = data,
      err => {
        this.errMessage = err.message;
        console.log('category-component log ' + err.error.message);
      });

    console.log('category list ' + this.categoryNames.length);
    console.log('category details ' + file.categoryName);

    this.fileNameDialogEditRef = this.dialog.open(FileNameDialogEditComponent, dialogConfig);
    //this.fileNameDialogEditRef.categoryName = 'aaaaaaaaaaaaa';
  }
}

