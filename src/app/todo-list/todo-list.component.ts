import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";


//T0-DO class
export class Todo {
  constructor(
    public id: number,
    public email: string,
    public description: string,
    public targetDate: Date
  ) {
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  // object/variable declaration
  message: string
  email = this.service.getAuthenticatedUser();
  todos: Todo[]

  //dependency injection
  constructor(
    private todoService: TodoDataService,
    private router: Router, public service: RegistrationService) {
  }

  /* retrieve todos upon loading webpage */
  ngOnInit(): void {
    this.refreshTodos();
  }

  /* Method to retrieve list of todos*/
  refreshTodos() {
    this.todoService.retrieveAllTodos(this.email).subscribe(
      response => {
        //when response is received assign it to todos
        this.todos = response;
      }
    )
  }

  /* Method to delete a to-do*/
  deleteTodo(id: any) {
    this.todoService.deleteTodo(this.email, id).subscribe(
      response => {
        this.message = `Your todo was successfully deleted `
        //calling this method allows the list to update a
        //so we don't have to refresh page to see updates
        this.refreshTodos();
      }
    )
  }

  /* Method to update an existing to-do*/
  updateTodo(id: any) {
    //navigate to add-to-do page with selected to-do's id to allow for it to be updated
    this.router.navigate(["todo", id])
  }

  /* Method to create a new todo */
  addTodo() {
    //when id is -1 let's assume user is trying to add a brand new to-do
    this.router.navigate(['todo', -1])
  }

}


