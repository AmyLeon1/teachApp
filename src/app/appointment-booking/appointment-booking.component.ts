import {Component, OnInit} from '@angular/core';
import {AppointmentDataService} from "../service/data/appointment-data.service";
import {Appointment} from "../appointment";
import {RegistrationService} from "../service/registration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog, Comment} from "../blog-list/blog-list.component";
import {User} from "../user";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {availableTime} from "../availableTime";
import {availableDate} from "../availableDate";
import {AppDate} from "../AppDate";

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

  // variable/object declaration
  user: User
  appointment: Appointment
  availableDateObj: availableDate
  appDate: AppDate
  foundDate: AppDate | undefined
  foundId: any
  time: any = ""
  message: any;
  id: number
  appId: number
  availableTimes: availableTime[]
  date: string
  name: string;
  email = ""
  studentEmail = ""


  constructor(private appService: AppointmentDataService, private service: RegistrationService,
              private route: ActivatedRoute, private router: Router) {
    this.appointment = new Appointment()
  }

  ngOnInit(): void {
    //extract teachers email from parameter
    this.route.params.subscribe(params => this.getUser(params["email"]));
    this.getAllTimesForDate();
    this.appointment = new Appointment();
    this.appointment.studentEmail = this.service.getAuthenticatedUser();
    this.appointment.date = this.date;
  }

  /* Method to display available times */
  displayTimes() {
    //when this method is executed these elements will be displayed
    document.getElementById("get-times-list")!.style.display = "block";
    document.getElementById("time-form")!.style.display = "block";
  }

  /* Method to create new appointment */
  saveAppointment() {
    this.appId = -1;
    if (this.appId === -1) {
      this.appointment.studentEmail = this.service.getAuthenticatedUser();
      this.appointment.date = this.date
      this.appointment.time = this.time
      this.appointment.email = this.email;
      this.appService.createAppointment(this.email, this.appointment)
        .subscribe({
            next: data => {
              //upon successful addition of appointment the user will be
              //navigated to the page that displays their bookings
              this.router.navigate(['manageBooking'])
            },
            error: err => {
              //display error message if there are any problems
              this.message = "The time you selected (" + this.time + ") is unavailable."
            }
          }
        )
    }
  }

  getDate(email: any) {
    console.log("printing date", this.date)
    this.appService.getDate(email, this.date)
      .subscribe({
          next: response => {
            //assigning data of response to various objects / attributes
            console.log(response);
            this.appDate = response;
            this.foundDate = response;
            this.foundId = response.id;
          },
          error: err => {
            this.message = "Date Unavailable"
            console.log("error occured")
          }
        }
      );
  }

  /* Method to check if date is found */
  isDateFound() {
    //return if date is found
    return this.foundDate != null;
  }

  // Method to get all times for a particular date //
  getAllTimesForDate() {
    this.id = this.appDate.id;
    this.appService.getAllTimesForDate(this.id)
      .subscribe(
        response =>
          //assign available times with the response
          this.availableTimes = response
      )
  }


  //method to get user from parameters
  getUser(email: any) {
    this.appService.retrieveUser(email).subscribe(
      response => {
        //assign response to variables/object
        console.log(response);
        this.user = response;
        this.email = response.email;
      }
    )
  }

}


