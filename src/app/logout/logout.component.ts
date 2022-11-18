import { Component, OnInit } from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isUserLoggedin: boolean = false;
  //to use logout service we must inject it in the constructor
  constructor(private hardcodedAuthenticationService: HardCodedAuthenticationService) { }

  ngOnInit() {
    //call logout method
    this.hardcodedAuthenticationService.logout();

  }

}
