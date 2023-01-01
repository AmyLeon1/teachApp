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
    this.displayDate();
    this.getUser();
    this.doesUserHaveClassToday();


  }



  /* Method to display todays' date */
  displayDate(){
    //get todays' date
    let now = Date.now();
    //change the format
    let todaysDate = this.datepipe.transform(now, 'dd-MM-yyyy')
    //get html element
    let today= document.getElementById("current-date");
    //set html element with todaysDate value
    today!.innerHTML= todaysDate!;
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

    //change the visibility of search result div to visible
    document.getElementById('searchResult')!.style.visibility = 'visible';

    //retrieve elements which will be later displayed to the user
    var word = document.getElementById('word');
    var definition = document.getElementById('definition');
    var example = document.getElementById('example');
    var pronunciation = document.getElementById('pronunciation');

    //get the word entered into the search box by the user
    var wordToSearch = (<HTMLInputElement>document.getElementById('searchBox')!).value;

    //create XHR object to interact with the api server to retrieve the definition
    var request1 = new XMLHttpRequest();
    //initialise get request to retrieve the definition by passing in the wordToSearch variable
    request1.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    //when transaction completes call function
    request1.onload = function () {
      var data = JSON.parse(this.response);
      //if http status code is greater than 200 and less than 400
      if (request1.status >= 200 && request1.status < 400) {
        var i = Math.ceil(Math.random() * 10);      //  get a random number from 1 to 10
        word!.innerHTML = data[i].word;      //  get a random definition as the api contains numerous definitions for each word
        definition!.innerHTML = data[i].text; //set the html element with data
      } else {
        //otherwise display error
        word!.innerHTML = "Error";
        definition!.innerHTML = "Error";
      }
    }
    //send the request to the server
    request1.send();

    //create XHR object to interact with the api server to retrieve the example
    var request2 = new XMLHttpRequest();
    //initialise get request to retrieve the example sentence by passing in the wordToSearch variable
    request2.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/topExample?useCanonical=false&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    //when transaction completes call function
    request2.onload = function () {
      var data2 = JSON.parse(this.response);
      //if http status code is greater than 200 and less than 400
      if (request2.status >= 200 && request2.status < 400) {
        //set html with the value of returned data
        example!.innerHTML = data2.text;
      } else {
        //if http status is out of this scope return an error
        example!.innerHTML = "Error";
      }
    }
    //send the request to the server
    request2.send();

    //create XHR object to interact with the api server to retrieve the pronunciation
    var request3 = new XMLHttpRequest();
    request3.open('GET', 'https://api.wordnik.com/v4/word.json/' + wordToSearch + '/audio?useCanonical=false&limit=50&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    //call function
    request3.onload = function () {
      var data3 = JSON.parse(this.response);
      //http status validation
      if (request3.status >= 200 && request3.status < 400) {
        //create audio element
        var audio = document.createElement("AUDIO");
        audio.setAttribute("src", data3[0].fileUrl);    //  set the source for audio in html tag
        audio.setAttribute("controls", "controls");  //set the controls
        audio.setAttribute("autoplay", "autoplay"); //set autoplay
        pronunciation!.appendChild(audio); //append audio to pronunciation html element

      } else {
        //if http status is not within scope display error message
        pronunciation!.innerHTML = "Error";
      }
    }
    //send the request
    request3.send();
  }


  // **** Method to retrieve word of the day from Wordnik api **** //
  getWordOfTheDay() {
    //get today's date
    this.date = Date.now()
    //reformat the date
    let today = this.datepipe.transform(this.date, 'yyyy-MM-dd')
    //get html element
    var wordOfDay = document.getElementById('wod');

    //create XHR object to interact with the api server
    var request = new XMLHttpRequest();
    //initialise get request to retrieve word of the day by passing in the today variable
    request.open('GET', 'https://api.wordnik.com/v4/words.json/wordOfTheDay?date=' + today + '&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    //when transaction completes call function
    request.onload = function () {
      var data = JSON.parse(this.response);

      //if http status code is greater than 200 and less than 400
      if (request.status >= 200 && request.status < 400) {
        //set html element 'word' of JSON information received
        wordOfDay!.innerHTML = data.word;
      }
      //otherwise throw this error message
      else {
        wordOfDay!.innerHTML = "Error";
      }
    }
    //send the request to the server
    request.send();
  }


}
