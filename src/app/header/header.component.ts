import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  loggedInUser: any;
  constructor(private routerService: RouterService,
    private authenticationService: AuthenticationService) {
      this.loggedInUser = authenticationService.getLoggedInUser().toUpperCase();
      console.log('loggedInUser '+this.loggedInUser);
  }

  switchToNoteView() {
    this.routerService.routeToNoteView();
    this.isNoteView = true;
  }

  switchToListView() {
    this.routerService.routeToListView();
    this.isNoteView = false;
  }
  
  logout(){
    this.routerService.routeToLogin();
    window.location.reload();
  }
}
