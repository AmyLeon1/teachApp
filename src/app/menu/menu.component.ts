import { Component, OnInit } from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user:User

  //isUserLoggedIn: boolean = false;
  constructor(public hardcodedAuthenticationService: HardCodedAuthenticationService, public regService: RegistrationService) { }

  ngOnInit(): void {
    //this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn();
  }

}
