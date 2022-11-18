import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {Observable} from "rxjs";
import {Post} from "../post";
import {Todo} from "../todo-list/todo-list.component";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //user = new User();

  post = new Post();

  constructor(private http: HttpClient,
              ) {

  }


  public addPost(post :Post):Observable<any> {
    return this.http.post<any>("http://localhost:8080/addPost", post);

  }

  //retrieve all posts
  retrieveAllPosts(username: string){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Todo[]>("http://localhost:8080/users/%7Busername%7D/todos")

  }



}
