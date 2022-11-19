import { Component, OnInit } from '@angular/core';
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";

//class for to dos
export class Todo{
  constructor(
    public id: number,
    public email:string,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }

}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {


  message: string
  email = this.service.getAuthenticatedUser();

  todos: Todo[]
    //create list of objects
    // todos = [
    //
    //   new Todo(1, "Learn to Dance", false, new Date()),
    //   new Todo(2, "Walk dog", false, new Date()),
    //   new Todo(3, "Do laundry", false, new Date()),
    //
    // ]

  //create list of objects
  // todos = [
  //
  //   new Todo(1, "Learn to Dance", false, new Date()),
  //   new Todo(2, "Walk dog", false, new Date()),
  //   new Todo(3, "Do laundry", false, new Date()),
  //
  // ]

  //dependency injection
  constructor(
    private todoService:TodoDataService,
    private router: Router, private service: RegistrationService) { }

  //initialise todos
  ngOnInit(): void {
   this.refreshTodos();
  }


  refreshTodos(){
    this.todoService.retrieveAllTodos(this.email).subscribe(
      response=>{
        //when response is received assign it to todos
        this.todos=response;
      }
    )
  }



  deleteTodo(id:any){
    this.todoService.deleteTodo(this.email, id).subscribe(
      response=>{
        this.message =`Delete of Todo ${id}  Successful!`
        //calling this method allows the list to update a
        //so we don't have to refresh page to see updates
        this.refreshTodos();

      }
    )

  }

  updateTodo(id:any){
    console.log(id);
    this.router.navigate(["todo", id])
  }

  addTodo(){
    //when id is -1 let's assume user is trying to add
    this.router.navigate(['todo',-1])
  }

}
