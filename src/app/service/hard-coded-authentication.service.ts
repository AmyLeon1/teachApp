import { Injectable } from '@angular/core';
import {User} from "../user";

//@injectable makes it a service
@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  user = new User()
  constructor() { }

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

  authenticate2(username:string, password:string){
    //console.log("before " + this.isUserLoggedIn())
    if(username==="AmyLeon" && password ==="dummy"){
      //sending details to session storage if login is successful
      sessionStorage.setItem('authenticatedUser', username);
      //console.log("after " + this.isUserLoggedIn())
      return true;
    }
    return false;

  }



  //method to check if user is logged in
  isUserLoggedIn(){
   let user = sessionStorage.getItem("authenticatedUser")
    return !(user === null);
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem("authenticatedUser");
  }

  getAuthUsername(){
    return sessionStorage.getItem("username");
  }

  logout(){
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.clear();
  }
}
