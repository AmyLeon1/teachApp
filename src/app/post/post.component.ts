import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../service/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //instantiate object of post so we can use it
  post = new Post();
  msg=""

  constructor(private service: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewPost(){
    this.service.addPost(this.post)
      .subscribe({
          next: data => {
            this.router.navigate(['profile']),
              this.msg="Registration successful"},

          error:err => {console.log("error occured"),
            this.msg=err.error}
        }
      );
  }
}
