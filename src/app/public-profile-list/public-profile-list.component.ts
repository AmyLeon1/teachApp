import { Component, OnInit } from '@angular/core';
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

  user=new User()
  users:User[]
  email:string

  constructor(  private todoService:TodoDataService,
                private router: Router, private service: RegistrationService) { }

  ngOnInit(): void {
    this.refreshUsers();
  }

  getUser(){
    this.service.retrieveUser(this.email).subscribe(
      response=>{
        //when response is received assign it to todos
        this.user=response;
      }
    )
  }



  refreshUsers(){
    this.service.retrieveAllUsers().subscribe(
      response=>{
        //when response is received assign it to todos
        this.users=response;
      }
    )
  }

  // refreshBlogs(){
  //   this.todoService.retrieveAllTodos(this.email).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       this.todos=response;
  //     }
  //   )
  // }

}
