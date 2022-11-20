import { Component, OnInit } from '@angular/core';
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";
import {Blog} from "../blog-list/blog-list.component";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";
import {User} from "../user";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message = "Welcome to your account"
  welcomeMessageFromService:string = ""
  name: string = ''
  user: User
  //email = this.user.email //this.regService.getAuthenticatedUser();
  blogs: Blog[]


  constructor(private regService: RegistrationService, private service: WelcomeDataService
              //private blogService: BlogDataService
  ) {

  }

  ngOnInit(): void {
  }


  // // ** Method to retrieve all blogs **
  // refreshBlogs(){
  //   this.blogService.retrieveAllBlogs(this.email).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       this.blogs=response;
  //     }
  //   )
  // }




  getWelcomeMessage() {

    this.service.executeHelloWorldBeanService().subscribe(
      {
        next: response =>this.handleSuccessfulResponse(response),
        error: error => this.handleErrorResponse(error)
      });

    // this.service.executeHelloWorldBeanService().subscribe(
    //   //arrow function
    //   response => this.handleSuccessfulResponse(response),
    //   error=>this.handleErrorResponse(error)
    // );
  }

  handleSuccessfulResponse(response: HelloWorldBean){
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error:any){
    this.welcomeMessageFromService = error.message;
  }

  // handleErrorResponse(error: { error: { message: string; }; })
  // {
  //   this.welcomeMessageFromService = error.error.message;
  // }

}
