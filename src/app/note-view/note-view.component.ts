import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { VERSION, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Category } from '../category';
import { FileNameDialogEditComponent } from '../category-component/category-name-dialog-edit.component';
import { CategoryService } from '../services/category.service';
import { LabeNameDialogComponent } from '../label-name-dialog/label-name-dialog-component.component';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  version = VERSION;
  category: Category = new Category('', '', '', null);
  categoryNames: Array<Category>;
  errMessage: string;
  error: string;

  @Input() notes: Array<Note>;

  rNotes: Array<Note> = [];
  cNotes: Array<Note> = [];

  notesWithReminders: Array<Note> = [];
  notesWithCategories: Array<Note> = [];
  noteValidate: Note;
  noteCategoryValidate: Note;

  categoryNamesValidate: Array<Category> = [];

  fileNameDialogAddRef: MatDialogRef<LabeNameDialogComponent>;
  fileNameDialogEditRef: MatDialogRef<FileNameDialogEditComponent>;

  constructor(private notesService: NotesService, private dialog: MatDialog,
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

  ngOnInit() {
    console.log('ngOnInit.......NoteViewComponent');
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data
      },
      err => {
        this.errMessage = err.error.message;
      });
  }

  getNotesList() {
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data;
      },
      err => {
        this.errMessage = err.error.message;
      });
  }

  getReminderList() {
    this.rNotes = [];
    this.notesService.getNotes().subscribe(
      data => {
        this.notesWithReminders = data;

        var num: number = 0;
        var i: number;
        for (i = num; i <= this.notesWithReminders.length - 1; i++) {

          this.noteValidate = this.notesWithReminders[i];

          if (this.noteValidate.reminders[0] != null && this.noteValidate.reminders[0].reminderCreationDate != null) {
            this.rNotes.push(this.notesWithReminders[i]);
          }
        }
        this.notes = [];
        this.notes = this.rNotes;
      },
      err => {
        this.errMessage = err.error.message;
      });

    console.log('reminder notes length ' + this.notes.length);
  }


  addCategory() {

    this.categoryService.getCategories().subscribe(
      data => this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });

    this.fileNameDialogAddRef = this.dialog.open(LabeNameDialogComponent, {
      data: {

      }
    });
    
    this.fileNameDialogAddRef.afterClosed().subscribe(result => {
    
        console.log('this.fileNameDialogAddRef result '+result);
        window.location.reload();
        //window.location.reload();
    

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

    this.fileNameDialogEditRef = this.dialog.open(FileNameDialogEditComponent, dialogConfig);    
  }

  getCategoryNotes(category: Category) {
    this.cNotes = [];
    this.notesService.getNotes().subscribe(
      data => {
        this.notesWithCategories = data;

        var num: number = 0;
        var i: number;

        for (i = num; i < this.notesWithCategories.length - 1; i++) {

          this.noteCategoryValidate = this.notesWithCategories[i];
          this.categoryNamesValidate = this.noteCategoryValidate.categories;

          this.categoryNamesValidate.forEach(category => {
            if (category.categoryName == category.categoryName) {
              this.cNotes.push(this.notesWithCategories[i]);
            }
          });
        }
        this.notes = [];
        this.notes = this.cNotes;
      },
      err => {
        this.errMessage = err.error.message;
      });

    console.log('category notes length ' + this.cNotes.length);
  }



}
