import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../post";
import {API_URL} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //user = new User();

  //post = new Post();

  constructor(private http: HttpClient) {

  }


  // public addPost(post :Post):Observable<any> {
  //   return this.http.post<any>("http://localhost:8080/addPost", post);
  //
  // }
  //
  // //retrieve all posts
  // retrieveAllPosts(username: string){
  //   //use ticks and not commas for url
  //   //ticks did not work ,commas used
  //   return this.http.get<Tod[]>("http://localhost:8080/users/%7Busername%7D/todos")

  // }



  retrieveAllPosts(email: string){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Post[]>(`http://localhost:8080/users/${email}/posts`)

  }

  deletePost(email:any, id:any){
    return this.http.delete(`${API_URL}/users/${email}/posts/${id}`)
  }

  //<TODO> in generics as we have to declare the type of data we want
  retrievePost(email:any, id:any){
    return this.http.get<Post>(`${API_URL}/users/${email}/posts/${id}`)
  }

  //pass in todo as we need to pass in new details to the database
  updatePost(email:string, id:any, post: Post){
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/users/${email}/posts/${id}`,post);
  }

  createPost(email:string, post: Post){
    //pass todo into the body of the request
    return this.http.post(`${API_URL}/users/${email}/posts`,post);
  }



}
