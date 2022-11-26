import { Component, OnInit } from '@angular/core';
import {AppointmentDataService} from "../service/data/appointment-data.service";
import {Appointment} from "../appointment";
import {RegistrationService} from "../service/registration.service";
import {ActivatedRoute} from "@angular/router";
import {Blog, Comment} from "../blog-list/blog-list.component";
import {User} from "../user";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-appointment-booking',
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {

  constructor(private appService: AppointmentDataService, private service: RegistrationService, private route: ActivatedRoute) {
  }


  //take the teacher's details from the parameters
  ngOnInit(): void {
   // this.route.params.subscribe(params => this.saveAppointment(params["email"]))
    this.route.params.subscribe(params => this.getUser(params["email"]))
    this.route.params.subscribe(params => this.saveAppointment(params["email"]))
    //this.route.params.subscribe(params => this.getUserId(params["email"]))



    this.appointment = new Appointment(this.id, this.date, this.studentEmail)

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
  createdAppointment:Appointment
  appId:number
  public msg: string;
  public successMsg: string;
  public errorMsg: string;
  date:string
  name: string;
  //email:string
  studentEmail:string
  // date:Date
  id:number
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
  // saveAppointment(email:any) {
  //   this.appId=-1;
  //   if (this.appId === -1) {
  //     //setting student email with the current logged-in users email
  //     this.appointment.studentEmail = this.service.getAuthenticatedUser();
  //     //this.appointment.date= new Date(this.appointment.date).toDateString();
  //
  //     //passing in email, blogID, and the comment
  //     this.appService.createAppointment( email, this.appointment)
  //       .subscribe(
  //         data => {
  //           console.log("in create appointment data section")
  //           console.log(data)
  //           this.successMsg = `Appointment successfully for booked for ${this.appointment.date}`;
  //         },
  //
  //       )
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




  // *** REGISTER USER ***
  saveAppointment(email:any){
    this.appId=-1;
    if (this.appId === -1) {
      this.appointment.studentEmail = this.service.getAuthenticatedUser();
      this.appService.createAppointment(email, this.appointment)
        .subscribe({
            next: data => {

              console.log("in create appointment data section")
              console.log(data)
              this.successMsg = `Appointment successfully for booked for ${this.appointment.date}`;


            },

            error: err => {
              console.log("error occured"),
                this.errorMsg = "There are no classes available, please select another date/time"
            }
          }
        );
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


