import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { HomeComponent } from '../home/home.component';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @Input() note: Note;

  constructor(private dialog: MatDialog, private routerService: RouterService) {

  }

  openEditView() {
    //this.routerService.routeToEditNoteView(this.note.noteId);
    //this.note = null;
    this.dialog.open(EditNoteViewComponent, {
      height: '450px',
      width: '750px',
      data: {
        noteId: this.note.noteId
      }
    }).afterClosed().subscribe(result => {
     //this.routerService.routeBack();
        //this.routerService.navigateByUrl('','');    
          window.location.reload();
      });
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (input) {
      input.value = '';
    }
  }

  removeCategories(note: Note, category: Category): void {
    let index = this.note.categories.indexOf(category);
    this.note.categories.splice(index, 1);
  }

  removeReminders(note: Note, reminder: Reminder): void {
    let index = this.note.reminders.indexOf(reminder);
    this.note.reminders.splice(index, 1);
  }



}
