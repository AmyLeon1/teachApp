import { Injectable } from '@angular/core';
import {User} from "../user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AUTHENTICATED_USER} from "./basic-authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user = new User();

  //dependecy injection
  //allows us to make http calls
  constructor(private http: HttpClient) { }

  //method
  //retruns observable
  public loginUserFromRemote(user: User):Observable<any>{

    //can call rest endpoints via http
    sessionStorage.setItem('token', user.email);
    return this.http.post<any>("http://localhost:8080/login", user);


    }

    //added as string to avoid error in component.ts class
  getAuthenticatedUser(){
    return sessionStorage.getItem('token') as string
  }



  public registerUserFromRemote(user :User):Observable<any> {
    return this.http.post<any>("http://localhost:8080/registerUser", user);

  }


  }



