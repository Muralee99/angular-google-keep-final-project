
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Category } from '../category';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Reminder } from '../reminder';


@Injectable()
export class ReminderService {

  reminders: Array<Reminder>;
  reminderSubject: BehaviorSubject<Array<Reminder>>;
  token: any;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.reminders = [];
    this.reminderSubject = new BehaviorSubject(this.reminders);
  }

  fetchRemindersFromServer() {
   console.log('fetchCategoriesFromServer');
    this.token = this.authService.getBearerToken();	
    return this.http.get<Array<Reminder>>(`http://localhost:8081/api/v1/reminder/${this.authService.getLoggedInUser()}`,
           { headers : new HttpHeaders().set('Authorization', `Bearer ${this.token}`) }).subscribe(
      reminders => {
      this.reminders = reminders;
      this.reminderSubject.next(this.reminders);
    });
  }

  getReminders(): BehaviorSubject<Array<Reminder>> {
	  console.log('getCategories');
      return this.reminderSubject;
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
      console.log('addReminder '+reminder);
  this.token = this.authService.getBearerToken();
  console.log('category bearer token '+this.token);
    return this.http.post<Reminder>(`http://localhost:8081/api/v1/reminder/${this.authService.getLoggedInUser()}`, reminder, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        }).pipe(tap( addedReminder => {
          this.reminders.push(addedReminder);
          this.reminderSubject.next(this.reminders);
        }));
  }

  editReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.put<Reminder>(`http://localhost:8083/api/v1/reminder/5c0245721bdb291cd09c1d9d`, reminder, {
      headers : new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap( editedReminder => {
      const reminderObject = this.reminders.find(reminderObj => reminderObj.id === editedReminder.id);
      Object.assign(reminderObject , editedReminder);
      this.reminderSubject.next(this.reminders);
    }));
  }
    
  deleteReminder (reminder: Reminder) : Observable<Reminder>{  
		console.log('delete reminder'+ reminder.id);
	    return this.http.delete<Reminder>('http://localhost:8081/api/v1/reminder/'+ reminder.id, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        });
	  	  
  }

  getReminderById(categoryId): Reminder {
    const categoryObject = this.reminders.find(reminder => reminder.id === reminder.id);
    return Object.assign({}, categoryObject);
  }
}
