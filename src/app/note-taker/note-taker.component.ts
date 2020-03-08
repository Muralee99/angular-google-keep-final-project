import { DatepickerOptions } from 'ng2-datepicker';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { Note } from '../note';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { NotesService } from '../services/notes.service';
import { AmazingTimePickerService } from 'amazing-time-picker'; // this line you need
import { AuthenticationService } from '../services/authentication.service';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../services/category.service';

import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteTakerComponent implements OnInit {

  notifications: string[] = ['daily', 'weekly', 'monthly', 'yearly'];

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthName: string;

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  inputStartDate: Date;
  onlyDate: string;
  stringDate: string;
  inputTime: string;
  public date: Date;
  public reminderDates= new Array<Date>();
  reminder: Reminder;
  public remindersR = new Array<Reminder>();
  public reminderStrings = new Array<string>();

  timepick: string;
  public remindersselect: Reminder;

  notesWithReminders: Array<Note> = [];
  notes: Array<Note> = [];
  noteValidate: Note;

  catFormControl = new FormControl();
  toppingList: string[];
  topping: string;
  user: string;
  categories: Array<Category> = [];

  categoryListSelected: Category[] = [];
  categoryListCheck: Category[] = [];

  remindersSelected: Reminder[] = [];
  reminders: Reminder[];

  testCategory: Category=null;

  show: string = "";
  note: Note = new Note('', '', 'not-started', new Date(),this.authenticationService.getLoggedInUser(), this.categories, this.reminders);
  errMessage: string;

  today = new Date();
  tomorrow = new Date(this.today.setDate(this.today.getDate() + 1));
  nextweek = new Date(this.today.setDate(this.today.getDate() + 7));

  constructor(private atp: AmazingTimePickerService, private notesService: NotesService,
    private reminderService: ReminderService,
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService) {
    this.user = authenticationService.getLoggedInUser();
    categoryService.fetchCategoriesFromServer();

    categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      },
      err => {
        this.errMessage = err.message;
      });
  }

  ngOnInit() {

  }

  takeNotes() {
    this.note.noteCreatedBy = this.authenticationService.getLoggedInUser();
    this.note.noteStatus = 'not-started';

    var num: number = 0;    
   for(num =0; num <= this.categoryListCheck.length-1; num++){     
    this.categoryListSelected[num].categoryId = this.categoryListCheck[num].id;
   }

    this.note.categories = (this.categoryListSelected);
    this.note.reminders = this.remindersR;

    console.log('this.note.categories'+this.note.categories.length);

    if (this.note.reminders.length > 0) {
      this.reminderService.addReminder(this.remindersR[0]).subscribe(
        data => { },
        err => {
          this.errMessage = err.error ? err.error.message : err.message;
          const index: number = this.remindersR.findIndex(rem => rem.reminderName === this.remindersR[0].reminderName);
          this.notes.splice(index, 1);
        });
    }

    if ((this.note.noteTitle.length > 0) || (this.note.noteContent.length > 0)) {
      this.notesService.addNote(this.note).subscribe(
        data => { },
        err => {
          this.errMessage = err.error ? err.error.message : err.message;
          const index: number = this.notes.findIndex(note => note.noteTitle === this.note.noteTitle);
          this.notes.splice(index, 1);
        });
      this.note = new Note('', '', '', null, '', null, null);
      this.categoryListSelected = new Array<Category>();
      this.remindersR = new Array<Reminder>();
      this.categories = [];

    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }

  onCategorySelect(topping_level) {
    this.categoryListSelected = topping_level;
    this.categoryListCheck = topping_level;   
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

  getNotesList() {
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data
      },
      err => {
        this.errMessage = err.error.message;
      });
  }

  getReminderList() {
    this.notesService.fetchNotesFromServer();
    this.notesService.getNotes().subscribe(
      data => {
        this.notesWithReminders = data;
        var num: number = 0;
        var i: number;
        for (i = num; i < this.notesWithReminders.length - 1; i++) {
          this.noteValidate = this.notesWithReminders[i];
          if (this.noteValidate.reminders[0].reminderCreationDate != null) {
            this.notes.push(this.notesWithReminders[i]);
          }
        }
      },
      err => {
        this.errMessage = err.error.message;
      });
  }

}
