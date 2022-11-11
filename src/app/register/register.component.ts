import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  errorMessage="Invalid Credentials";
  msg = "";
  invalidLogin=false;

  constructor(private service: RegistrationService, private router:Router){

  }


  ngOnInit(): void {
  }

  // *** REGISTER USER ***
  registerUser(){
    this.service.registerUserFromRemote(this.user)
      .subscribe({
          next: data => {
            this.router.navigate(['login']),
            this.msg="Registration successful"},

          error:err => {console.log("error occured"),
            this.msg=err.error}
        }
      );
  }


}
