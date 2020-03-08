import {Component} from '@angular/core';
import {Time} from '@angular/common';
import {FormControl} from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { AuthenticationService } from '../services/authentication.service';
import { NoteTakerComponent } from '../note-taker/note-taker.component';

import { ViewChild } from '@angular/core'
import { Reminder } from '../reminder';


/** @title Select with multiple selection */
@Component({
  selector: 'reminder-select',
  templateUrl: 'reminder-select.component.html',
  styleUrls: [],
})
export class ReminderSelectComponent{

  inputStartDate: Date;
  onlyDate: string;
  inputTime: string;
  public date: Date;
  reminder: Reminder;
  public remindersR: Array<Reminder>;
  public remindersselect: Reminder;
  
  constructor(private atp: AmazingTimePickerService, private authService: AuthenticationService){

  }

  ngOnInit(){

  }

  recordReminder(){

    this.onlyDate = this.inputStartDate.toDateString();
    this.date = new Date(this.onlyDate+' '+this.inputTime+':00');   
    this.reminder = new Reminder('ruser', 'reminderdesc', 'daily', this.authService.getRegisteredUser(), this.date,''); 
    this.remindersR[0]=this.reminder;
    //this.remindersselect = (this.reminder); 
  }

  getRecordedReminder(): Reminder[]
  {
    return this.remindersR;
  }
  

  open(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.inputTime = time;    
    });
  }
 
}
