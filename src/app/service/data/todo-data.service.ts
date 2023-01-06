import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../todo-list/todo-list.component";
import {API_URL} from "../../constants";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  retrieveAllTodos(email: string){
    return this.http.get<Todo[]>(`http://localhost:8080/users/${email}/todos`)
  }

  deleteTodo(email:any, id:any){
    return this.http.delete(`${API_URL}/users/${email}/todos/${id}`)
  }

  retrieveTodo(email:any, id:any){
    return this.http.get<Todo>(`${API_URL}/users/${email}/todos/${id}`)
  }

  updateTodo(email:string, id:any, todo: Todo){
    //pass to-do into the body of the request
    return this.http.put(`${API_URL}/users/${email}/todos/${id}`,todo);
  }

  createTodo(email:string, todo: Todo){
    //pass to-do into the body of the request
    return this.http.post(`${API_URL}/users/${email}/todos`,todo);
  }

}
