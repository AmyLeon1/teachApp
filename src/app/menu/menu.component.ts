import { Component, OnInit } from '@angular/core';
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //isUserLoggedIn: boolean = false;
  constructor(public hardcodedAuthenticationService: HardCodedAuthenticationService) { }

  ngOnInit(): void {
    //this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn();
  }

}
