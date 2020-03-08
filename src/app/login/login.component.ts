import { Component, OnInit, Inject } from '@angular/core';
import { Register } from '../register';
import { FormControl , Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { RegistrationComponent } from '../registration/registration.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  
  public bearerToken: any;
  public submitMessage: string;

  dialogRef: MatDialogRef<RegistrationComponent>;


  constructor(private _authService: AuthenticationService,
              private routerService: RouterService,
              private regDialog: MatDialog,
    ) { }

  ngOnInit() {
    this._authService.setLoggedInUser("");
  }

  getUserNameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value of username' : ' ';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value of password' : ' ';
  }

    loginSubmit() {
     // const user: User = new User(this.username.value, this.password.value);


      const user: User = new User(null, null,
      this.username.value, 
      this.password.value,
      null,
      null,
      null, 
      null);

        this._authService.authenticateUser(user).subscribe(
          res => {
            console.log('res data'+ res['token']);
          this.bearerToken = res['token'];
          this._authService.setBearerToken(this.bearerToken);
          console.log('this.username.value '+this.username.value);
          this._authService.setLoggedInUser(this.username.value);
          this.routerService.routeToDashboard();
          this.routerService.routeToNoteView();          
        },
        err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
    }

    newUserRegistration(){
      this.dialogRef = this.regDialog.open(RegistrationComponent, {
        width: '600px',
        height: '800px',
        data: ''
      });
      this.dialogRef.afterClosed().subscribe(result => {
      });
         
    }
}
