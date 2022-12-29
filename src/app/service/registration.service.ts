import {Injectable} from '@angular/core';
import {User} from "../user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AUTHENTICATED_USER} from "./basic-authentication.service";
import {Blog} from "../blog-list/blog-list.component";
import {API_URL} from "../constants";
import {Post} from "../post";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = new User();
  //public currentUser:string;

  //dependency injection
  //allows us to make http calls
  constructor(private http: HttpClient) {
  }

  /**** Method to login user ****/
  public loginUserFromRemote(user: User): Observable<any> {
    //set user email into session storage
    sessionStorage.setItem('token', user.email);
    //send user object via post request to be authenticated
    return this.http.post<any>("http://localhost:8080/login", user);
  }

  // ** METHOD TO CHECK USER ROLE**
  //retrieve value of role from session storage
  //want to check if user is a teacher - do not return if role is student
  isUserTeacher() {
    let role = sessionStorage.getItem("role")
    return !(role === "student");
  }

  //added as string to avoid error in component.ts class
  getAuthenticatedUser() {
    return sessionStorage.getItem('token') as string
  }


  public registerUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:8080/registerUser", user);

  }


  retrieveUser(email: any) {
    return this.http.get<User>(`${API_URL}/users/${email}`)
  }


  retrieveAllUsers() {
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<User[]>(`http://localhost:8080/users`)

  }


}



