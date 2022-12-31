import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({


  selector: 'app-welcome',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor( private router: Router) {
  }

  /* Method to navigate to page with list of teachers */
  goToTeachers(){
    this.router.navigate(['publicProfileList']);
  }

}
