import { Component, OnInit, VERSION } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { LabeNameDialogComponent } from '../label-name-dialog/label-name-dialog-component.component';
import { FileNameDialogEditComponent } from '../category-component/category-name-dialog-edit.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  version = VERSION;
  category: Category = new Category('', '', '', null);
  categoryNames: Array<Category>;
  errMessage: string;
  error: string;

  rNotes: Array<Note> = [];
  cNotes: Array<Note> = [];


  notes: Array<Note> = [];


  notesWithReminders: Array<Note> = [];
  notesWithCategories: Array<Note> = [];
  noteValidate: Note;
  noteCategoryValidate: Note;

  categoryNamesValidate: Array<Category> = [];

  fileNameDialogAddRef: MatDialogRef<LabeNameDialogComponent>;
  fileNameDialogEditRef: MatDialogRef<FileNameDialogEditComponent>;


  notStartedNotes = new Array<Note>();
  startedNotes = new Array<Note>();
  completedNotes = new Array<Note>();
  allNotes = new Array<Note>();

  constructor(private noteService: NotesService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private notesService: NotesService)
     {
    this.notStartedNotes = new Array<Note>();
    this.startedNotes = new Array<Note>();
    this.completedNotes = new Array<Note>();


    this.categoryService.fetchCategoriesFromServer();

    this.categoryService.getCategories().subscribe(
      data =>
        this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });
  }

  ngOnInit() {

    this.notStartedNotes = new Array<Note>();
    this.startedNotes = new Array<Note>();
    this.completedNotes = new Array<Note>();
    this.allNotes = new Array<Note>();

    console.log('Length of notStartedNotes '+this.notStartedNotes.length);

    this.noteService.getNotes().subscribe(
      notes => {
        notes.map(note => {
          if (note.noteStatus === 'not-started') {
            this.notStartedNotes.push(note);
          } else if (note.noteStatus === 'started') {
            this.startedNotes.push(note);
          } else if (note.noteStatus === 'completed') {
            this.completedNotes.push(note);
          }
        });
      }
    );

    
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

    this.categoryService.getCategories().subscribe(
      data =>
        this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });

  }

  editCategory(file?) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      cat: file
    };

    this.categoryService.getCategories().subscribe(
      data => this.categoryNames = data,
      err => {
        this.errMessage = err.message;
      });
    this.fileNameDialogEditRef = this.dialog.open(FileNameDialogEditComponent, dialogConfig);
  }

  getCategoryNotes(category: Category) {
    this.noteService.getNotes().subscribe(
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

        this.notes.map(note => {
          if (note.noteStatus === 'not-started') {
            this.notStartedNotes.push(note);
          } else if (note.noteStatus === 'started') {
            this.startedNotes.push(note);
          } else if (note.noteStatus === 'completed') {
            this.completedNotes.push(note);
          }
        });

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
  this.notesService.getNotes().subscribe(
    data => {
      this.notesWithReminders = data;

      var num: number = 0;
      var i: number;

      for (i = num; i < this.notesWithReminders.length - 1; i++) {

        this.noteValidate = this.notesWithReminders[i];

        if (this.noteValidate.reminders[0] != null && this.noteValidate.reminders[0].reminderCreationDate != null) {
          console.log('inside if condition for reminder');
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

}
