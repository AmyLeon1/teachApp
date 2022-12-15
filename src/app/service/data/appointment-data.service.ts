import { Injectable } from '@angular/core';
import {Blog, Comment} from "../../blog-list/blog-list.component";
import {API_URL} from "../../constants";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../../appointment";
import {User} from "../../user";
import * as url from "url";
import {Todo} from "../../todo-list/todo-list.component";
import {availableTime} from "../../availableTime";
import {availableDate} from "../../availableDate";
import {AppDate} from "../../AppDate";

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private http: HttpClient) {
  }

  cancelAppointment(id:any){
    return this.http.delete(`${API_URL}/users/appointments/${id}`)
  }

  getAllTimesForDate(id: any){
    return this.http.get<availableTime[]>(`${API_URL}/appointmentTimes/${id}/times/id`);
  }

  getDate(email:any, date:any){
    return this.http.get<AppDate>(`${API_URL}/appointmentDates/user/${email}/dates/${date}`)
  }

  // updateAppointment(  email:any, appId:any, studentEmail:any, comment: Comment){
  //   //pass todo into the body of the request
  //   return this.http.put(`${API_URL}/blogs/${id}/comments/${commentId}`,comment);
  // }

  //updating email elements to pass in user

  updateAppointment(email: any, appId: any, appointment: Appointment) {
    //pass todo into the body of the request
    return this.http.put(`${API_URL}/users/${email}/appointments/${appId}`, appointment);
  }

  //createAppointment(user:User, appointment: Appointment)
  createAppointment(email: any, appointment: Appointment) {
    //pass todo into the body of the request
    return this.http.post(`${API_URL}/users/${email}/appointments4`, appointment);

  }

  retrieveAllAppointments(email: any) {
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments`)

  }

  retrieveAllStudentAppointments(email: any) {
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<Appointment[]>(`http://localhost:8080/users/${email}/appointments/studentEmail`)

  }

  //method to retrieve user by email
  retrieveUser(email: any) {
    return this.http.get<User>(`${API_URL}/users/${email}`
    )
  }

  // method to retrieve date //

  retrieveDate(email: any, date:any) {
    return this.http.get<availableDate>(`${API_URL}/users/${email}/availableDates/${date}`
    )
  }




  // method for teachers to add a date //
  addDate(email:any, availableDate:availableDate){
    return this.http.post(`${API_URL}/users/${email}/availableDates1`, availableDate)
  }


  // //method to retrieve user by email
  // retrieveDate(email: any, date:any) {
  //   return this.http.get<User>(`${API_URL}/users/${email}`
  //   )
  // }

  // Method to retrieve times //
  retrieveAllTimes(email: any, date:any) {
    //use ticks and not commas for url
    //ticks did not work ,commas used
    return this.http.get<availableTime[]>(`http://localhost:8080/users/${email}/availableDates/${date}/availableTimes`)

  }





}
