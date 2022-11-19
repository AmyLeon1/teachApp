import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo-list/todo-list.component";
import {Blog} from "../blog-list/blog-list.component";
import {TodoDataService} from "../service/data/todo-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  id:number
  title:string
  description:string
  blog:Blog
  email = this.service.getAuthenticatedUser()

  constructor(

    private blogService: BlogDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: HardCodedAuthenticationService,
    private service: RegistrationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.blog = new Blog(this.id, this.email, '', '');

    //when it's a new to do, do not need to call retrieve to do service
    if(this.id!=-1) {
      //let email= this.service.getAuthenticatedUser()
      this.blogService.retrieveBlog(this.email, this.id)
        .subscribe(
          data => this.blog = data
        )
    }
  }


  saveBlog() {
    if (this.id === -1) {
      //create new t do

      // let email= this.service.getAuthenticatedUser();
      this.blogService.createBlog(this.email, this.blog)
        .subscribe(
          data => {
            this.router.navigate(["blogList"]);
          }
        )
    }
    else {
      //call blogsevice
      this.blogService.updateBlog(this.email, this.id, this.blog)
        //subscribe to make the call
        //returns content of updated blog
        .subscribe(
          data => {
            this.router.navigate(["blogList"]);
          }
        )
    }
  }







}
