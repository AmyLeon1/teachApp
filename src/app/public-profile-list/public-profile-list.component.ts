import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {User} from "../user";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile-list.component.html',
  styleUrls: ['./public-profile-list.component.css']
})
export class PublicProfileListComponent implements OnInit {

  user = new User()
  users: User[]
  email: string
  searchText: string = '' //holds value user enters in search box
  chosenEmail: string

  constructor(private todoService: TodoDataService,
              private router: Router, private service: RegistrationService) {
  }

  ngOnInit(): void {
    /* this method will execute upon loading of the page */
    this.refreshUsers();
  }

  // **** Method to redirect to desired users profile ****//
  goToPage(userEmail: any) {
    this.router.navigate(['publicProfileList/userProfile', userEmail])
  }

  /* Method to retrive all users*/
  refreshUsers() {
    this.service.retrieveAllUsers().subscribe(
      response => {
        //assign users with response data
        this.users = response;
      }
    )
  }

  /* Method called when custom event is raised - search */

  // parameter is received from what custom event emits
  onSearchTextEntered(searchValue: string) {
    //set search text to the value that the custom event has emitted
    this.searchText = searchValue;
  }

}
