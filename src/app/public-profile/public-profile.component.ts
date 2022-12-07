import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {User} from "../user";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDataService} from "../service/data/blog-data-service";
import {Blog} from "../blog-list/blog-list.component";
import {Comment} from "../blog-list/blog-list.component";


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(public service: RegistrationService, private route:ActivatedRoute,private blogService:BlogDataService, private router: Router ) { }

  user: User | undefined;

  blog:Blog;

  //blogId:Blog;
  blogs: Blog[]
  comment:Comment
  comments: Comment[]
  commentId:number
  id:number


  //email = sessionStorage.getItem("token")

  email = this.service.getAuthenticatedUser();
  //email:string
  body:string



  ngOnInit(): void {
    //get parameter that was passed in
    //then run the function getUser with the parameters that were received
    this.route.params.subscribe(params => this.getUser(params["email"]))
    this.route.params.subscribe(params => this.refreshBlogs(params["email"]))



  }



  // this component has a user and will start off as undefined
  // have to wait for API to load it
  // user: User | undefined;
  // blog:Blog;
  // blogs: Blog[]
  // comment:Comment
  // comments: Comment[]
  // id:number
  // blogId:number
  // email = sessionStorage.getItem("token")
  // body:string


  //commentId: number, blog:Blog
  saveComment() {

    //TODO: Figure out how to remove hardcoding!!!

    this.commentId=-1;

    if (this.commentId === -1) {
      //create new t do

      //passing in email, blogID, and the comment
      this.blogService.createComment(this.id, this.comment)
        .subscribe(
          data => {
            console.log(data)
           // this.router.navigate(["blogList"]);
          }
        )
    }
    else {
      //call blogsevice
      this.blogService.updateComment( this.id, this.commentId, this.comment)
        //subscribe to make the call
        //returns content of updated blog
        .subscribe(
          data => {
            console.log(data);
            //this.router.navigate(["blogList"]);
          }
        )
    }
  }

  // showBlogId(){
  //   console.log(this.blog.id)
  // }

  // getBlogId(){
  //   let b = this.blog.id
  //   console.log(b)
  // }


  // getBlogId(blog:any){
  // this.blogId = this.blog.id;
  //
  // }

  //
  // getBlogId(email:any, id:any){
  //   this.blogService.retrieveBlog(email, id).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       // this.blog=response;
  //       this.blogId = response.id;
  //
  //     }
  //   )
  // }

  gotoPage() {
    this.router.navigate(['comment', this.blog.id]);
  }



  getBlog(email:any, id:any){
    this.blogService.retrieveBlog(email, id).subscribe(
      response=>{
        //when response is received assign it to todos
        this.blog=response;
        //this.blogId = response.id;
      }
    )
  }






  getUser(email:any){
    this.service.retrieveUser(email).subscribe(
      response=>{
        //when response is received assign it to todos
        this.user=response;
      }
    )
  }


  refreshBlogs(email:any){
    this.blogService.retrieveAllBlogs(email).subscribe(
      response=>{
        //when response is received assign it to todos
        this.blogs=response;
      }
    )
  }


  addComment(){
    //when id is -1 let's assume user is trying to add
    this.router.navigate(['addComment', -1])
  }



}


