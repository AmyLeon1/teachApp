import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";
import {Router} from "@angular/router";
import {FileHandler} from "../file-handler";
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(private service: RegistrationService, private router:Router, private sanitizer:DomSanitizer){

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
