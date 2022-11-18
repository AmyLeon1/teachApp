import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelloWorldBean} from "./data/welcome-data.service";
import {map} from "rxjs";
import {API_URL} from "../constants";

//constant variables
export const TOKEN="token";
export const AUTHENTICATED_USER = "authenticatedUser";

//@injectable makes it a service
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }






  //**JWT AUTH


  executeJWTAuthenticationService(username:string, password:string) {

    return this.http.post<any>(
      `${API_URL}/authenticate`,{
        username,
        password
      }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
    //console.log("Execute Hello World Bean Service")
  }




  executeAuthenticationService(username:string ,password:string){

    //**Important - method logic**
    //basic auth string
    //set it as header
    //pass it into th http call

    let basicAuthHeaderString = "Basic " + window.btoa(username + ":" + password);

    //create instance of HttpHeaders and pass in the object with Authorization
    //value populated
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>
    ("http://localhost:8080/basicauth" ,
      //if this is successful do this as well .pipe()
      {headers}).pipe(
        map(
          data=>{
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
    ); //not sure if comma is needed
  }


  getAuthenticatedToken(){
    //if it's valid return the token
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }


  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  //method to check if user is logged in
  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.clear();
  }


}
//be careful not to create classes within class,
//error with this class was occuring because of this!
export class AuthenticationBean {
  constructor(public message:string){
  }
}

