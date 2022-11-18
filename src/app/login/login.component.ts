import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {BasicAuthenticationService} from "../service/basic-authentication.service";
import {NgForm} from '@angular/forms';
import {RegistrationService} from "../service/registration.service";
import {User} from "../user";
@Component({

  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //default username
  //username = ""
  password : string = "dummy"
  errorMessage="Invalid Credentials"
  invalidLogin = false

  //create user object
  user = new User();


  //create instance of the router as we want to use it to redirect to profile page
  //dependency injection
  //declare it as constructor argument
  constructor(private router: Router, private hardcodedAuthenticationService: HardCodedAuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService, private service: RegistrationService
  ) {
  }

  ngOnInit(): void {
  }


  //
  // handleJWTAuthLogin(){
  //   this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
  //     .subscribe({
  //       next: data=>{
  //         console.log(data)
  //         this.router.navigate(['profile', this.username])
  //         this.invalidLogin = false
  //
  //       },
  //       error: err => {
  //
  //         console.log(err)
  //         this.invalidLogin = true
  //
  //       }
  //       } //observer bracket
  //     )
  //
  // }

  // handleLogin(){
  //   //console.log(this.username)
  //   //if(this.username==="AmyLeon" && this.password ==="dummy"){
  //    if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
  //     //redirect to the account page using.navigate
  //     //enter page you wish to navigate to
  //     //pass in username as a parameter
  //     //routing parameter
  //     this.router.navigate(["profile"]);
  //     this.invalidLogin = false
  //   }else{
  //     this.invalidLogin =true
  //   }
  // }


  // handleBasicAuthLogin(){
  //   //use subscribe as it is an observable
  //   //define success and unsuccessful scenario
  //   this.basicAuthenticationService.executeAuthenticationService(this.username,this.password)
  //     .subscribe({
  //       next: data => {this.router.navigate(['profile', this.username]),
  //         this.invalidLogin = false},
  //       error:err => {console.log,
  //         this.invalidLogin = true}
  //       }
  //     );
  // }




  //call service method
  //must inject service in constructor - dependency
  loginUser(){
    this.service.loginUserFromRemote(this.user).subscribe(
      {
        next: data => {console.log("success");
          //let username = this.user.username;
          //TODO: not sure if this is working sessionStorage
          sessionStorage.setItem("authenticatedUser", this.user.email);
          sessionStorage.setItem("username", this.user.username);
          this.router.navigate(["profile"]);
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




}




