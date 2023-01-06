import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";

/* Comment Class */
export class Comment {
  constructor(
    public commentId: number,
    public body: string,
    public owner: string,
    public date: string
  ) {
  }
}

/* Blog Class */
export class Blog {
  constructor(
    public id: number,
    public email: string,
    public title: string,
    public description: string,
  ) {
  }
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {

  // varibale/object declaration
  message: string
  email = this.regService.getAuthenticatedUser();
  blogs: Blog[]

  constructor(private router: Router, public regService: RegistrationService, private blogService: BlogDataService) {
  }

  ngOnInit(): void {
    //upon loading of webpage list of blogs will be displayed
    this.refreshBlogs();
  }

  /* Method to retrieve all blogs*/
  refreshBlogs() {
    this.blogService.retrieveAllBlogs(this.email).subscribe(
      response => {
        //when response is received assign it to blogs
        this.blogs = response;
      }
    )
  }

  // *** Method to delete a blog *** //
  deleteBlog(id: any) {
    this.blogService.deleteBlog(this.email, id).subscribe(
      response => {
        this.message = `Delete of Todo ${id}  Successful!`
        //calling this method allows the list to update
        this.refreshBlogs();
      }
    )
  }

  // ***    Method to update a blog      *** //
  updateBlog(id: any) {
    //navigate to the blog page by supplying the id of post you want to update
    this.router.navigate(['blog', id])
  }

  // ***   Method to create a new blog       *** //
  addBlog() {
    //id = -1 to say that user is creating a new post
    this.router.navigate(['blog', -1])
  }

  // ***   Method to go to the blog page that displays comments and post   *** //
  goToBlog(id: any) {
    //id of desired blog is supplied
    this.router.navigate(['blogList/comment-teacher', id])
  }

}
