import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDataService} from "../service/data/blog-data-service";
import {Blog} from "../blog-list/blog-list.component";
import {Comment} from "../blog-list/blog-list.component";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  constructor(private route:ActivatedRoute,private blogService:BlogDataService, private router: Router
  ) { }

  blog:Blog | undefined
  blogs:Blog[]
  comment:Comment
  comments:Comment[]
  commentId:number
  body:string
  id:number
  //id:number

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getBlog(params["id"]))
    this.route.params.subscribe(params => this.saveComment(params["id"]))


    this.comment = new Comment(this.commentId, '');

  }


  saveComment(id:any) {
    this.commentId=-1;
    if (this.commentId === -1) {
      //create new t do

      //passing in email, blogID, and the comment
      this.blogService.createComment(id, this.comment)
        .subscribe(
          data => {
            console.log(data)
            // this.router.navigate(["blogList"]);
          }
        )
    }
    else {
      //call blogseviced
      this.blogService.updateComment( id, this.commentId, this.comment)
        //subscribe to make the call
        //returns content of updated blog
        .subscribe(
          data => {
            console.log(data);
            //this.router.navigate(["blogList"]);
          }
        )
    }
  }



  getBlog(id:any){

    this.blogService.retrieveBlogById(id).subscribe(
      response=>{
        //when response is received assign it to todos
        console.log(response)
        this.blog=response;
      }
    )
  }

}
