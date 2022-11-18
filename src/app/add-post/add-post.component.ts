import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../post-payload";
import {AddPostService} from "../service/add-post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {


  //initialise objects
  postPayload: PostPayload;
  addPostForm: FormGroup;
  title = new FormControl('');
  body = new FormControl('');



  constructor(private addPostService: AddPostService, private router:Router) {
    this.addPostForm = new FormGroup({
      title:this.title,
      body:this.body
    });
    this.postPayload = {
      id:'',
      content:'',
      title:'',
      username:''
    }
  }

  ngOnInit(): void {
  }

  addPost(){

    // @ts-ignore
    this.postPayload.content = this.addPostForm.get('body').value;
    // @ts-ignore
    this.postPayload.title = this.addPostForm.get('title').value;
    this.addPostService.addPost(this.postPayload).subscribe({
      next: data=>{this.router.navigate(['profile'])},
      error:err=>{console.log('error');
       }

      }
    )
  }

}
