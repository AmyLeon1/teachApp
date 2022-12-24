import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './error/error.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { ProfileComponent } from './profile/profile.component';
import { TodoComponent } from './todo/todo.component';
import {HttpIntercepterBasicAuthService} from "./service/http/http-intercepter-basic-auth.service";
import {HttpClientInterceptor} from "./http-client-interceptor";
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { PublicProfileListComponent } from './public-profile-list/public-profile-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSaverModule } from 'ngx-filesaver';
// import {
//   MatTableModule,
//   MatProgressSpinnerModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatButtonModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
//   MatToolbarModule,
// } from '@angular/material';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import { BookingManagerComponent } from './booking-manager/booking-manager.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatDialogModule} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import { HomeworkUploadComponent } from './homework-upload/homework-upload.component';
import { AddCommentTeacherComponent } from './add-comment-teacher/add-comment-teacher.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    TodoListComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    ProfileComponent,
    TodoComponent,
    BlogListComponent,
    BlogComponent,
    PublicProfileListComponent,
    SearchComponent,
    PublicProfileComponent,
    AddCommentComponent,
    AppointmentBookingComponent,
    BookingManagerComponent,
    ScheduleComponent,
    HomeworkUploadComponent,
    AddCommentTeacherComponent,


  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule,
    NgxWebstorageModule.forRoot(),
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    FileSaverModule


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi:true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
