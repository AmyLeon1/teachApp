import { Injectable } from '@angular/core';
import {HelloWorldBean} from "./welcome-data.service";
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../todo-list/todo-list.component";
import {API_URL} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  //add http as constructor argument
  constructor(private http:HttpClient) { }

  //create method to retrieve list of todos

  //similar to generics in Java - pass in HelloWorldBean as that is what we are expecting back
  //
  retrieveAllTodos(email: string){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Todo[]>(`http://localhost:8080/users/${email}/todos`)

  }

  deleteTodo(email:any, id:any){
    return this.http.delete(`${API_URL}/users/${email}/todos/${id}`)
  }

  //<TODO> in generics as we have to declare the type of data we want
  retrieveTodo(email:any, id:any){
    return this.http.get<Todo>(`${API_URL}/users/${email}/todos/${id}`)
  }

  //pass in todo as we need to pass in new details to the database
  updateTodo(email:string, id:any, todo: Todo){
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/users/${email}/todos/${id}`,todo);
  }

  createTodo(email:string, todo: Todo){
    //pass todo into the body of the request
    return this.http.post(`${API_URL}/users/${email}/todos`,todo);
  }


}
