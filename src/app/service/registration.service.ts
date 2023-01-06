import {Injectable} from '@angular/core';
import {User} from "../user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = new User();

  //allows for http calls
  constructor(private http: HttpClient) {
  }

  /**** Method to login user ****/
  public loginUserFromRemote(user: User): Observable<any> {
    //set user email into session storage
    sessionStorage.setItem('token', user.email);
    //send user object via post request to be authenticated
    return this.http.post<any>("http://localhost:8080/login", user);
  }

  /* method to check if user is logged in */
  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser")
    return !(user === null);
  }

  // ** METHOD TO CHECK USER ROLE**
  //retrieve value of role from session storage
  //want to check if user is a teacher - do not return if role is student
  isUserTeacher() {
    let role = sessionStorage.getItem("role")
    return !(role === "student");
  }

  /* method to check user's role to see if they are student */
  isUserStudent() {
    let role = sessionStorage.getItem("role")
    return !(role === "teacher");
  }

  /* method to retreive token from session storage*/
  getAuthenticatedUser() {
    return sessionStorage.getItem('token') as string
  }

  /* method to register a user */
  public registerUserFromRemote(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:8080/registerUser", user);
  }

  /* method to retrieve a user by email */
  retrieveUser(email: any) {
    return this.http.get<User>(`${API_URL}/users/${email}`)
  }

  /* method to retrieve all registered users */
  retrieveAllUsers() {
    return this.http.get<User[]>(`http://localhost:8080/users`)
  }


}



