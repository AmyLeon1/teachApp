import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDataService} from "../service/data/blog-data-service";
import {Blog} from "../blog-list/blog-list.component";
import {Comment} from "../blog-list/blog-list.component";
import {User} from "../user";
import {RegistrationService} from "../service/registration.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private blogService: BlogDataService, private router: Router,
              public service: RegistrationService
  ) {
  }

  blog: Blog | undefined
  blogs: Blog[]
  comment: Comment
  comments: Comment[]
  commentId: number
  body: string
  id: number
  owner = this.service.getAuthenticatedUser();

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getBlog(params["id"]))
    this.route.params.subscribe(params => this.saveComment(params["id"]))
    this.route.params.subscribe(params => this.refreshComments(params["id"]))


    this.comment = new Comment(this.commentId, '', this.owner);
    this.refreshComments(this.id);

  }

  refreshComments(id: any) {
    this.blogService.retrieveAllComments(id).subscribe(
      response => {
        //when response is received assign it to todos
        this.comments = response;
      }
    )
  }

  saveComment(id: any) {
    this.commentId = -1;
    if (this.commentId === -1) {
      //create new t do

      //passing in email, blogID, and the comment
      this.blogService.createComment(id, this.comment)
        .subscribe(
          data => {
            console.log(data)
            //allows for page to be reloaded after submission of comment
            window.location.reload();
          }
        )
    } else {
      //call blogseviced
      this.blogService.updateComment(id, this.commentId, this.comment)
        //subscribe to make the call
        //returns content of updated blog
        .subscribe(
          data => {
            console.log(data);
            //allows for page to be reloaded after submission of comment
            window.location.reload();

          }
        )
    }
  }


  getBlog(id: any) {
    this.blogService.retrieveBlogById(id).subscribe(
      response => {
        //when response is received assign it to todos
        console.log(response)
        this.blog = response;
      }
    )
  }

}
