import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";

@Component({

  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //default username
  username = "AmyLeon"
  password : string = ""
  errorMessage="Invalid Credentials"
  invalidLogin = false

  //create instance of the router as we want to use it to redirect to profile page
  //dependency injection
  //declare it as constructor argument
  constructor(private router: Router, private hardcodedAuthenticationService: HardCodedAuthenticationService) {
  }

  ngOnInit(): void {
  }

  handleLogin(){
    //console.log(this.username)
    //if(this.username==="AmyLeon" && this.password ==="dummy"){
     if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      //redirect to the account page using.navigate
      //enter page you wish to navigate to
      //pass in username as a parameter
      //routing parameter
      this.router.navigate(["profile"]);
      this.invalidLogin = false
    }else{
      this.invalidLogin =true
    }
  }


}
