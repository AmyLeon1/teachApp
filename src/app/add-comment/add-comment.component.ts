import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDataService} from "../service/data/blog-data-service";
import {Blog} from "../blog-list/blog-list.component";
import {Comment} from "../blog-list/blog-list.component";
import {RegistrationService} from "../service/registration.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  blog: Blog | undefined
  blogs: Blog[]
  comment: Comment
  comments: Comment[]
  commentId: number
  body: string
  id: number
  owner = this.service.getAuthenticatedUser();
  date: string

  constructor(private route: ActivatedRoute, private blogService: BlogDataService, private router: Router,
              public service: RegistrationService, private datepipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getBlog(params["id"]))
    this.route.params.subscribe(params => this.saveComment(params["id"]))
    this.route.params.subscribe(params => this.refreshComments(params["id"]))
    this.comment = new Comment(this.commentId, '', this.owner, this.date);
    this.refreshComments(this.id);
  }

  /* Method to retrieve comments */
  refreshComments(id: any) {
    this.blogService.retrieveAllComments(id).subscribe(
      response => {
        //when response is received assign it to todos
        this.comments = response;
      }
    )
  }

  /* Method to create a new comment */
  saveComment(id: any) {
    this.commentId = -1;
    let date = Date.now().toString();
    let cDate = this.datepipe.transform(date, 'dd-MM-yyyy')
    console.log(cDate);
    this.comment.date = cDate!;

    if (this.commentId === -1) {
      //passing in email, blogID, and the comment object
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
        .subscribe(
          data => {
            console.log(data);
            //allows for page to be reloaded after submission of comment
            window.location.reload();
          }
        )
    }
  }

  /* Method to retrieve a blog by the blog id */
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
