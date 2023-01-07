import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage = "ERROR! Contact Support at 123-111-22222"

  constructor() {
  }

  ngOnInit(): void {
  }

}
