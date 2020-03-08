
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Note } from '../note';
import { NoteUser } from '../noteuser';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Category } from '../category';


@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  token: any;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {	
    this.token = this.authService.getBearerToken();
    return this.http.get<Array<Note>>(`http://localhost:8082/api/v1/note/`+this.authService.getLoggedInUser(),
           { headers : new HttpHeaders().set('Authorization', `Bearer ${this.token}`) }).subscribe(
      notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
      return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:8082/api/v1/note', note, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        }).pipe(tap( addedNote => {
          this.notes.push(addedNote);
          this.notesSubject.next(this.notes);
        }));
  }

  editNote(note): Observable<Note> {
    console.log('edited note for testing '+note.id)
    return this.http.put<Note>(`http://localhost:8082/api/v1/note/${this.authService.getLoggedInUser()}/`+note.id, note, {
      headers : new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    });
  }

 /* getNoteById(noteId): Observable<Note> {
    console.log('getNoteById new'+noteId);
    Observable<Note>: obNote = this.http.get<Note>('http://localhost:8082/api/v1/note/admin/'+noteId,
           { headers : new HttpHeaders().set('Authorization', `Bearer ${this.token}`) });
  }*/

  getNoteById(noteId): Note {
    console.log('getNoteById '+noteId);
    const noteObject = this.notes.find(note =>
       note.noteId === noteId);

       //console.log('getNoteById getNoteById is.....'+noteObject);

    return Object.assign({}, noteObject);
  }

  deleteNote(note: Note) {
    console.log('deleteNote calling'+note.noteId);    
    return this.http.delete<Note>(`http://localhost:8082/api/v1/note/${this.authService.getLoggedInUser()}/`+note.noteId, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        });
  }

  getNoteByCategoryID(category: Category) {
    console.log('deleteNote calling '+category.id);
    return this.http.post<Note>(`http://localhost:8082/api/v1/note/category/${this.authService.getLoggedInUser()}/`+category.id, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        });
  }

  updateNoteByCategoryID(category: Category) {
    console.log('updateNoteByCategoryID  calling '+category.id);
    return this.http.put<Note>(`http://localhost:8082/api/v1/note/category/${this.authService.getLoggedInUser()}/`+category.id, category, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        });
  }
}
