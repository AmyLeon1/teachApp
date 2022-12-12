import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";
import {Todo} from "../todo-list/todo-list.component";



export class Comment{
  constructor(
    public commentId: number,
    public body:string,
    public owner:string
  ){}
}


export class Blog{
  constructor(
    public id: number,
    public email:string,
    public title: string,
    public description: string,
  ){}
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  message: string
  email = this.regService.getAuthenticatedUser();
  blogs: Blog[]

  constructor( private router: Router, public regService: RegistrationService, private blogService: BlogDataService) { }

  ngOnInit(): void {
    this.refreshBlogs();
  }

  refreshBlogs(){
    this.blogService.retrieveAllBlogs(this.email).subscribe(
      response=>{
        //when response is received assign it to todos
        this.blogs=response;
      }
    )
  }

  deleteBlog(id:any){
    this.blogService.deleteBlog(this.email, id).subscribe(
      response=>{
        this.message =`Delete of Todo ${id}  Successful!`
        //calling this method allows the list to update a
        //so we don't have to refresh page to see updates
        this.refreshBlogs();

      }
    )

  }

  updateBlog(id:any){
    console.log(id);
    this.router.navigate(['blog', id])
  }

  addBlog(){
    //when id is -1 let's assume user is trying to add
    this.router.navigate(['blog', -1])
  }






}
