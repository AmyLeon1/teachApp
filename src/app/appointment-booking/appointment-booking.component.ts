import { Component, OnInit } from '@angular/core';
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

  constructor(private appService: AppointmentDataService, private service: RegistrationService, private route: ActivatedRoute, private router: Router) {
  }


  //take the teacher's details from the parameters
  ngOnInit(): void {
   // this.route.params.subscribe(params => this.saveAppointment(params["email"]))
    this.route.params.subscribe(params => this.getUser(params["email"]))
    this.route.params.subscribe(params => this.saveAppointment(params["email"]))
    this.route.params.subscribe(params => this.getDate(params["email"]))
    this.route.params.subscribe(params => this.getDate1(params["email"]))
    this.getAllTimesForDate()


   // this.appointment = new Appointment(this.id, this.date, this.time, this.studentEmail)
    this.appointment = new Appointment(this.appId, this.date,this.studentEmail,this.time, this.email)



    if(this.currentMonth<10){
      this.FinalMonth= "0"+this.currentMonth;
    }else{
      this.FinalMonth=this.currentMonth;
    }

    if(this.currentDay<10){
      this.FinalDay= "0"+this.currentDay;
    }else{
      this.FinalDay=this.currentDay;
    }

    this.TodaysDate = this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;


  }

  user:User
  appointment: Appointment
  availableDateObj:availableDate
  appDate: AppDate
  foundDate:AppDate | undefined
  foundId:any
  time:any =""

  availableTimes: availableTime[]
  createdAppointment:Appointment
  appId:number
  public msg: string;
  public successMsg: string;
  public errorMsg: string;
  date:string
  name: string;
  email:any
  //email:string
  studentEmail = this.service.getAuthenticatedUser();

  // date:Date
  id:number
  dateTest:any
  auth_user_id:any
  min:any ="2022-11-26"
  minDate = new Date(2022, 11)
  date1=new Date();

  currentYear=this.date1.getUTCFullYear();
  currentMonth=this.date1.getUTCMonth();
  currentDay=this.date1.getUTCDate();
  FinalMonth:any
  FinalDay:any

  TodaysDate:any

  workedDays =["1", "2"]


  myFilter =(d:Date): boolean => {
    const day = d.getDay();
    //makes Saturday & Sundays not available to book
    return day !== 0 && day !== 6
  }

  showDateTest(){
    console.log("inDateTest function")
    console.log(this.availableDateObj.date)
  }


  //teacherEmail: string

//   //sending comment
//   saveAppointment(teacherEmail:any) {
//     this.appService.createAppointment(teacherEmail, this.date)
//       .subscribe({
//           next: data => {
//             //this.router.navigate(['login']),
//             this.msg = "Registration successful"
//           },
//
//           error: err => {
//             console.log("error occured"),
//               this.msg = err.error
//           }
//         }
//       );
//   }
//
// }

  // createAppointment() {
  //   this.successMsg = '';
  //   this.errorMsg = '';
  //   this.appService.createAppointment(this.date, this.name, this.studentEmail)
  //     .subscribe({(this.createdAppointment) => {
  //         this.date = '';
  //         this.name = '';
  //         this.studentEmail = '';
  //         const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
  //         this.successMsg = `Appointment Booked Successfully for ${appointmentDate}`;
  //       },
  //       (error: ErrorEvent) => {
  //         this.errorMsg = error.error.message;
  //       });}
  // }

  // *** REGISTER USER ***
  // saveAppointment(email:any){
  //
  //
  //   this.appService.createAppointment(email, this.appointment )
  //     .subscribe({
  //         next: data => {
  //           //this.router.navigate(['login']),
  //             this.msg="Registration successful"},
  //
  //         error:err => {console.log("error occured"),
  //          this.msg=err.error}
  //       }
  //     );
  // }


  // //FUNCTIONING METHOD!!!!!!!!!!!!!!!!!!!!!!!!!!
  saveAppointment(email:any) {
    this.appId=-1;
    if (this.appId === -1) {
      //setting student email with the current logged-in users email
      this.appointment.studentEmail = this.service.getAuthenticatedUser();
      //this.appointment.date= new Date(this.appointment.date).toDateString();

      //passing in email, blogID, and the comment
      this.appService.createAppointment( email, this.appointment)
        .subscribe(
          data => {
            console.log("in create appointment data section")
            console.log(data)
            this.successMsg = `Appointment successfully for booked for ${this.appointment.date}`;
          },

        )
    }
    else {
      //call blogseviced
      this.appService.updateAppointment( email, this.appId, this.appointment)
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




  // // *** REGISTER USER ***
  // saveAppointment(email:any){
  //   this.appId=-1;
  //   console.log("this is the time", this.time)
  //   console.log("this is the date", this.date)
  //   console.log("this is the student email", this.studentEmail)
  //   console.log("this is the appointment", this.appointment)
  //   //this.appointment.time = this.time;
  //   //this.appointment.studentEmail = this.service.getAuthenticatedUser();
  //   if (this.appId === -1) {
  //     console.log("IN SAVE APPOINTMENT");
  //     //console.log("IN SAVE APPOINTMENT here is time", this.time);
  //     //console.log("IN SAVE APPOINTMENT here is student email", this.service.getAuthenticatedUser())
  //     //this.appointment.studentEmail = this.service.getAuthenticatedUser();
  //     //console.log("IN SAVE APPOINTMENT here is student email set", this.appointment.studentEmail)
  //     //this.appointment.time = this.time;
  //     //this.appointment.date =this.date;
  //     this.appService.createAppointment(email, this.appointment)
  //       .subscribe({
  //           next: data => {
  //
  //             console.log("in create appointment data section")
  //             console.log(data)
  //             this.successMsg = `Appointment successfully for booked for ${this.appointment.date}`;
  //
  //
  //           },
  //
  //           error: err => {
  //             console.log("error occured"),
  //               this.errorMsg = "There are no classes available, please select another date/time"
  //           }
  //         }
  //       );
  //   }
  //   else {
  //     //call blogseviced
  //     this.appService.updateAppointment( email, this.appId, this.appointment)
  //       //subscribe to make the call
  //       //returns content of updated blog
  //       .subscribe(
  //         data => {
  //           console.log(data);
  //           //allows for page to be reloaded after submission of comment
  //           window.location.reload();
  //
  //         }
  //       )
  //   }
  // }


  // getUserId(email:any){
  //   this.appService.retrieveUser(email).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       console.log(response);
  //       this.user=response;
  //       this.auth_user_id= response.auth_user_id;
  //       console.log("Printing user id")
  //       console.log(this.auth_user_id);
  //     }
  //   )
  //
  // }

  showChosenDate(){
    console.log("this is the chosen date: ")
    console.log(this.date)
  }

  getDate(email:any){
    this.appService.retrieveDate(email, this.date).subscribe(
      response=>{
        //when response is received assign it to todos
        console.log("Printing getDate method");
        console.log(response);
        this.availableDateObj=response;
        console.log(this.availableDateObj.date);
      }
    )
  }

  // getDate1(email:any){
  //   this.appService.getDate(email, this.date).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       console.log("Printing getDate method");
  //       console.log(response);
  //       this.appDate=response;
  //       console.log(this.appDate.date);
  //     }
  //   )
  // }



  getDate1(email:any){
    console.log("printing date", this.date)
    this.appService.getDate(email, this.date)

      .subscribe({
          next: response => {
            console.log("Printing getDate method");
            console.log(response);
            this.appDate=response;
            this.foundDate=response;
            this.foundId=response.id;
            console.log("this is foundid", this.foundId)
            console.log(this.appDate.date);},

          error:err => {console.log("error occured")
            }
        }
      );
  }

  executeTimes(){
    if(this.isDateFound()){
      this.getAllTimesForDate()
    }
  }

  isDateFound(){

    return this.foundDate!=null;

  }

  // METHOD TO GET ALL TIMES AVAILABLE FOR PARTICULAR DATE //
  getAllTimesForDate(){
 // if(this.isDateFound()) {
  console.log("IN GET TIMES FOR DATE")
      console.log("HERE IS FOUND ID", this.appDate.id)
      this.id = this.appDate.id;
      this.appService.getAllTimesForDate(this.id)
        .subscribe(
          response=>
            this.availableTimes = response

        )
    }
  //}



  goToTimeBooking(date:any){
    console.log("in go to booking method ")
    console.log(date)
    this.router.navigate(['book-time', date])
  }

  // getTimes(email:any, date:any){
  //   console.log("You are at point 1")
  //   console.log(date)
  //
  //   this.appService.retrieveAllTimes(email, date).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       this.availableTimes=response;
  //     }
  //   )
  // }

  //Get date

  // getDate(email:any, date:any){
  //   this.appService.retrieveDate(email, date).subscribe(
  //     response=>{
  //       //when response is received assign it to todos
  //       console.log("Printing getDate method");
  //       console.log(response.date);
  //       this.availableDate=response;
  //     }
  //   )
  // }


  //method to get user from parameters
  getUser(email:any){
    this.appService.retrieveUser(email).subscribe(
      response=>{
        //when response is received assign it to todos
        console.log("Printing getUser method");
        console.log(response);
        this.user=response;
      }
    )
  }

}


