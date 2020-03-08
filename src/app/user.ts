export class User {
  id: Number;
  firstName: string;
  lastName: string;
  userName: string;
  userPassword: string;
  userRole: string;
  userAddedDate: Date;
  userMobile: string;
  userEmail: string;
  constructor(firstName, lastName, username, userPassword, userRole, 
    userAddedDate, userEmail, userMobile) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = username;
    this.userPassword = userPassword;
    this.userRole = userRole;
    this.userAddedDate = userAddedDate;
    this.userMobile = userMobile;
    this.userEmail = userEmail;
  }
}
