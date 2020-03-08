import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {

  catFormControl = new FormControl();

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthName: string;
  stringDate: string;
  public reminderDates= new Array<Date>();
  public reminderStrings = new Array<string>();
  timepick: string;
  user: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  note: Note = null;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string; 

  inputStartDate: Date;
  onlyDate: string;
  inputTime: string;
  public date: Date;
  reminder: Reminder;

  today = new Date();
  tomorrow = new Date(this.today.setDate(this.today.getDate() + 1));
  nextweek = new Date(this.today.setDate(this.today.getDate() + 7));

  categories: Array<Category> = [];

  categoryListSelected: Category[] = new Array<Category>();
  remindersR: Reminder[] = new Array<Reminder>();


  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService, private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private atp: AmazingTimePickerService,
    private routerService: RouterService,
    private notesService: NotesService,
    private reminderService: ReminderService
  ) {

    categoryService.fetchCategoriesFromServer();

    categoryService.getCategories().subscribe(
      data1 => {
        this.categories = data1
      },
      err => {
        this.errMessage = err.message;
      });

  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
    this.note.id = this.data.noteId;
    console.log('edit-note-view.component ............ '+this.note.noteTitle);
    this.categoryListSelected = this.note.categories;
    this.remindersR = this.note.reminders;
  }

  onSave() {
    this.note.categories = (this.categoryListSelected);
    this.note.reminders = this.remindersR;

    if ((this.note.noteTitle.length > 0) || (this.note.noteContent.length > 0)) {
      this.notesService.editNote(this.note).subscribe(
        data => {    
          console.log('Note successfully saved');     
          this.dialogRef.close();                      
                },
        err => {
          this.errMessage = err.error ? err.error.message : err.message;
        });
      this.categoryListSelected = new Array<Category>();
      this.remindersR = new Array<Reminder>();
      this.categories = [];

    } else {
      this.errMessage = 'Title and Text both are required fields';
    }   
  }

  onDelete() {
    this.noteService.deleteNote(this.note).subscribe(
      editNote => {
        this.dialogRef.close();               
      },
      err => {
        this.errMessage = err.message;
      });   
      //window.location.reload();
  }

  onCategorySelect(topping_level) {
    this.categoryListSelected = topping_level;
  }

  onReminderSelect() {
    this.onlyDate = this.inputStartDate.toDateString();
    this.date = new Date(this.onlyDate + ' ' + this.inputTime + ':00');

    this.monthName = this.monthNames[this.inputStartDate.getMonth()];

    this.stringDate = this.monthName + ' ' + this.inputStartDate.getDate() + ', ' +
      this.inputStartDate.getFullYear() + ' ' + this.inputTime;

    this.reminderDates.push(this.date);
    this.reminderStrings.push(this.stringDate);
    this.reminder = new Reminder('ruser', 'reminderdesc', 'daily', this.user, this.date, this.stringDate);
    this.remindersR.push(this.reminder);
  }

  open(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.inputTime = time;
      this.timepick = this.inputTime;
    });
  }

  removeCategories(category: Category): void {
    let index = this.categoryListSelected.indexOf(category);
    this.categoryListSelected.splice(index, 1);
  }

  removeReminders(reminder: Reminder): void {
    let index = this.remindersR.indexOf(reminder);
    this.remindersR.splice(index, 1);
  }

  onTodayClick() {
    this.today = new Date();
    this.today.setHours(8);
    this.today.setMinutes(30);

    this.reminder = new Reminder('today', 'reminderdesc', 'daily', this.user, this.today, 'Today, 8:30 PM');
    this.remindersR.push(this.reminder);
    this.reminderStrings.push('Today, 8:30 PM');
  }

  onTomorrowClick() {
    this.tomorrow.setHours(8);
    this.tomorrow.setMinutes(30);

    this.reminder = new Reminder('tomorrow', 'reminderdesc', 'daily', this.user, this.tomorrow, 'Tomorrow, 8:30 PM');
    this.remindersR.push(this.reminder);
    this.reminderStrings.push('Tomorrow, 8:30 PM');
  }

  onNextWeekClick() {
    this.nextweek.setHours(8);
    this.nextweek.setMinutes(30);

    this.reminder = new Reminder('nextweek', 'reminderdesc', 'daily', this.user, this.nextweek, 'Nextweek, 8:30 PM');
    this.remindersR.push(this.reminder);
    this.reminderStrings.push('Nextweek, 8:30 PM');
  }

}
