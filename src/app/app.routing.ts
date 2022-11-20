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
//import {AddPostComponent} from "./add-post/add-post.component";
import {PostComponent} from "./post/post.component";
import {PostListComponent} from "./post-list/post-list.component";
import {TestComponent} from "./test/test.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogComponent} from "./blog/blog.component";
import {PublicProfileListComponent} from "./public-profile-list/public-profile-list.component";
import {SearchComponent} from "./search/search.component";
import {PublicProfileComponent} from "./public-profile/public-profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'account/:name', component: AccountComponent, canActivate:[RouteGuardService]},
  {path: 'todoList', component: TodoListComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate:[RouteGuardService]},
  {path: 'todo/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  {path: 'add-post', component: AddPostComponent},
  {path: 'post', component: PostComponent, canActivate:[RouteGuardService]},
  {path: 'postList', component: PostListComponent},
  {path: 'test', component: TestComponent},
  {path: 'blogList', component: BlogListComponent, canActivate:[RouteGuardService]},
  {path: 'blog/:id', component: BlogComponent, canActivate:[RouteGuardService]},
  {path: 'publicProfileList', component: PublicProfileListComponent},
  {path: 'publicProfileList/userProfile/:email', component: PublicProfileComponent},
  {path: 'search', component: SearchComponent},

  //make sure this path is always last
  // otherwise redirect to home
  { path: '**', component: ErrorComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
