import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  message = "Welcome to your account"
  welcomeMessageFromService:string = ""
  name: string = ''

  //Activated Route
  constructor(private route: ActivatedRoute,
    private service: WelcomeDataService) {

  }

  ngOnInit(): void {
    //console.log(this.message)
    //console.log(this.route.snapshot.params['name'])
    //assign the value to name variable
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe(
      //arrow function
      response => this.handleSuccessfulResponse(response)
    );
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message;
  }
}
