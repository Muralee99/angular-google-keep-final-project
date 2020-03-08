export class Register {
  userId: string;
  userPassword: string;
  userRole: string;
  constructor(userId, userPassword) {
    this.userId = userId;
    this.userPassword = userPassword;
    this.userRole = 'admin';
  }
}
