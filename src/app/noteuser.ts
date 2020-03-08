import { Note } from "./note";

export class NoteUser {
  id: Number; 
  //note: Note;

  noteList: Array<Note>;

  constructor(private noteList1: Array<Note>) {
    this.noteList1 = noteList1;   
  }
}
