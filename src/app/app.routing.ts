import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {ErrorComponent} from "./error/error.component";
import {AccountComponent} from "./account/account.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {LogoutComponent} from "./logout/logout.component";
import {RouteGuardService} from "./service/route-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {TodoComponent} from "./todo/todo.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent },
  {path: 'account/:name', component: AccountComponent, canActivate:[RouteGuardService]},
  {path: 'todoList', component: TodoListComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[RouteGuardService]},
  {path: 'todo/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  //make sure this path is always last
  // otherwise redirect to home
  { path: '**', component: ErrorComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
