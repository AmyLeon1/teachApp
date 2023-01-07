import {Component, OnInit} from '@angular/core';
import {Blog} from "../blog-list/blog-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  // varibale/object declaration
  id: number
  title: string
  description: string
  blog: Blog
  email = this.service.getAuthenticatedUser()

  constructor(
    private blogService: BlogDataService,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegistrationService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.blog = new Blog(this.id, this.email, '', '');

    //when it's a new blog, do not need to call retrieval service
    if (this.id != -1) {
      this.blogService.retrieveBlog(this.email, this.id)
        .subscribe(
          data => this.blog = data
        )
    }
  }


  /* Method to create / update blog post*/
  saveBlog() {
    //if the id is -1 we are creating a brand-new blog post
    if (this.id === -1) {
      this.blogService.createBlog(this.email, this.blog)
        .subscribe(
          data => {
            //upon successful addition of post navigate to the blogList page
            this.router.navigate(["blogList"]);
          }
        )
    }
    //otherwise we are trying to update an existing blog
    else {
      let input: any = document.getElementById("blog-description");
      this.blog.description = input.value;
      //call blogsevice
      this.blogService.updateBlog(this.email, this.id, this.blog)
        //subscribe to make the call
        .subscribe(
          data => {
            //navigate to blogList
            this.router.navigate(["blogList"]);
          }
        )
    }
  }


}
