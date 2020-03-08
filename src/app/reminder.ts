export class Reminder {
  id: Number;
  reminderName: string;
  reminderDescription: string;
  reminderType: string;
  reminderCreatedBy: string;
  reminderCreationDate: Date = new Date();
  reminderDateString: string = "";
  constructor(private reminderName1: string, 
              private reminderDescription1: string, 
              private reminderType1: string, 
              private reminderCreatedBy1: string, 
              private reminderCreationDate1: Date, 
              private reminderDateString1: string) {  
    this.reminderName = reminderName1;
    this.reminderDescription = reminderDescription1;
    this.reminderType = reminderType1;
	  this.reminderCreatedBy = reminderCreatedBy1;
    this.reminderCreationDate = reminderCreationDate1;
    this.reminderDateString = reminderDateString1;
  }
}
