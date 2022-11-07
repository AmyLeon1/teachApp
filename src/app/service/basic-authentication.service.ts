import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HelloWorldBean} from "./data/welcome-data.service";

//@injectable makes it a service
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username:string, password:string){
    //console.log("before " + this.isUserLoggedIn())
    if(username==="AmyLeon" && password ==="dummy"){
      //sending details to session storage if login is successful
      sessionStorage.setItem('authenticatedUser', username);
      //console.log("after " + this.isUserLoggedIn())
      return true;
    }
    return false;

  }

  executeAuthenticationService(username:string ,password:string){

    //btoa encoding
    let basicAuthHeaderString = "Basic" + window.btoa(username + ":" + password);

    //create instance of HttpHeaders and pass in the object with Authorization
    //value populated
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`,
      {headers })
  }




  //method to check if user is logged in
  isUserLoggedIn(){
   let user = sessionStorage.getItem("authenticatedUser")
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.clear();
  }


  export class AuthenticationBean{

    constructor(public message:string) {

    }
}


}


