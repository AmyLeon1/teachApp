import { Component, OnInit } from '@angular/core';
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message = "Welcome to your account"
  welcomeMessageFromService:string = ""
  name: string = ''

  constructor(private service: WelcomeDataService) {

  }

  ngOnInit(): void {
  }

  getWelcomeMessage() {

    this.service.executeHelloWorldBeanService().subscribe(
      {
        next: response =>this.handleSuccessfulResponse(response),
        error: error => this.handleErrorResponse(error)
      });

    // this.service.executeHelloWorldBeanService().subscribe(
    //   //arrow function
    //   response => this.handleSuccessfulResponse(response),
    //   error=>this.handleErrorResponse(error)
    // );
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error:any){
    this.welcomeMessageFromService = error.message;
  }

  // handleErrorResponse(error: { error: { message: string; }; })
  // {
  //   this.welcomeMessageFromService = error.error.message;
  // }

}
