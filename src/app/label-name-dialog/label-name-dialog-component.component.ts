import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect, MatDialog } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { MyDeleteDialogComponent } from '../my-delete-dialog/my-delete-dialog.component';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'label-name-dialog',
  templateUrl: './label-name-dialog.component.html',
  styleUrls: ['./label-name.component.css']
})
export class LabeNameDialogComponent implements OnInit {
  category: Category = new Category('', '', '', null);
  //states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  categoryNames: Array<Category>;
  newCategoryName: string;
  enableEditCat: boolean;
  saveLabelAfterEdit: Category;

  constructor(private dialogRef: MatDialogRef<LabeNameDialogComponent>, 
    private dialogDelete: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService,
    private notesService: NotesService,
    private routerService: RouterService) {

    this.categoryService.fetchCategoriesFromServer();

    this.categoryService.getCategories().subscribe(
      data =>
        this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });

  }

  ngOnInit() {

  }

  createNewCategory(newCategoryName: string) {
    this.category = new Category(newCategoryName, 'new Categroy Created', '', new Date());
    this.category.categoryCreationDate = new Date();
    this.categoryService.addCategory(this.category).subscribe(
      data => {
        this.category = data;
        this.refreshCategories();
        this.newCategoryName = '';
        //this.dialogRef.close();
      },
      err => {
        this.errMessage = err.message;
      });

      this.refreshCategories();
  }

  clearCategroyLabel() {
    this.newCategoryName = '';
  }

  enableEditCategory(category: Category) {
    this.saveLabelAfterEdit = category;
  }

  editSaveCategory(category: Category) {
    
    if(category != null){
    this.category.categoryCreationDate = new Date();
    this.categoryService.editCategory(category).subscribe(
      addCategory => {
        this.refreshCategories();
        this.dialogRef.close('Delete'+category);
        
      },
      err => {
        this.errMessage = err.message;
        this.refreshCategories();
      });


      this.notesService.updateNoteByCategoryID(category).subscribe(
        deleteCategory => 
      {
        this.refreshCategories();    
        window.location.reload();  
      },
        err => {
          this.errMessage = err.message;
        }
      ); 

    }else{
      this.dialogRef.close();
    }
    
  }

  openDialog(category: Category) {
    let dialogRef = this.dialogDelete.open(MyDeleteDialogComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Delete') 
      {
        this.categoryService.deleteCategory(category).subscribe(deleteCategory => 
        {
          this.refreshCategories();
        },
          err => {
            this.errMessage = err.message;
          }
        );
          console.log('before calling note updates'+category.id);
        this.notesService.getNoteByCategoryID(category).subscribe(
          deleteCategory => 
        {
          this.refreshCategories();
          this.routerService.routeToNoteView();
        },
          err => {
            this.errMessage = err.message;
          }
        ); 


      }
    });
    this.refreshCategories();
  }

  refreshCategories(){
    this.categoryService.fetchCategoriesFromServer();

    this.categoryService.getCategories().subscribe(
      data =>
        this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });
  }

}
