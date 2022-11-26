import { Injectable } from '@angular/core';
import {Blog, Comment} from "../../blog-list/blog-list.component";
import {API_URL} from "../../constants";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../../appointment";
import {User} from "../../user";
import * as url from "url";
import {Todo} from "../../todo-list/todo-list.component";

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private http:HttpClient) { }


  // updateAppointment(  email:any, appId:any, studentEmail:any, comment: Comment){
  //   //pass todo into the body of the request
  //   return this.http.put(`${API_URL}/blogs/${id}/comments/${commentId}`,comment);
  // }

  //updating email elements to pass in user

  updateAppointment(email:any, appId:any, appointment: Appointment){
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/users/${email}/appointments/${appId}`,appointment);
  }

  //createAppointment(user:User, appointment: Appointment)
  createAppointment( email:any, appointment: Appointment){
    //pass todo into the body of the request
   return this.http.post(`${API_URL}/users/${email}/appointments`,appointment);

  }

  retrieveAllAppointments(email: any){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments`)

  }

  retrieveAllStudentAppointments(email: any){
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments/studentEmail`)

  }



  //method to retrieve user by email
  retrieveUser(email:any){
    return this.http.get<User>(`${API_URL}/users/${email}`

    )
  }
}
