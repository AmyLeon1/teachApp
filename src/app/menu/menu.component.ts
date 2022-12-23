import { Component, OnInit } from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";
import {FileHandler} from "../file-handler";
import {DomSanitizer} from "@angular/platform-browser";

declare var window:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // user:User;
  user = new User();

  formModal:any;
  regFormModal:any;
  invalidLogin = false
  errorMessage="Invalid Credentials"
  msg = "";
  currentUserRole:User //currentUserRole to hold the role of logged-in user
  constructor(public hardcodedAuthenticationService: HardCodedAuthenticationService, public regService: RegistrationService, private router: Router,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  this.formModal = new window.bootstrap.Modal(
    document.getElementById("loginModal")!
  )
    this.regFormModal = new window.bootstrap.Modal(
      document.getElementById("registrationModal")!
    )
  }

  openModal(){
    this.formModal.show();
  }
  openRegistrationModal(){
    this.regFormModal.show();
  }


  hideModal(){
    this.formModal.hide();
    this.regFormModal.hide();
  }

  // ****     method to log out of the system     ****//
  // redirect to the homepage and call the logout method
  // from service to clear session storage of user's details
  logout(){
    this.router.navigate(['home']);
    this.hardcodedAuthenticationService.logout();
  }

  loginUser(){
    this.regService.loginUserFromRemote(this.user).subscribe(
      {
        next: data => {console.log("success");
          //let username = this.user.username;
          //TODO: not sure if this is working sessionStorage
          sessionStorage.setItem("authenticatedUser", this.user.email);
          sessionStorage.setItem("username", this.user.username);
          this.currentUserRole = data;
          //setting the role of current user into session storage
          sessionStorage.setItem('role', this.currentUserRole.role)
          this.router.navigate(["profile"]);
          this.formModal.hide();
          this.invalidLogin=false;},
        error:err => {
          console.log("error occured");
          this.invalidLogin =true;
          //this.errorMessage;
        }
      }
    )
  }

  getUsername(){
    sessionStorage.getItem("username")

  }

  gotoregistration(){
    this.router.navigate(["register"]);
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("authenticatedUser");
    return !(user == null)


  }



  // *** REGISTER USER ***
  registerUser(){
    this.regService.registerUserFromRemote(this.user)
      .subscribe({
          next: data => {
            this.router.navigate(['login']),
              this.regFormModal.hide(),
              this.msg="Registration successful"},

          error:err => {console.log("error occured"),
            this.msg=err.error}
        }
      );
  }

  onFileSelection(event:any){
    console.log(event);
    if(event.target.files){
      const file =event.target.files[0];
      const fileHandler: FileHandler={
        file: file,
        //create URL from the file
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
    }
  }


}
