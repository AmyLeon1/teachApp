import {Component, OnInit} from '@angular/core';
import {AppointmentDataService} from "../service/data/appointment-data.service";
import {Appointment} from "../appointment";
import {Todo} from "../todo-list/todo-list.component";
import {HttpClient} from "@angular/common/http";
import {RegistrationService} from "../service/registration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['./booking-manager.component.css']
})
export class BookingManagerComponent implements OnInit {

  appointments: Appointment[]
  email = this.regService.getAuthenticatedUser();
  studentEmail = this.regService.getAuthenticatedUser();
  message: any

  constructor(private appService: AppointmentDataService, private http: HttpClient, public regService: RegistrationService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    //methods that need to executed upon loading of page
    if (this.regService.isUserTeacher()) {
      this.refreshAppointments()
    }
    if (!this.regService.isUserTeacher()) {
      this.refreshStudentAppointments()
    }
    this.thereAreNoAppointments();
  }

  /**** Method to get redirected to the list of teachers/search function ****/
  goToTeachers() {
    this.router.navigate(['publicProfileList'])
  }

  /**** Method to check if there are no appointments ****/
  thereAreNoAppointments() {
    //if the length of array is 0 return
    return this.appointments.length == 0;
  }

  /**** Method to cancel appointment ****/
  cancelAppointment(id: any) {
    this.appService.cancelAppointment(id).subscribe(
      response => {
        //upon receipt of response refresh appointments and set message
        this.refreshAppointments();
        this.refreshStudentAppointments()
        this.message = `Appointment has successfully been cancelled`
      }
    )
  }


  /**** Get appointments for students ****/
  refreshStudentAppointments() {
    this.appService.retrieveAllStudentAppointments(this.studentEmail).subscribe(
      response => {
        //when response is received assign it to appointments
        this.appointments = response;
      }
    )
  }

  /**** Get appointments for teachers ****/
  refreshAppointments() {
    this.appService.retrieveAllAppointments(this.email).subscribe(
      response => {
        //when response is received assign it to appointments
        this.appointments = response;
      }
    )
  }

}
