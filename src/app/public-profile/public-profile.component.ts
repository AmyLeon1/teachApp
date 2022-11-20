import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {User} from "../user";
import {ActivatedRoute} from "@angular/router";
import {BlogDataService} from "../service/data/blog-data-service";
import {Blog} from "../blog-list/blog-list.component";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(private service: RegistrationService, private route:ActivatedRoute,private blogService:BlogDataService ) { }

  ngOnInit(): void {
    //get parameter that was passed in
    //then run the function getUser with the parameters that were received
    this.route.params.subscribe(params => this.getUser(params["email"]))
    this.route.params.subscribe(params => this.refreshBlogs(params["email"]))
  }

 // user = new User();

  //this component has a user and will start off as undefined
  //have to wait for API to load it
  user: User | undefined;
  blogs: Blog[]

  //email will need to be gotten from public profile list
  //email=''


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
}
