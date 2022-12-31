import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../constants";
import {Blog} from "../../blog-list/blog-list.component";
import {Comment} from "../../blog-list/blog-list.component";

@Injectable({
  providedIn: 'root'
})


export class BlogDataService{


//add http as constructor argument
  constructor(private http:HttpClient) { }


  createComment( id:any, comment: Comment){
      //pass in the comment to be stored in the database
      return this.http.post(`${API_URL}/blogs/${id}/comments`, comment);
    }


  updateComment(  id:any, commentId:any, comment: Comment){
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/blogs/${id}/comments/${commentId}`,comment);
  }

  retrieveAllComments(id: any){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Comment[]>(`http://localhost:8080/blogs/${id}/comments`)

  }

  /* Method to retrieve all blogs for a particular user*/
  retrieveAllBlogs(email: string){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Blog[]>(`http://localhost:8080/users/${email}/blogs`)

  }

  retrieveBlog(email:any, id:any){
    return this.http.get<Blog>(`${API_URL}/users/${email}/blogs/${id}`
    )
  }

  retrieveBlogById( id:any){
    return this.http.get<Blog>(`${API_URL}/blogs/${id}`
    )
  }

  /* Method to delete a blog */
  deleteBlog(email:any, id:any){
    return this.http.delete(`${API_URL}/users/${email}/blogs/${id}`)
  }

  /* Method to update an existing blog */
  updateBlog(email:string, id:any,  blog: Blog){
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/users/${email}/blogs/${id}`,blog);
  }

  /* Method to create a new blog */
  createBlog(email:string, blog: Blog){
    //pass todo into the body of the request
    return this.http.post(`${API_URL}/users/${email}/blogs`,blog);
  }

}
