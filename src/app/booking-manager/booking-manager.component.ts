import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../service/data/appointment-data.service";
import {Appointment} from "../appointment";
import {Todo} from "../todo-list/todo-list.component";
import {HttpClient} from "@angular/common/http";
import {RegistrationService} from "../service/registration.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.css']
})
export class BookingManagerComponent implements OnInit {

  appointments:Appointment[]
  email = this.regService.getAuthenticatedUser();
  studentEmail= this.regService.getAuthenticatedUser();

  constructor(private appService: AppointmentDataService, private http:HttpClient, public regService: RegistrationService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params => this.refreshAppointments(params["email"]))
    if(this.regService.isUserTeacher()){
      this.refreshAppointments()
    }
    if(!this.regService.isUserTeacher()){
      this.refreshStudentAppointments()
    }


    // this.refreshStudentAppointments();
    // this.refreshAppointments();
  }


  cancelAppointment(id:any){
    this.appService.cancelAppointment(id).subscribe(
      response=>{
        // this.message =`Delete of Todo ${id}  Successful!`
        //calling this method allows the list to update a
        //so we don't have to refresh page to see updates
        console.log("APP HAS BEEN DELETED!");
        location.reload();
        this.refreshAppointments();
        this.refreshStudentAppointments()
      }
    )
  }


  //get appointments for students
  refreshStudentAppointments(){
    this.appService.retrieveAllStudentAppointments(this.studentEmail).subscribe(
      response=>{
        console.log("In student apps")
        console.log(response)
        //when response is received assign it to todos
        this.appointments=response;
      }
    )
  }


  refreshAppointments(){
    this.appService.retrieveAllAppointments(this.email).subscribe(
      response=>{
        console.log("In teacher apps")
        //when response is received assign it to todos
        this.appointments=response;
      }
    )
  }

}
