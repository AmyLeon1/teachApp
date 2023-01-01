import { Component, OnInit } from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Todo} from "../todo-list/todo-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {RegistrationService} from "../service/registration.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo:Todo
  username = ""
  email = this.service.getAuthenticatedUser()

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: HardCodedAuthenticationService,
    private service: RegistrationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.todo = new Todo(this.id, this.email, '', new Date());

    //when it's a new to do, do not need to call retrieve to do service
    if(this.id!=-1) {
      //let email= this.service.getAuthenticatedUser()
      this.todoService.retrieveTodo(this.email, this.id)
        .subscribe(
          data => this.todo = data
        )
    }
  }

  saveTodo() {

    if (this.id === -1) {
      //create new t do

     // let email= this.service.getAuthenticatedUser();
      this.todoService.createTodo(this.email, this.todo)
        .subscribe(
          data => {
            this.router.navigate(["todoList"]);
          }
        )
    }
    else {
      //call todo data service
      this.todoService.updateTodo(this.email, this.id, this.todo)
        //subscribe to make the call
        //returns content of updated todo
        .subscribe(
          data => {
            this.router.navigate(["todoList"]);
          }
        )
    }
  }

}
