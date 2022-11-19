import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo-list/todo-list.component";
import {Post} from "../post";
import {TodoDataService} from "../service/data/todo-data.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {PostService} from "../service/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    ngOnInit(): void {

    }



  // message: string
  // email = this.service.getAuthenticatedUser();
  //
  // posts: Post[]
  //
  //
  //
   constructor( private postService: PostService,
                private router: Router, private service: RegistrationService) { }
  //
  // ngOnInit(): void {
  //   this.refreshPosts();
  // }
  //
  //
  // refreshPosts(){
  //   this.postService.retrieveAllPosts(this.email).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       this.posts=response;
  //     }
  //   )
  // }
  //
  // deletePost(id:any){
  //   this.postService.deletePost(this.email, id).subscribe(
  //     response=>{
  //       this.message =`Delete of Post ${id}  Successful!`
  //       //calling this method allows the list to update a
  //       //so we don't have to refresh page to see updates
  //       this.refreshPosts();
  //
  //     }
  //   )
  //
  // }
  //
  // updatePost(id:any){
  //   console.log(id);
  //   this.router.navigate(["post", id])
  // }
  //
  //
  // addPost(){
  //   //when id is -1 let's assume user is trying to add
  //   this.router.navigate(['post',-1])
  // }
  //
  //
  //
  //
  //
  //

}
