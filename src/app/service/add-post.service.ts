import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "../post-payload";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  //inject http client object
  //used to perform http calls to back end
  constructor(private http: HttpClient) {

  }

  //method takes postPayload as a parameter
  addPost(postPayload: PostPayload){
    //pass post payload object with the request
    //return observable
    return this.http.post('http://localhost:8080/api/posts/postPost', postPayload);

  }
}
