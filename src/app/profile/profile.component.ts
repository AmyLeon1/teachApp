import { Component, OnInit } from '@angular/core';
import {HelloWorldBean, WelcomeDataService} from "../service/data/welcome-data.service";
import {Blog} from "../blog-list/blog-list.component";
import {RegistrationService} from "../service/registration.service";
import {BlogDataService} from "../service/data/blog-data-service";
import {User} from "../user";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  message = "Welcome to your account"

  name: string = ''
  user: User
  userEmail=this.regService.getAuthenticatedUser();
  blogs: Blog[]
  date:any

  constructor(public regService: RegistrationService, public datepipe:DatePipe
  ) {

  }

  ngOnInit(): void {
    this.getWordOfTheDay();
  }

  reloadPage() {
    location.reload();
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
  getWordOfTheDay(){
    this.date = Date.now()
    let today = this.datepipe.transform(this.date, 'yyyy-MM-dd')

    var wordOfDay = document.getElementById('wod');
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.wordnik.com/v4/words.json/wordOfTheDay?date='+today+'&api_key=p5ugwxwi3zy94w8m7wx0waathmxounk7pmgy6sqff0l0d6g25', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400){
        //set html element 'word' of JSON information received
        wordOfDay!.innerHTML = data.word;
        console.log("this is the text: " + data.word)
      }else{
        wordOfDay!.innerHTML = "Error";
      }
    }
    request.send();
    }



}
