import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'get-home-view',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  errMessage: string;
  notesWithReminders: Array<Note> = [];
  notes: Array<Note> = [];
  noteValidate: Note;

 // @ViewChild(NoteComponent) noteComponent;
 
  constructor(private notesService: NotesService, private routerService: RouterService) {
  }

  getNotesList(){
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data
        //console.log('ngOnInit ********* '+this.notes[0].id);
      },
      err => {
        this.errMessage = err.error.message;
      });
     // this.noteComponent
  }

  getReminderList(){
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(
      data => {

       this.notesWithReminders = data;

       var num:number = 0; 
       var i:number;        
       
       for(i = num; i<this.notesWithReminders.length-1; i++) {

        this.noteValidate = this.notesWithReminders[i];
     
          if(this.noteValidate.reminders[0].reminderCreationDate != null)
          {
            this.notes.push(this.notesWithReminders[i]);
          }
       }              
      },
      err => {
        this.errMessage = err.error.message;
      });    
  }

  
}
