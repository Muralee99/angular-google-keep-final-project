import { Category } from "./category";
import { Reminder } from "./reminder";

export class Note {
  id: Number;
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;
  noteCreationDate: Date;
  noteCreatedBy: string;
  categories: Array<Category> = new Array<Category>();
  reminders: Array<Reminder>;
  isCategoriesExist:boolean = true;
  isRemindersExist:boolean = true;

  constructor(private noteTitle1: string, private noteContent1: string, private noteStatus1: string, private noteCreationDate1: Date,
    private noteCreatedBy1: string, private categories1: Array<Category>, private reminders1: Array<Reminder>) {    
    this.noteTitle = noteTitle1;
    this.noteContent = noteContent1;
    this.noteStatus = noteStatus1;
    this.noteCreationDate = noteCreationDate1;
    this.noteCreatedBy = noteCreatedBy1;
    this.categories = categories1;
    this.reminders = reminders1;
  }
}
