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
import { AccountComponent } from './account/account.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { ProfileComponent } from './profile/profile.component';
import { TodoComponent } from './todo/todo.component';
import { AddPostComponent } from './add-post/add-post.component';
import {HttpIntercepterBasicAuthService} from "./service/http/http-intercepter-basic-auth.service";
import {HttpClientInterceptor} from "./http-client-interceptor";
import {NgxWebstorageModule} from 'ngx-webstorage';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { TestComponent } from './test/test.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';
import { PublicProfileListComponent } from './public-profile-list/public-profile-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
} from '@angular/material';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import { BookingManagerComponent } from './booking-manager/booking-manager.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AppointmentBookingTimesComponent } from './appointment-booking-times/appointment-booking-times.component';
import { AppointmentBookingDateConfirmComponent } from './appointment-booking-date-confirm/appointment-booking-date-confirm.component';
import { AppointmentBookingTimeComponent } from './appointment-booking-time/appointment-booking-time.component';



// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    AccountComponent,
    TodoListComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    ProfileComponent,
    TodoComponent,
    AddPostComponent,
    PostComponent,
    PostListComponent,
    TestComponent,
    BlogListComponent,
    BlogComponent,
    PublicProfileListComponent,
    SearchComponent,
    PublicProfileComponent,
    AddCommentComponent,
    AppointmentBookingComponent,
    BookingManagerComponent,
    ScheduleComponent,
    AppointmentBookingTimesComponent,
    AppointmentBookingDateConfirmComponent,
    AppointmentBookingTimeComponent,


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
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi:true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
