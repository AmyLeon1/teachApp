import { Component, OnInit } from '@angular/core';
import {Post} from "../post";
import {PostService} from "../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {HardCodedAuthenticationService} from "../service/hard-coded-authentication.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //instantiate object of post so we can use it
  //post = new Post();
  //msg=""
  id:number
  //title:string
 // body:string
  email = this.regService.getAuthenticatedUser()
  post:Post
  //email = this.regService.getAuthenticatedUser()
  //post = new Post( this.id,  this.title,  this.body, this.email)
  //email = this.regService.getAuthenticatedUser()



  constructor(private service: PostService,
              private router: Router,
              private regService: RegistrationService,
              private route: ActivatedRoute,  private authService: HardCodedAuthenticationService,) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.params["id"];
    this.post = new Post(this.id, '', '', this.email);

    //when it's a new to do, do not need to call retrieve to do service
    if(this.id!=-1) {
      //let email= this.service.getAuthenticatedUser()
      this.service.retrievePost(this.email, this.id)
        .subscribe(
           data => this.post = data
        )
    }
  }


  savePost() {
    if (this.id === -1) {
      //create new t do

      // let email= this.service.getAuthenticatedUser();
      this.service.createPost(this.email, this.post)
        .subscribe(
          data => {
            this.router.navigate(["profile"]);
          }
        )
    }
    else {
      //call todo data service
      this.service.updatePost(this.email, this.id, this.post)
        //subscribe to make the call
        //returns content of updated todo
        .subscribe(
          data => {
            this.router.navigate(["profile"]);
          }
        )
    }
  }



  // addNewPost(){
  //   this.service.addPost(this.post)
  //     .subscribe({
  //         next: data => {
  //           this.router.navigate(['profile']),
  //             this.msg="Registration successful"},
  //
  //         error:err => {console.log("error occured"),
  //           this.msg=err.error}
  //       }
  //     );
  // }









}
