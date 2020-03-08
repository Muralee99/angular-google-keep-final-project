import { Component , OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';

@Component({
  selector: 'category-add-dialog',
  templateUrl: 'category-name-dialog-add.component.html'
})
export class FileNameDialogAddComponent implements OnInit {
  category:  Category = new Category('','','',null);
  //states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private dialogRef: MatDialogRef<FileNameDialogAddComponent>,
              @Inject(MAT_DIALOG_DATA)private data: any,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
   
  }

  addCategory() {
    this.category.categoryCreationDate = new Date();
    this.categoryService.addCategory(this.category).subscribe(
      addCategory => {
        this.dialogRef.close();
      },
      err => {
	  console.log('category name error '+err.message);
      this.errMessage = err.message;
      });
  }
}
