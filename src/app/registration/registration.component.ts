import { Component, OnInit, Inject } from '@angular/core';
import { Register } from '../register';
import { FormControl , Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  /*username = new FormControl('', [Validators.required]);
  
  password = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);*/

  registerForm: FormGroup;
    submitted = false;

  
  public bearerToken: any;
  public submitMessage: string;

  constructor(private dialogRef: MatDialogRef<RegistrationComponent>, 
    private dialogDelete: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private routerService: RouterService,
    private userService: UserService,
    private formBuilder: FormBuilder  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.minLength(10)]]
    });
} 

get f() { return this.registerForm.controls; }
 

  newUserRegistration() {
      const user: User = new User(this.registerForm.get('firstName').value,
      this.registerForm.get('lastName').value,
      this.registerForm.get('userName').value, 
      this.registerForm.get('password').value,
      'admin',
      new Date(),
       this.registerForm.get('email').value, 
      this.registerForm.get('mobile').value);

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

		this.userService.addSQLUser(user).subscribe(
          res => {
            this.dialogRef.close();
          this.routerService.routeToLogin();
        },
        err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });

     /*   this.userService.addMongoUser(user).subscribe(
          res => {       
          this.routerService.routeToLogin();
        },
        err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
        */
        alert('SUCCESS!! :-)\n\n' + this.registerForm.get('firstName').value);


       
    }
}
