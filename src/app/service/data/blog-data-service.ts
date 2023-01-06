import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../constants";
import {Blog} from "../../blog-list/blog-list.component";
import {Comment} from "../../blog-list/blog-list.component";

@Injectable({
  providedIn: 'root'
})

export class BlogDataService {

  constructor(private http: HttpClient) {
  }

  /* Method to add new comment */
  createComment(id: any, comment: Comment) {
    //pass in the comment to be stored in the database
    return this.http.post(`${API_URL}/blogs/${id}/comments`, comment);
  }

  /* Method to update comment*/
  updateComment(id: any, commentId: any, comment: Comment) {
    return this.http.put(`${API_URL}/blogs/${id}/comments/${commentId}`, comment);
  }

  /* Method to retrieve all comments belonging to a certain blog*/
  retrieveAllComments(id: any) {
    return this.http.get<Comment[]>(`http://localhost:8080/blogs/${id}/comments`)
  }

  /* Method to retrieve all blogs for a particular user*/
  retrieveAllBlogs(email: string) {
    return this.http.get<Blog[]>(`http://localhost:8080/users/${email}/blogs`)
  }

  /* Get a blog */
  retrieveBlog(email:any, id:any){
    return this.http.get<Blog>(`${API_URL}/users/${email}/blogs/${id}`
    )
  }

  /* Get a blog by its id */
  retrieveBlogById(id: any) {
    return this.http.get<Blog>(`${API_URL}/blogs/${id}`
    )
  }

  /* Method to delete a blog */
  deleteBlog(email: any, id: any) {
    return this.http.delete(`${API_URL}/users/${email}/blogs/${id}`)
  }

  /* Method to update an existing blog */
  updateBlog(email: string, id: any, blog: Blog) {
    return this.http.put(`${API_URL}/users/${email}/blogs/${id}`, blog);
  }

  /* Method to create a new blog */
  createBlog(email: string, blog: Blog) {
    return this.http.post(`${API_URL}/users/${email}/blogs`, blog);
  }

}
