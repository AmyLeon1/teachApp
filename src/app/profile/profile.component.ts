import {Component, OnInit} from '@angular/core';
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";
import {Blog} from "../blog-list/blog-list.component";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";
import {User} from "../user";
import {DatePipe} from "@angular/common";
import {AppointmentDataService} from "../service/data/appointment-data.service";
import {Appointment} from "../appointment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  message = "Welcome to your account"

  name: string = ''
  user: User
  userEmail = this.regService.getAuthenticatedUser();
  blogs: Blog[]
  date: any

  appointment: Appointment;
  appointments: Appointment[]
  email = this.regService.getAuthenticatedUser();
  studentEmail = this.regService.getAuthenticatedUser();

  constructor(public regService: RegistrationService, public datepipe: DatePipe,
              public appService: AppointmentDataService) {

  }

  ngOnInit(): void {

    /* Methods that need to be run upon loading of page */
    this.getWordOfTheDay();

    if (this.regService.isUserTeacher()) {
      this.refreshAppointments()
    }
    if (!this.regService.isUserTeacher()) {
      this.refreshStudentAppointments()
    }

    this.getUser();
    this.doesUserHaveClassToday();


  }


  reloadPage() {
    location.reload();
  }

  // **** Method to retrieve current logged in user **** //
  getUser() {
    this.regService.retrieveUser(this.email).subscribe(
      response => {
        //when response is received assign it to todos
        this.user = response;
      }
    )
  }


  // **** Method to find out if user has a class today **** //
  doesUserHaveClassToday() {
    //get todays date and transform it to desired layout
    let todaydate = Date.now();
    let today = this.datepipe.transform(todaydate, 'yyyy-MM-dd')
    let today1 = "2021-22-22"
    //variable needed to verify if classes are found or not
    let found = ""

    /*if today's date can be found in the array of appointments
     found has value of 'found'*/
    if (this.appointments.find(e => e.date === today)) {
      found = "found";
    }
    //return if found variable is not null ie - lesson is found for today
    return !(found == "");
  }


  /**** Method to retrieve all appointments for students ****/
  refreshStudentAppointments() {
    this.appService.retrieveAllStudentAppointments(this.studentEmail).subscribe(
      response => {
        console.log(response)
        this.appointments = response;
      }
    )
  }

  /**** Method to retrieve all appointments for teachers ****/
  refreshAppointments() {
    this.appService.retrieveAllAppointments(this.email).subscribe(
      response => {
        console.log("In teacher apps")
        //when response is received assign it to todos
        this.appointments = response;
      }
    )
  }


  // **** Method to implement dictionary function using Wordnik api ****//
  wordSearch() {
    document.getElementById('searchResult')!.style.visibility = 'visible';

    var word = document.getElementById('word');
    var definition = document.getElementById('definition');
    var example = document.getElementById('example');
    var spell = document.getElementById('spell');

    var wordToSearch = (<HTMLInputElement>document.getElementById('searchBox')!).value;

    var request1 = new XMLHttpRequest();
    request1.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    request1.onload = function () {
      var data = JSON.parse(this.response);
      if (request1.status >= 200 && request1.status < 400) {
        var i = Math.ceil(Math.random() * 10);      //  get a random number from 1 to 10
        word!.innerHTML = data[i].word;      //  get a random definition
        definition!.innerHTML = data[i].text;
      } else {
        word!.innerHTML = "Error";
        definition!.innerHTML = "Error";
      }
    }
    request1.send();

    var request2 = new XMLHttpRequest();
    request2.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/topExample?useCanonical=false&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    request2.onload = function () {
      var data2 = JSON.parse(this.response);
      if (request2.status >= 200 && request2.status < 400) {
        example!.innerHTML = data2.text;
      } else {
        example!.innerHTML = "Error";
      }
    }
    request2.send();

    var request3 = new XMLHttpRequest();
    request3.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/audio?useCanonical=false&limit=50&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    request3.onload = function () {
      var data3 = JSON.parse(this.response);
      if (request3.status >= 200 && request3.status < 400) {
        var audio = document.createElement("AUDIO");
        audio.setAttribute("src", data3[0].fileUrl);    //  set the source for audio in html tag
        audio.setAttribute("controls", "controls");
        audio.setAttribute("autoplay", "autoplay");
        spell!.appendChild(audio);

      } else {
        spell!.innerHTML = "Error";
      }
    }
    request3.send();
  }


  // **** Method to retrieve word of the day from Wordnik api **** //
  getWordOfTheDay() {
    this.date = Date.now()
    let today = this.datepipe.transform(this.date, 'yyyy-MM-dd')

    var wordOfDay = document.getElementById('wod');
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.wordnik.com/v4/words.json/wordOfTheDay?date=' + today + '&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        //set html element 'word' of JSON information received
        wordOfDay!.innerHTML = data.word;
        console.log("this is the text: " + data.word)
      } else {
        wordOfDay!.innerHTML = "Error";
      }
    }
    request.send();
  }


}
