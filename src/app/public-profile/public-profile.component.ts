import {Component, OnInit} from '@angular/core';
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

  // variable & object declaration
  user: User | undefined;
  blog: Blog;
  blogs: Blog[]
  comment: Comment
  comments: Comment[]
  commentId: number
  id: number
  email = this.service.getAuthenticatedUser();
  body: string

  constructor(public service: RegistrationService, private route: ActivatedRoute, private blogService: BlogDataService, private router: Router) {
  }

  ngOnInit(): void {
    //get parameter that was passed in
    //then run the function getUser with the parameters that were received
    this.route.params.subscribe(params => this.getUser(params["email"]))
    this.route.params.subscribe(params => this.refreshBlogs(params["email"]))
  }

  /* Method to retrieve blog */
  getBlog(email: any, id: any) {
    this.blogService.retrieveBlog(email, id).subscribe(
      response => {
        //when response is received assign it to blog
        this.blog = response;
      }
    )
  }

  /* Method to retrieve user object by supplying email */
  getUser(email: any) {
    this.service.retrieveUser(email).subscribe(
      response => {
        //when response is received assign it to user
        this.user = response;
      }
    )
  }

  /* Method to retrieve blogs for a particular user */
  refreshBlogs(email: any) {
    this.blogService.retrieveAllBlogs(email).subscribe(
      response => {
        //when response is received assign it to todos
        this.blogs = response;
      }
    )
  }

}


