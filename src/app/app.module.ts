import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NotesService } from './services/notes.service';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

// ------- Material imports---------
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatOptionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { CategoryComponent } from './category-component/category-component.component';
import { FileNameDialogAddComponent } from './category-component/category-name-dialog-add.component';
import { FileNameDialogEditComponent } from './category-component/category-name-dialog-edit.component';
import { CategorySelectComponent } from './category-component/category-select.component';
import { ReminderSelectComponent } from './reminder-select/reminder-select-component.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgDatepickerModule } from 'ng2-datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MatChipsModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { ReminderService } from './services/reminder.service';
import { LabeNameDialogComponent } from './label-name-dialog/label-name-dialog-component.component';
import { MyDeleteDialogComponent } from './my-delete-dialog/my-delete-dialog.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './services/user.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { FilterPipe} from './search-toolbar/filter.pipe';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    NoteComponent,
    ListViewComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent,
	  CategoryComponent,
	  FileNameDialogAddComponent,
    FileNameDialogEditComponent,
    HomeComponent, 
    CategorySelectComponent,
    ReminderSelectComponent,
    LabeNameDialogComponent,
    MyDeleteDialogComponent,
    RegistrationComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
	  BrowserModule,
    FormsModule,
	  AngularDateTimePickerModule,
    NgDatepickerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    FlexLayoutModule,
    MatChipsModule,
    MatSidenavModule,
    MatDividerModule,
    MatGridListModule
  ],
  providers: [
    NotesService,
	CategoryService,
    AuthenticationService,
    RouterService,
    ReminderService,
    CanActivateRouteGuard,
  FormsModule,
  UserService
  ],
  bootstrap: [AppComponent],
  entryComponents : [EditNoteViewComponent, LabeNameDialogComponent, FileNameDialogEditComponent, HomeComponent, MyDeleteDialogComponent, RegistrationComponent, LoginComponent]
})
export class AppModule { }
