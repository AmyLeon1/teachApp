import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {ErrorComponent} from "./error/error.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {LogoutComponent} from "./logout/logout.component";
import {RouteGuardService} from "./service/route-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {TodoComponent} from "./todo/todo.component";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogComponent} from "./blog/blog.component";
import {PublicProfileListComponent} from "./public-profile-list/public-profile-list.component";
import {SearchComponent} from "./search/search.component";
import {PublicProfileComponent} from "./public-profile/public-profile.component";
import {AddCommentComponent} from "./add-comment/add-comment.component";
import {AppointmentBookingComponent} from "./appointment-booking/appointment-booking.component";
import {BookingManagerComponent} from "./booking-manager/booking-manager.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {HomeworkUploadComponent} from "./homework-upload/homework-upload.component";
import {AddCommentTeacherComponent} from "./add-comment-teacher/add-comment-teacher.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'todoList', component: TodoListComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[RouteGuardService]},
  {path: 'todo/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  {path: 'blogList', component: BlogListComponent, canActivate:[RouteGuardService]},
  {path: 'blog/:id', component: BlogComponent, canActivate:[RouteGuardService]},
  {path: 'publicProfileList', component: PublicProfileListComponent},
  {path: 'publicProfileList/userProfile/:email', component: PublicProfileComponent},
  {path: 'publicProfileList/userProfile/:email/comment/:id', component: AddCommentComponent},
  {path: 'blogList/comment-teacher/:id', component: AddCommentTeacherComponent},
  {path: 'publicProfileList/userProfile/:email/bookAppointment', component: AppointmentBookingComponent},
  {path: 'manageBooking', component: BookingManagerComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'search', component: SearchComponent},
  {path: 'homework', component: HomeworkUploadComponent},
  // otherwise redirect to home
  { path: '**', component: ErrorComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
